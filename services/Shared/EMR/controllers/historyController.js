const connection = require('../DataBase/connection'); // Import the connection module 
 
// ============================================================================================================
function generateRecordQuery(joinConditions, whereConditions) {   // Function to generate the common SQL query for retrieving mwdical history

  select_query = `
  SELECT MedicalHistory.PatientID,
  Illnesses.IllnessID, Illnesses.IllnessDescription,
  Operations.OperationID, Operations.OperationName, Operations.OperationDate,
  MedicalTests.TestID, MedicalTests.TestName, MedicalTests.TestResult,
  Complaints.ComplaintID, Complaints.ComplaintDescription

  FROM MedicalHistory
  LEFT JOIN Illnesses ON MedicalHistory.PatientID = Illnesses.PatientID
  LEFT JOIN Operations ON MedicalHistory.PatientID = Operations.PatientID
  LEFT JOIN MedicalTests ON MedicalHistory.PatientID = MedicalTests.PatientID
  LEFT JOIN Complaints ON MedicalHistory.PatientID = Complaints.PatientID
  ${joinConditions}
  WHERE MedicalHistory.PatientID IS NOT NULL ${whereConditions}`;

  return  select_query;
}
//==================================================================================================================
function getMedicalhistory (req, res)  {         //Get All medical histories
  const sql_query = generateRecordQuery('', '');
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: 'This Patient is not found in the medical history' });
    } else {
      const medicalHistory = processQueryResult(result);
      res.status(200).json(medicalHistory);
    }
  });
}
//==================================================================================================================
function getMedicalhistoryByPatientID(req, res) {     //Get medical history with id
  const patientID = req.params.patientID;
  const sql_query = generateRecordQuery('', `AND MedicalHistory.PatientID = ${patientID}`);

  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: `No medical history found for patient with ID ${patientID}.` });
    } else {
      const medicalHistory = processQueryResult(result);
      res.status(200).json(medicalHistory);
    }
  });
}
//==========================================================================================================================
function processQueryResult(result) {          //Function to process the query result and build the medical history map
  const patientsMap = {};
  // Create a set to store unique IDs for each type
  const uniqueIllnessIDs = new Set();
  const uniqueOperationIDs = new Set();
  const uniqueTestIDs = new Set();
  const uniqueComplaintIDs = new Set();

  result.forEach((row) => {
    const { PatientID, IllnessID, OperationID, TestID, ComplaintID } = row;

    if (!patientsMap[PatientID]) {
      patientsMap[PatientID] = {
        PatientID,
        Illnesses: [],
        Operations: [],
        MedicalTests: [],
        Complaints: [],
      };
    }
      // Check if IllnessID is not null and not already in the array
    if (IllnessID !== null && !uniqueIllnessIDs.has(IllnessID)) {
      uniqueIllnessIDs.add(IllnessID);
      patientsMap[PatientID].Illnesses.push({ IllnessDescription: row.IllnessDescription });
    }

    // Check if OperationID is not null and not already in the array
    if (OperationID !== null && !uniqueOperationIDs.has(OperationID)) {
      uniqueOperationIDs.add(OperationID);
      patientsMap[PatientID].Operations.push({ OperationName: row.OperationName, OperationDate: row.OperationDate });
    }

    // Check if TestID is not null and not already in the array
    if (TestID !== null && !uniqueTestIDs.has(TestID)) {
      uniqueTestIDs.add(TestID);
      patientsMap[PatientID].MedicalTests.push({ TestName: row.TestName, TestResult: row.TestResult });
    }

    // Check if ComplaintID is not null and not already in the array
    if (ComplaintID !== null && !uniqueComplaintIDs.has(ComplaintID)) {
      uniqueComplaintIDs.add(ComplaintID);
      patientsMap[PatientID].Complaints.push({ ComplaintDescription: row.ComplaintDescription });
    }
  });
  return Object.values(patientsMap);
}
// .......................................Create operation (POST)....................................................
function createMedicalHistory(req, res) {
  const { PatientID,Illnesses,Operations,MedicalTests, Complaints} = req.body;

  // ..................Check for existing PatientID in the MedicalHistory table
  const checkMedicalHistoryQuery = `SELECT * FROM MedicalHistory WHERE PatientID = ?`;

  connection.query(checkMedicalHistoryQuery, [PatientID], (checkPatientErr, PatientResult) => {
    if (checkPatientErr) {
      console.error("Error checking for existing PatientID:", checkPatientErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (PatientResult.length === 0) {
      res.status(404).json({ message: `No patient found with ID ${PatientID}` });
    }
  
     // If PatientID already exists, handle the error
    if (PatientResult.length > 0) {
      console.log("PatientID already exists in the MedicalHistory table");
  
    Promise.all([
      insertDataIntoTable('Illnesses', ['PatientID', 'IllnessDescription'], Illnesses, PatientID),
      insertDataIntoTable('Operations', ['PatientID', 'OperationName', 'OperationDate'], Operations, PatientID),
      insertDataIntoTable('MedicalTests', ['PatientID', 'TestName', 'TestResult'], MedicalTests, PatientID),
      insertDataIntoTable('Complaints', ['PatientID', 'ComplaintDescription'], Complaints, PatientID),
    ])
      .then(() => {
        // Respond with success message
        res.status(201).json({ message: "Medical History created successfully" });
      })
      .catch((error) => {
        console.error("Error inserting:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
    }
 });
}
//==============================================================================================================
function insertDataIntoTable(tableName, columns, data,ID) {
  const sqlQuery = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;

  return Promise.all(
    data.map((item) => {
      return new Promise((resolve, reject) => {
        connection.query(
          sqlQuery,
          [ID ,...Object.values(item)],
          (err, result) => {
            if (err) {
              console.error(`Error creating ${tableName}`, err);
              reject(err);
            } else {
              console.log(`${tableName} created successfully`);
              resolve(result);
            }
          }
        );
      });
    })
  );
}
//====================================================================================================================
module.exports = {
  createMedicalHistory,
  getMedicalhistory,
  getMedicalhistoryByPatientID,
};  