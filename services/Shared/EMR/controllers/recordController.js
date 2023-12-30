const axios = require('axios');
const connection = require('../DataBase/connection'); // Import the connection module 
require('dotenv').config();
//==================================================================================================================
async function createRecord(req, res) {   //Create new record
  const {
    AppointmentID, Weight, Length,
    ServicesDescription, RecommendedActionDescription,
    Vital, Vaccines, EyeMeasurements, NutritionData,
  } = req.body;

  try {      
    const appointmentsUrl = process.env.APPOINTMENTS_API_URL; 
    const clinicsUrl = process.env.Clinics_API_URL; 

    const response = await axios.get(`${appointmentsUrl}/appointments/${AppointmentID}`).catch(() => null); //Get appointment by id

    if ((!response || !response.data)) {   // Check if  AppointmentID  exist in Appointments List
      console.log(`AppointmentID ${AppointmentID} is not found in Appointments List`);
      return res.status(404).json({ message:`AppointmentID ${AppointmentID} is not found in Appointments List` });
    }
        
    const ClinicID = response?.data?.clinicId;  //Get clinicID from appointment service
    const PatientID = response?.data?.patientId;  //Get patientID from appointment service
    const RDate = response?.data?.date;     //Get appointmentDate from appointment service

    const responseClinic = await axios.get(`${clinicsUrl}/api/v1/clinic/${ClinicID}`).catch(() => null);  // Get clinic by id

    if ((!responseClinic || !responseClinic.data)) {   // Check if  ClinicID  exist in Clinics List
      console.log(`ClinicID ${ClinicID} is not found in Clinics List`);
      return res.status(404).json({ message:`This appointment belongs to undefined clinic` });
    }

    const responseClinicName = responseClinic?.data?.data?.clinic?.name;    //Get clinicName from clinic service

    // Check if PatientID exists in MedicalHistory table
    const checkMedicalHistoryQuery = `SELECT * FROM medicalhistory WHERE PatientID = ?`;
    const [medicalHistoryResult] = await connection.promise().query(checkMedicalHistoryQuery, [PatientID]);

    if (medicalHistoryResult.length === 0) {        // If PatientID does not exist in the MedicalHistory table, insert it
      /* "Assuming that the Appointment Service has checked that the PatientID already exists in the Registration Service, 
        since an appointment has already been scheduled, it is certain that the patient exists, So insert it into my database." */
      const sql_query_medicalhistory = `INSERT INTO medicalhistory (PatientID) VALUES (?)`;
      await connection.promise().query(sql_query_medicalhistory, [PatientID]);
      console.log("New Patient is created with PatientID:", PatientID);
    }

    insertRecord(PatientID, AppointmentID, ClinicID, RDate, Weight, Length,(insertedRecordID) => {
      if (Vital != null && Object.keys(Vital).length !== 0) {      //Check if the patient's vital signs data has been obtained at the clinic.(Not NULL)
        insertVital(insertedRecordID, Vital,() => {});
      }
      if (ServicesDescription !== "") {       //Check if patient had a additional service in the clinic (Not NULL)
        insertServices(insertedRecordID, ServicesDescription, () => {});
      }
      if (RecommendedActionDescription !== "") {   //Check if patient had a recommended action in the clinic (Not NULL)
        insertRecommendedAction( insertedRecordID, RecommendedActionDescription,() => {});
      }
      // Check ClinicName and insert accordingly
      if (responseClinicName ===  process.env.Pediatric_Clinic_ID) {        // Kids Clinic
        if (Vaccines.length > 0) { 
          insertVaccines(insertedRecordID, Vaccines,() => {});
        }
      } 
      else if (responseClinicName ===  process.env.Ophthalmology_Clinic_ID) {        // Eyes Clinic
        if (EyeMeasurements != null && Object.keys(EyeMeasurements).length !== 0) {
          insertEyeMeasurement(insertedRecordID,EyeMeasurements,() => {});
        }
      } 
      else if (responseClinicName ===  process.env.Nutrition_Clinic_ID) {        // Nutrition Clinic
        if (NutritionData != null && Object.keys(NutritionData).length !== 0) {
          insertNutrition(insertedRecordID, NutritionData,() => {});
        }
      }    
      console.log(`New Record is created successfully with ${responseClinicName} Clinic`); 
      res.status(201).json({message:`New Record is created successfully with ${responseClinicName} Clinic`,});

    });
    // Rest of your existing code
  } catch (appointmentsError) {
    console.error("Error checking for existing AppointmentID:", appointmentsError);
    res.status(500).json({ error: "Internal Server Error" });
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
async function insertRecord(PatientID, AppointmentID, ClinicID, RDate, Weight, Length,callback) {  //insert into record table
  const sql_query_Record = "INSERT INTO record (PatientID, AppointmentID, ClinicID, RDate, Weight, Length) VALUES (?, ?, ?, ?, ?, ?)";
  const [RecordResult] = await connection.promise().query(sql_query_Record, [PatientID, AppointmentID, ClinicID, RDate, Weight, Length]);
  const insertedRecordID = RecordResult.insertId;  // Get the auto-incremented RecordID from the inserted record
  console.log("New Record is created with RecordID:",insertedRecordID);
  callback(insertedRecordID);      // Pass the RecordID to the callback function
}
//==============================================================================================================
async function insertServices(RecordID,ServicesDescription,callback) {  //insert into Services table
  const sql_query_Services = `INSERT INTO services (RecordID,ServicesDescription) VALUES (?, ?)`;
  const [ServicesResult] = await connection.promise().query(sql_query_Services, [RecordID,ServicesDescription]);
  const insertedServiceID = ServicesResult.insertId;  
  console.log("New Service is created with ServiceID:",insertedServiceID);
  callback();
}
//==============================================================================================================
async function insertRecommendedAction(RecordID,RecommendedActionDescription,callback) {  //insert into RecommendedAction table
  const sql_query_RecommendedAction = `INSERT INTO recommendedaction (RecordID,RecommendedActionDescription) VALUES ( ?, ?)`;
  const [RecommendedActionResult] = await connection.promise().query(sql_query_RecommendedAction, [RecordID,RecommendedActionDescription]);
  const insertedRecommendedActionID = RecommendedActionResult.insertId; 
  console.log("New RecommendedAction is created with RecommendedActionID:",insertedRecommendedActionID);
  callback();
}
//==============================================================================================================
async function insertVital(RecordID, Vital, callback) {  //insert into Vital Sign table
  const sql_query_Vital = `INSERT INTO vital (RecordID, BloodPressure, RespirationRate, HeartRate, DiabeticTest, SPO2) VALUES ( ?, ?, ?, ?, ?, ?)`;
  const [vitalResult] = await connection.promise().query(sql_query_Vital,[RecordID, Vital.BloodPressure, Vital.RespirationRate, Vital.HeartRate, Vital.DiabeticTest, Vital.SPO2]);
  const insertedVitalSignID = vitalResult.insertId; 
  console.log('New VitalSign is created with VitalSignID:',insertedVitalSignID);
  callback();
}
//==============================================================================================================
function insertVaccines(RecordID, Vaccines,callback) {  //insert into Vaccines table
  const sql_query_Vaccines = `INSERT INTO vaccines (RecordID, VName, VType, VDate ) VALUES ( ?, ?, ?, ?)`;
  Promise.all(
    Vaccines.map((vaccine) => {
      return new Promise((resolve, reject) => {
        connection.query(sql_query_Vaccines,[RecordID, vaccine.VaccineName, vaccine.VaccineType, vaccine.VaccineDate],(vaccinesErr, vaccinesResult) => {
          if (vaccinesErr) {
            console.error("Error creating Vaccine:", vaccinesErr);
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
async function insertEyeMeasurement(RecordID, EyeMeasurements,callback) {   //insert into EyeMeasurement table
  const sql_query_EyeMeasurement = `INSERT INTO eyemeasurement (RecordID, LeftEye, RightEye) VALUES ( ?, ?, ?)`;
  const [eyeMeasurementResult] = await connection.promise().query(sql_query_EyeMeasurement,[RecordID, EyeMeasurements.LeftEye, EyeMeasurements.RightEye]);
    const insertedEyeMeasurementID = eyeMeasurementResult.insertId; 
    console.log("New EyeMeasurement is created with EyeMeasurementID:",insertedEyeMeasurementID);
    callback();
}
//==============================================================================================================
async function insertNutrition(RecordID, NutritionData,callback) {  //insert into Nutrition table
  const sql_query_Nutrition = `INSERT INTO nutrition (RecordID, DietPlan, Inbody) VALUES ( ?, ?, ?)`;
  const [nutritionDataResult] = await connection.promise().query(sql_query_Nutrition,[RecordID, NutritionData.DietPlan, NutritionData.Inbody]);
  const insertedNutritionID = nutritionDataResult.insertId; 
  console.log("New NutritionData is created with NutritionID:",insertedNutritionID);
  callback();
}
//====================================================================================================================
module.exports = {
  createRecord,
  getRecord,
  getRecordByRecordID,
  getRecordByPatientID
};
