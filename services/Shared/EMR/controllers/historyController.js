const axios = require('axios');
const connection = require('../DataBase/connection'); // Import the connection module 
require('dotenv').config();
// ============================================================================================================
function generateRecordQuery(joinConditions, whereConditions) {   // Function to generate the common SQL query for retrieving mwdical history
  select_query = `
  SELECT medicalhistory.PatientID,
  illnesses.IllnessID, illnesses.IllnessDescription,
  operations.OperationID, operations.OperationName, operations.OperationDate,
  medicaltests.TestID, medicaltests.TestDescription,
  complaints.ComplaintID, complaints.ComplaintDescription,
  drug.DrugID, drug.DName, drug.DDuration, drug.DDose 

  FROM medicalhistory
  LEFT JOIN illnesses ON medicalhistory.PatientID = illnesses.PatientID
  LEFT JOIN operations ON medicalhistory.PatientID = operations.PatientID
  LEFT JOIN medicaltests ON medicalhistory.PatientID = medicaltests.PatientID
  LEFT JOIN complaints ON medicalhistory.PatientID = complaints.PatientID
  LEFT JOIN drug ON medicalhistory.PatientID = drug.PatientID

  ${joinConditions}
  WHERE medicalhistory.PatientID IS NOT NULL ${whereConditions}`;

  return  select_query;
}
//==================================================================================================================
function getMedicalhistory (req, res)  {         //Get All medical histories
  const sql_query = generateRecordQuery('', '');
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: 'No Patients found in the medical history list' });
    } else {
      const medicalHistory = processQueryResult(result);
      res.status(200).json(medicalHistory);
    }
  });
}
//==================================================================================================================
function getMedicalhistoryByPatientID(req, res) {     //Get medical history with id
  const patientID = req.params.patientId;
  const sql_query = generateRecordQuery('', `AND medicalhistory.PatientID = ${patientID}`);

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
  const uniqueDrugIDs = new Set();

  result.forEach((row) => {
    const { PatientID, IllnessID, OperationID, TestID, ComplaintID , DrugID} = row;

    if (!patientsMap[PatientID]) {
      patientsMap[PatientID] = {
        PatientID,
        Illnesses: [],
        Operations: [],
        MedicalTests: [],
        Complaints: [],
        Drugs: [],
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
      patientsMap[PatientID].MedicalTests.push({ TestDescription: row.TestDescription });
    }

    // Check if ComplaintID is not null and not already in the array
    if (ComplaintID !== null && !uniqueComplaintIDs.has(ComplaintID)) {
      uniqueComplaintIDs.add(ComplaintID);
      patientsMap[PatientID].Complaints.push({ ComplaintDescription: row.ComplaintDescription });
    }

    // Check if DrugID is not null and not already in the array
    if (DrugID !== null && !uniqueDrugIDs.has(DrugID)) {
      uniqueDrugIDs.add(DrugID);
      patientsMap[PatientID].Drugs.push({DrugName:row.DName, DrugDuration:row.DDuration, DrugDose:row.DDose});
    }
  });
  return Object.values(patientsMap);
}
// .==================================== Create operation (POST) ================================================
async function createMedicalHistory(req, res) {
  const { PatientID, Illnesses, Operations, MedicalTests, Complaints, Drugs } = req.body;

  try {
    // Check if PatientID exists
    const registerationUrl = process.env.REGISTERATION_API_URL;
    const response = await axios.get(`${registerationUrl}/user/patient/${PatientID}`).catch(() => null);

    if (!response || !response.data) {
      console.log(`PatientID ${PatientID} is not found in Registeration List`);
      return res.status(404).json({ message:`PatientID ${PatientID} is not found in Registeration List` });
    }

    // Map MedicalTests array to promises checking if TestID exists in the external API (Storage API)
    const medicalTestPromises = MedicalTests.map(async (medicalTest) => {
      const { TestID } = medicalTest;

      const testUrl = process.env.MEDICALTEST_API_URL;

      const Imagesresponse = await axios.get(`${testUrl}/api/v1/images/${TestID}`).catch(() => null);
      const Filesresponse = await axios.get(`${testUrl}/api/v1/files/${TestID}`).catch(() => null);

      if ((!Imagesresponse || !Imagesresponse.data) && (!Filesresponse || !Filesresponse.data)) {
        console.log(`Tests are not found for TestID ${TestID}`);
        return { message: `Tests are not found for TestID ${TestID}` };
      }

      // Check if the PatientID matches the response.patientId
      const imagePatientId = Imagesresponse?.data?.data?.image?.patientId;
      const filesPatientId = Filesresponse?.data?.data?.file?.patientId;
      const responsePatientId = imagePatientId || filesPatientId;

      if (responsePatientId != PatientID) {
        console.log(`TestID ${TestID} does not belong to the patient with patientId: ${PatientID}`);
        return { message: `TestID ${TestID} does not belong to the patient with patientId: ${PatientID}` };
      }

      return null;
    });

    const medicalTestResults = await Promise.all(medicalTestPromises);      // Wait for all promises to resolve

    const testmessages = medicalTestResults.filter((result) => result && result.message);      // Collect errors from medicalTestResults

    if (testmessages.length > 0) {
      return res.status(404).json({ messages: testmessages });
    }
    // Check if PatientID exists in MedicalHistory table
    const checkMedicalHistoryQuery = `SELECT * FROM medicalhistory WHERE PatientID = ?`;
    const [medicalHistoryResult] = await connection.promise().query(checkMedicalHistoryQuery, [PatientID]);

    if (medicalHistoryResult.length === 0) {        // If PatientID does not exist in the MedicalHistory table, insert it
      const sql_query_medicalhistory = `INSERT INTO medicalhistory (PatientID) VALUES (?)`;
      await connection.promise().query(sql_query_medicalhistory, [PatientID]);
      console.log("New Patient is created with PatientID:", PatientID);
    }

    // Check if PatientID has referenced values in other tables ( his medical history already exists) (patient has only one medical history)
      const referencesQuery = `
      SELECT PatientID FROM medicaltests WHERE PatientID = ?
      UNION
      SELECT PatientID FROM illnesses WHERE PatientID = ?
      UNION
      SELECT PatientID FROM operations WHERE PatientID = ?
      UNION
      SELECT PatientID FROM complaints WHERE PatientID = ?
      UNION
      SELECT PatientID FROM drug WHERE PatientID = ? AND PrescriptionID IS NULL
    `;

    const [referencesResult] = await connection.promise().query(referencesQuery, [PatientID, PatientID, PatientID, PatientID, PatientID]);

    if (referencesResult.length > 0) {        // If PatientID has referenced values, return an error (patient has already history)
      const Message = `Sorry, PatientID ${PatientID} has already added his medical history before`;
      console.log(Message);
      return res.status(404).json({ message: Message });
    }

    // Now that all validations passed, proceed with insertions into other tables

    // Insert data into the MedicalTests table
    await insertDataIntoTable('medicaltests', ['PatientID', 'TestID', 'TestDescription'], MedicalTests, PatientID);

    await Promise.all([       // Insert data into other tables
      insertDataIntoTable('illnesses', ['PatientID', 'IllnessDescription'], Illnesses, PatientID),
      insertDataIntoTable('operations', ['PatientID', 'OperationName', 'OperationDate'], Operations, PatientID),
      insertDataIntoTable('complaints', ['PatientID', 'ComplaintDescription'], Complaints, PatientID),
      insertDataIntoTable('drug', ['PatientID', 'DName', 'DDuration', 'DDose'], Drugs, PatientID),
    ]);

    // Respond with succ ess message
    console.log(`New Medical History is created successfully with PatientID: ${PatientID}`);
    res.status(201).json({ message:`New Medical History is created successfully with PatientID: ${PatientID}`});
  } catch (error) {
    console.error("Error creating medical history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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




