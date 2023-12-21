const connection = require('../DataBase/connection'); // Import the connection module 
//==================================================================================================================
function createRecord(req, res) {
  const {
    PatientID,RDate,ClinicID,Weight,Length,
    ServicesDescription, RecommendedActionDescription,
    Vital,Vaccines,EyeMeasurements,NutritionData,
  } = req.body;

  insertRecord(PatientID,RDate,Weight,Length,ClinicID,res,(insertedRecordID) => {
    if (Vital != null && Object.keys(Vital).length !== 0) {      //Check if the patient's vital signs data has been obtained at the clinic.(Not NULL)
      insertVital(insertedRecordID, Vital, res, () => {});
    }
    if (ServicesDescription !== "") {       //Check if patient had a additional service in the clinic (Not NULL)
      insertServices(insertedRecordID, ServicesDescription, res, () => {});
    }
    if (RecommendedActionDescription !== "") {   //Check if patient had a recommended action in the clinic (Not NULL)
      insertRecommendedAction( insertedRecordID, RecommendedActionDescription, res, () => {});
    }
    // Check ClinicID and insert accordingly
    if (ClinicID === 1) {        // Kids Clinic
      if (Vaccines.length > 0) { 
        insertVaccines(insertedRecordID, Vaccines, res, () => {});
      }
      res.status(201).json({message: " New Record is created successfully with Pediatric Clinic ",});
    } 
    else if (ClinicID === 2) {        // Eyes Clinic
      if (EyeMeasurements != null && Object.keys(EyeMeasurements).length !== 0) {
        insertEyeMeasurement(insertedRecordID,EyeMeasurements,res,() => {});
      }
      res.status(201).json({message:" New Record is created successfully with Ophthalmology Clinic ",});
    } 
    else if (ClinicID === 3) {        // Nutrition Clinic
      if (NutritionData != null && Object.keys(NutritionData).length !== 0) {
        insertNutrition(insertedRecordID, NutritionData, res, () => {});
      }
      res.status(201).json({message:" New Record is created successfully with Nutrition Clinic ",});
    } 
    else {         // Handle other clinics
      res.status(201).json({ message: " New Record is created successfully " });
    }
  });
}
//==================================================================================================================
function getRecord (req, res)  {         //Get All Records
  const sql_query = generateRecordQuery('', '');
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: 'This record does not exist.' });
    } else {
      const records = processQueryResult(result);
      res.status(200).json(records);
    }
  });
}
//==================================================================================================================
function getRecordByRecordID(req, res) {
  const recordID = req.params.recordID;
  const sql_query = generateRecordQuery('', `AND Record.RecordID = ${recordID}`);

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
function getRecordByPatientID(req, res) {
  const patientID = req.params.patientID;
  const sql_query = generateRecordQuery('', `AND Record.PatientID = ${patientID}`);

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
  SELECT Record.RecordID, Record.PatientID, Record.RDate, Record.Weight, Record.Length, Record.ClinicID,
  Services.ServicesID, Services.ServicesDescription,
  RecommendedAction.RecommendedActionID, RecommendedAction.RecommendedActionDescription,
  Vital.VitalID, Vital.BloodPressure, Vital.RespirationRate, Vital.HeartRate, Vital.DiabeticTest, Vital.SPO2,
  Vaccines.VaccinesID, Vaccines.VName, Vaccines.VType, Vaccines.VDate,
  EyeMeasurement.EyeMeasurementID, EyeMeasurement.LeftEye, EyeMeasurement.RightEye,
  Nutrition.NutritionID, Nutrition.DietPlan, Nutrition.Inbody

  FROM Record
  LEFT JOIN Services ON Record.RecordID = Services.RecordID
  LEFT JOIN RecommendedAction ON Record.RecordID = RecommendedAction.RecordID
  LEFT JOIN Vital ON Record.RecordID = Vital.RecordID
  LEFT JOIN Vaccines ON Record.RecordID = Vaccines.RecordID
  LEFT JOIN EyeMeasurement ON Record.RecordID = EyeMeasurement.RecordID
  LEFT JOIN Nutrition ON Record.RecordID = Nutrition.RecordID
  ${joinConditions}
  WHERE Record.RecordID IS NOT NULL ${whereConditions}` ;

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
        RecordDate: row.RDate,
        ClinicID: row.ClinicID,
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
function insertRecord(PatientID, RDate, Weight, Length, ClinicID, res, callback) {
  const sql_query_Record = "INSERT INTO Record (PatientID, RDate, Weight, Length, ClinicID) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql_query_Record, [PatientID, RDate, Weight, Length, ClinicID], (RecordErr, RecordResult) => {
    if (RecordErr) {
      console.error("Error creating Record:", RecordErr);
      res.status(500).json({ error: "Internal Server Error, Check if PatientID exists" });
      return;
    }
    const insertedRecordID = RecordResult.insertId;  // Get the auto-incremented RecordID from the inserted record
    console.log("New Record is created with RecordID:",insertedRecordID);
    callback(insertedRecordID);      // Pass the RecordID to the callback function
  });
}
//==============================================================================================================
function insertServices(RecordID,ServicesDescription,res, callback) {
  const sql_query_Services = `INSERT INTO Services (RecordID,ServicesDescription) VALUES (?, ?)`;
  connection.query(sql_query_Services, [RecordID,ServicesDescription], (ServicesErr, ServicesResult) => {
    if (ServicesErr) {
      console.error("Error creating Services:", ServicesErr);
      res.status(500).json({ error: "Internal Server Error, Check if RecordID exists" });
      return;
    }
    const insertedServiceID = ServicesResult.insertId;  
    console.log("New Service is created with ServiceID:",insertedServiceID);
    callback();
    }
  );
}
//==============================================================================================================
function insertRecommendedAction(RecordID,RecommendedActionDescription,res, callback) {
  const sql_query_RecommendedAction = `INSERT INTO RecommendedAction (RecordID,RecommendedActionDescription) VALUES ( ?, ?)`;
  connection.query(sql_query_RecommendedAction, [RecordID,RecommendedActionDescription], (RecommendedActionErr, RecommendedActionResult) => {
    if (RecommendedActionErr) {
      console.error("Error creating RecommendedAction:", RecommendedActionErr);
      res.status(500).json({ error: "Internal Server Error, Check if RecordID exists" });
      return;
    }
    const insertedRecommendedActionID = RecommendedActionResult.insertId; 
    console.log("New RecommendedAction is created with RecommendedActionID:",insertedRecommendedActionID);
    callback();
    }
  );
}
//==============================================================================================================
function insertVital(RecordID, Vital, res, callback) {
  const sql_query_Vital = `INSERT INTO Vital (RecordID, BloodPressure, RespirationRate, HeartRate, DiabeticTest, SPO2) VALUES ( ?, ?, ?, ?, ?, ?)`;

  connection.query(sql_query_Vital,[RecordID, Vital.BloodPressure, Vital.RespirationRate, Vital.HeartRate, Vital.DiabeticTest, Vital.SPO2],(vitalErr, vitalResult) => {
    if (vitalErr) {
      console.error('Error creating VitalSign:', vitalErr);
      res.status(500).json({ error: "Internal Server Error, Check if RecordID exists" });
      return;
    }
    const insertedVitalSignID = vitalResult.insertId; 
    console.log('New VitalSign is created with VitalSignID:',insertedVitalSignID);
    callback();
  });
}
//==============================================================================================================
function insertVaccines(RecordID, Vaccines, res, callback) {
  const sql_query_Vaccines = `INSERT INTO Vaccines (RecordID, VName, VType, VDate ) VALUES ( ?, ?, ?, ?)`;
  Promise.all(
    Vaccines.map((vaccine) => {
      return new Promise((resolve, reject) => {
        connection.query(sql_query_Vaccines,[RecordID, vaccine.VName, vaccine.VType, vaccine.VDate],(vaccinesErr, vaccinesResult) => {
          if (vaccinesErr) {
            console.error("Error creating Vaccine:", vaccinesErr);
            res.status(500).json({ error: "Internal Server Error, Check if RecordID exists" });
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
function insertEyeMeasurement(RecordID, EyeMeasurements, res, callback) {
  const sql_query_EyeMeasurement = `INSERT INTO EyeMeasurement (RecordID, LeftEye, RightEye) VALUES ( ?, ?, ?)`;

  connection.query(sql_query_EyeMeasurement,[RecordID, EyeMeasurements.LeftEye, EyeMeasurements.RightEye],(eyeMeasurementErr, eyeMeasurementResult) => {
    if (eyeMeasurementErr) {
      console.error("Error creating EyeMeasurement:", eyeMeasurementErr);
      res.status(500).json({ error:  "Internal Server Error, Check if RecordID exists" });
      return;
    } 
    const insertedEyeMeasurementID = eyeMeasurementResult.insertId; 
    console.log("New EyeMeasurement is created with EyeMeasurementID:",insertedEyeMeasurementID);
    callback();
  });
}

//==============================================================================================================
function insertNutrition(RecordID, NutritionData, res,callback) {
  const sql_query_Nutrition = `INSERT INTO Nutrition (RecordID, DietPlan, Inbody) VALUES ( ?, ?, ?)`;
  connection.query(sql_query_Nutrition,[RecordID, NutritionData.DietPlan, NutritionData.Inbody],(nutritionDataErr, nutritionDataResult) => {
    if (nutritionDataErr) {
      console.error("Error creating Nutrition:", nutritionDataErr);
      res.status(500).json({ error:  "Internal Server Error, Check if RecordID exists" });
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