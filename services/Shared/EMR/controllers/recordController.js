const axios = require('axios');
const connection = require('../DataBase/connection'); // Import the connection module 
require('dotenv').config();
//==================================================================================================================
async function createRecord(req, res) {   //Create new record
  const {
    PatientID, AppointmentID, ClinicID, Weight, Length,
    ServicesDescription, RecommendedActionDescription,
    Vital, Vaccines, EyeMeasurements, NutritionData,
  } = req.body;

  try {      
    const appointmentsUrl = process.env.APPOINTMENTS_API_URL; 
    const clinicsUrl = process.env.Clinics_API_URL; 

    const response = await axios.get(`${appointmentsUrl}/appointments/${AppointmentID}`).catch(() => null);
    const responseClinic = await axios.get(`${clinicsUrl}/api/v1/clinic/${ClinicID}`).catch(() => null);

    if ((!response || !response.data)) {   // Check if  AppointmentID  exist in Appointments List
      console.log(`AppointmentID ${AppointmentID} is not found in Appointments List`);
      return res.status(500).json({ error: `AppointmentID ${AppointmentID} is not found in Appointments List` });
    }
    if ((!responseClinic || !responseClinic.data)) {   // Check if  ClinicID  exist in Clinics List
      console.log(`ClinicID ${ClinicID} is not found in Clinics List`);
      return res.status(500).json({ error: `ClinicID ${ClinicID} is not found in Clinics List` });
    }
    
    const responseClinicID = response?.data?.clinicId;  //Get clinicID from appointment service
    const responsePatientId = response?.data?.patientId;  //Get patientID from appointment service
    const RDate = response?.data?.date;     //Get appointmentDate from appointment service
    const responseClinicName = responseClinic?.data?.data?.clinic?.name;    //Get clinicName from clinic service

    if (responsePatientId != PatientID) {   //Check if appointment belongs to same patient
      console.log(`AppointmentID ${AppointmentID} does not belong to the patient with patientId: ${PatientID}`);
      return res.status(500).json({ error: `AppointmentID ${AppointmentID} does not belong to the patient with patientId: ${PatientID}` });
    }

    if (responseClinicID != ClinicID) {   //Check if appointment belongs to same clinic
      console.log(`This Appointment with ID:${AppointmentID} does not belong to the clinic with Id: ${ClinicID}`);
      return res.status(500).json({ error: `This Appointment with ID:${AppointmentID} does not belong to the clinic with Id: ${ClinicID}` });
    }
    // Check if PatientID exists in MedicalHistory table
    const checkMedicalHistoryQuery = `SELECT * FROM medicalhistory WHERE PatientID = ?`;
    connection.query(checkMedicalHistoryQuery, [PatientID], async (checkMedicalHistoryErr, MedicalHistoryResult) => { 
      if (checkMedicalHistoryErr) {
        console.error("Error checking for existing PatientID:", checkMedicalHistoryErr);
        return res.status(500).json({ error: "Internal Server Error, Check if PatientID exists in MedicalHistory table" });
      }
      if (MedicalHistoryResult.length === 0) {   // If PatientID does not exist in the MedicalHistory table, insert it
        /* "Assuming that the Appointment Service has checked that the PatientID already exists in the Registration Service, 
        since an appointment has already been scheduled, it is certain that the patient exists, So insert it into my database." */
        const sql_query_medicalhistory = `INSERT INTO medicalhistory (PatientID) VALUES (?)`;
        connection.query(sql_query_medicalhistory, [PatientID], (medicalhistoryErr, medicalhistoryResult) => {
          if (medicalhistoryErr) {
            console.error("Error creating medicalhistory:", medicalhistoryErr);
            res.status(500).json({ error: "Internal Server Error, Check if PatientID exists" });
            return;
          }
          console.log("New Patient is created with PatientID:", PatientID);
        });
      }

    insertRecord(PatientID, AppointmentID, ClinicID, RDate, Weight, Length,res,(insertedRecordID) => {
      if (Vital != null && Object.keys(Vital).length !== 0) {      //Check if the patient's vital signs data has been obtained at the clinic.(Not NULL)
        insertVital(insertedRecordID, Vital, res, () => {});
      }
      if (ServicesDescription !== "") {       //Check if patient had a additional service in the clinic (Not NULL)
        insertServices(insertedRecordID, ServicesDescription, res, () => {});
      }
      if (RecommendedActionDescription !== "") {   //Check if patient had a recommended action in the clinic (Not NULL)
        insertRecommendedAction( insertedRecordID, RecommendedActionDescription, res, () => {});
      }
      // Check ClinicName and insert accordingly
      if (responseClinicName ===  process.env.Pediatric_Clinic_ID) {        // Kids Clinic
        if (Vaccines.length > 0) { 
          insertVaccines(insertedRecordID, Vaccines, res, () => {});
        }
      } 
      else if (responseClinicName ===  process.env.Ophthalmology_Clinic_ID) {        // Eyes Clinic
        if (EyeMeasurements != null && Object.keys(EyeMeasurements).length !== 0) {
          insertEyeMeasurement(insertedRecordID,EyeMeasurements,res,() => {});
        }
      } 
      else if (responseClinicName ===  process.env.Nutrition_Clinic_ID) {        // Nutrition Clinic
        if (NutritionData != null && Object.keys(NutritionData).length !== 0) {
          insertNutrition(insertedRecordID, NutritionData, res, () => {});
        }
      }    
      console.log(`New Record is created successfully with ${responseClinicName} Clinic`); 
      res.status(201).json({message:`New Record is created successfully with ${responseClinicName} Clinic`,});

    });
  });
    // Rest of your existing code
  } catch (appointmentsError) {
    console.error("Error checking for existing AppointmentID:", appointmentsError);
    res.status(500).json({ error: "Internal Server Error, Check if AppointmentID exists" });
  }
}
//==================================================================================================================
function getRecord (req, res)  {         //Get All Records
  const sql_query = generateRecordQuery('', '');
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: 'No records found in records list' });
    } else {
      const records = processQueryResult(result);
      res.status(200).json(records);
    }
  });
}
//==================================================================================================================
function getRecordByRecordID(req, res) {  //Get All Record By RecordID
  const recordID = req.params.recordId;
  const sql_query = generateRecordQuery('', `AND record.RecordID = ${recordID}`);

  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: `Record with ID ${recordID} not found.` });
    } else {
      const records = processQueryResult(result);
      res.status(200).json(records);
    }
  });
}
//==================================================================================================================
function getRecordByPatientID(req, res) {  //Get All Record By patientID
  const patientID = req.params.patientId;
  const sql_query = generateRecordQuery('', `AND record.PatientID = ${patientID}`);

  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: `No records found for patient with ID ${patientID}.` });
    } else {
      const records = processQueryResult(result);
      res.status(200).json(records);
    }
  });
}
// ============================================================================================================
function generateRecordQuery(joinConditions, whereConditions) {   // Function to generate the common SQL query for retrieving records
select_query = `
  SELECT record.RecordID, record.PatientID, record.AppointmentID, record.ClinicID, record.RDate, record.Weight, record.Length, 
  services.ServicesID, services.ServicesDescription,
  recommendedaction.RecommendedActionID, recommendedaction.RecommendedActionDescription,
  vital.VitalID, vital.BloodPressure, vital.RespirationRate, vital.HeartRate, vital.DiabeticTest, vital.SPO2,
  vaccines.VaccinesID, vaccines.VName, vaccines.VType, vaccines.VDate,
  eyemeasurement.EyeMeasurementID, eyemeasurement.LeftEye, eyemeasurement.RightEye,
  nutrition.NutritionID, nutrition.DietPlan, nutrition.Inbody

  FROM record
  LEFT JOIN services ON record.RecordID = services.RecordID
  LEFT JOIN recommendedaction ON record.RecordID = recommendedaction.RecordID
  LEFT JOIN vital ON record.RecordID = vital.RecordID
  LEFT JOIN vaccines ON record.RecordID = vaccines.RecordID
  LEFT JOIN eyemeasurement ON record.RecordID = eyemeasurement.RecordID
  LEFT JOIN nutrition ON record.RecordID = nutrition.RecordID
  ${joinConditions}
  WHERE record.RecordID IS NOT NULL ${whereConditions}` ;

  return  select_query;
}
//==========================================================================================================================
function processQueryResult(result) {          //Function to process the query result and build the record map
  const recordMap = {};

  result.forEach((row) => {
    const { RecordID, ServicesID, RecommendedActionID, VitalID, VaccinesID, EyeMeasurementID, NutritionID } = row;

    if (!recordMap[RecordID]) {
      recordMap[RecordID] = {
        RecordID,
        PatientID: row.PatientID,
        AppointmentID: row.AppointmentID,
        ClinicID: row.ClinicID,
        RecordDate: row.RDate,
        PatientWeight: row.Weight,
        PatientHeight: row.Length,
        Services: [],
        RecommendedAction: [],
        Vital: [],
        Vaccines: [],
        EyeMeasurement: [],
        Nutrition: [],
      };
    }
    if (ServicesID != null) {        // Check if ServicesID is not null 
      recordMap[RecordID].Services.push({ServicesDescription: row.ServicesDescription });
    }

    if (RecommendedActionID != null ) {       // Check if RecommendedActionID is not null 
      recordMap[RecordID].RecommendedAction.push({RecommendedActionDescription: row.RecommendedActionDescription });
    }

    if (VitalID != null ) {       // Check if VitalID is not null 
      recordMap[RecordID].Vital.push({BloodPressure: row.BloodPressure,RespirationRate: row.RespirationRate,HeartRate: row.HeartRate,
        DiabeticTest: row.DiabeticTest,SPO2: row.SPO2,});
    }

    if (VaccinesID != null) {      // Check if VaccinesID is not null 
      recordMap[RecordID].Vaccines.push({VaccineName: row.VName, VaccineType: row.VType, VaccineDate: row.VDate });
    }

    if (EyeMeasurementID != null) {       // Check if EyeMeasurementID is not null 
      recordMap[RecordID].EyeMeasurement.push({LeftEye: row.LeftEye, RightEye: row.RightEye });
    }
 
    if (NutritionID != null ) {        // Check if NutritionID is not null
      recordMap[RecordID].Nutrition.push({DietPlan: row.DietPlan, Inbody: row.Inbody });
    }
  });

  return Object.values(recordMap);
}
//=====================================================================================================================
function insertRecord(PatientID, AppointmentID, ClinicID, RDate, Weight, Length, res, callback) {  //insert into record table
  const sql_query_Record = "INSERT INTO record (PatientID, AppointmentID, ClinicID, RDate, Weight, Length) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(sql_query_Record, [PatientID, AppointmentID, ClinicID, RDate, Weight, Length], (RecordErr, RecordResult) => {
    if (RecordErr) {
      console.error("Error creating Record:", RecordErr);
      res.status(500).json({ error: "Error creating Record, Check if PatientID exists" });
      return;
    }
    const insertedRecordID = RecordResult.insertId;  // Get the auto-incremented RecordID from the inserted record
    console.log("New Record is created with RecordID:",insertedRecordID);
    callback(insertedRecordID);      // Pass the RecordID to the callback function
  });
}
//==============================================================================================================
function insertServices(RecordID,ServicesDescription,res, callback) {  //insert into Services table
  const sql_query_Services = `INSERT INTO services (RecordID,ServicesDescription) VALUES (?, ?)`;
  connection.query(sql_query_Services, [RecordID,ServicesDescription], (ServicesErr, ServicesResult) => {
    if (ServicesErr) {
      console.error("Error creating Services:", ServicesErr);
      res.status(500).json({ error: "Error creating Services, Check if RecordID exists" });
      return;
    }
    const insertedServiceID = ServicesResult.insertId;  
    console.log("New Service is created with ServiceID:",insertedServiceID);
    callback();
    }
  );
}
//==============================================================================================================
function insertRecommendedAction(RecordID,RecommendedActionDescription,res, callback) {  //insert into RecommendedAction table
  const sql_query_RecommendedAction = `INSERT INTO recommendedaction (RecordID,RecommendedActionDescription) VALUES ( ?, ?)`;
  connection.query(sql_query_RecommendedAction, [RecordID,RecommendedActionDescription], (RecommendedActionErr, RecommendedActionResult) => {
    if (RecommendedActionErr) {
      console.error("Error creating RecommendedAction:", RecommendedActionErr);
      res.status(500).json({ error: "Error creating RecommendedAction, Check if RecordID exists" });
      return;
    }
    const insertedRecommendedActionID = RecommendedActionResult.insertId; 
    console.log("New RecommendedAction is created with RecommendedActionID:",insertedRecommendedActionID);
    callback();
    }
  );
}
//==============================================================================================================
function insertVital(RecordID, Vital, res, callback) {  //insert into Vital Sign table
  const sql_query_Vital = `INSERT INTO vital (RecordID, BloodPressure, RespirationRate, HeartRate, DiabeticTest, SPO2) VALUES ( ?, ?, ?, ?, ?, ?)`;

  connection.query(sql_query_Vital,[RecordID, Vital.BloodPressure, Vital.RespirationRate, Vital.HeartRate, Vital.DiabeticTest, Vital.SPO2],(vitalErr, vitalResult) => {
    if (vitalErr) {
      console.error('Error creating VitalSign:', vitalErr);
      res.status(500).json({ error: "Error creating VitalSign, Check if RecordID exists" });
      return;
    }
    const insertedVitalSignID = vitalResult.insertId; 
    console.log('New VitalSign is created with VitalSignID:',insertedVitalSignID);
    callback();
  });
}
//==============================================================================================================
function insertVaccines(RecordID, Vaccines, res, callback) {  //insert into Vaccines table
  const sql_query_Vaccines = `INSERT INTO vaccines (RecordID, VName, VType, VDate ) VALUES ( ?, ?, ?, ?)`;
  Promise.all(
    Vaccines.map((vaccine) => {
      return new Promise((resolve, reject) => {
        connection.query(sql_query_Vaccines,[RecordID, vaccine.VName, vaccine.VType, vaccine.VDate],(vaccinesErr, vaccinesResult) => {
          if (vaccinesErr) {
            console.error("Error creating Vaccine:", vaccinesErr);
            res.status(500).json({ error: "Error creating Vaccine, Check if RecordID exists" });
            reject(vaccinesErr);
          } else {
            const insertedVaccineID = vaccinesResult.insertId; 
            console.log("New Vaccine is created with VaccineID:" ,insertedVaccineID);
            resolve(vaccinesResult);
          }
        });
      });
    })
  )
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error("Error inserting Vaccine data:", error);
    });
}
//==============================================================================================================
function insertEyeMeasurement(RecordID, EyeMeasurements, res, callback) {   //insert into EyeMeasurement table
  const sql_query_EyeMeasurement = `INSERT INTO eyemeasurement (RecordID, LeftEye, RightEye) VALUES ( ?, ?, ?)`;

  connection.query(sql_query_EyeMeasurement,[RecordID, EyeMeasurements.LeftEye, EyeMeasurements.RightEye],(eyeMeasurementErr, eyeMeasurementResult) => {
    if (eyeMeasurementErr) {
      console.error("Error creating EyeMeasurement:", eyeMeasurementErr);
      res.status(500).json({ error:  "Error creating EyeMeasurement, Check if RecordID exists" });
      return;
    } 
    const insertedEyeMeasurementID = eyeMeasurementResult.insertId; 
    console.log("New EyeMeasurement is created with EyeMeasurementID:",insertedEyeMeasurementID);
    callback();
  });
}
//==============================================================================================================
function insertNutrition(RecordID, NutritionData, res,callback) {  //insert into Nutrition table
  const sql_query_Nutrition = `INSERT INTO nutrition (RecordID, DietPlan, Inbody) VALUES ( ?, ?, ?)`;
  connection.query(sql_query_Nutrition,[RecordID, NutritionData.DietPlan, NutritionData.Inbody],(nutritionDataErr, nutritionDataResult) => {
    if (nutritionDataErr) {
      console.error("Error creating Nutrition:", nutritionDataErr);
      res.status(500).json({ error:  "Error creating Nutrition, Check if RecordID exists" });
      return;
    }
    const insertedNutritionID = nutritionDataResult.insertId; 
    console.log("New NutritionData is created with NutritionID:",insertedNutritionID);
    callback();
  });
}
//====================================================================================================================
module.exports = {
  createRecord,
  getRecord,
  getRecordByRecordID,
  getRecordByPatientID
};