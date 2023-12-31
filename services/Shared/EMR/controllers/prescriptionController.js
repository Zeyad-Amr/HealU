const axios = require('axios');
const connection = require('../DataBase/connection'); // Import the connection module 
require('dotenv').config();
//=========================================================================================
async function createPrescription(req, res) {  // Create new prescription 
  const {
    AppointmentID,
    DoctorName,
    Diagnosis,
    ExtraNotes,
    Drugs,
  } = req.body;

  try {       // Check if AppointmentID exists 
    const appointmentsUrl = process.env.APPOINTMENTS_API_URL; 
    const response = await axios.get(`${appointmentsUrl}/appointments/${AppointmentID}`).catch(() => null);

    if ((!response || !response.data)) {
      console.log(`AppointmentID ${AppointmentID} is not found in Appointments List`);
      return res.status(404).json({ message: `AppointmentID ${AppointmentID} is not found in Appointments List` });
    }
    const PatientID = response?.data?.patientId; 

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
    
    insertPrescription(PatientID, AppointmentID, DoctorName, Diagnosis, ExtraNotes,(insertedPrescriptionID) => {
      if (Drugs.length > 0){
        insertDrugs(insertedPrescriptionID,PatientID, Drugs,() => {});
      }
      console.log( "Prescription with Drugs is created successfully");
      res.status(201).json({ message: "Prescription with Drugs is created successfully" });
    });

    // Rest of your existing code
  } catch (appointmentsError) {
    console.error("Error checking for existing AppointmentID:", appointmentsError);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
//================================================================================================
function getAllPrescriptions(req, res) {  //Get all prescriptions
  const sql_query = generatePrescriptionQuery("","");
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: "No Prescriptions found in prescriptions list" });
    } 
    else {
      const prescriptionArray = processQueryResult(result);
      res.json(prescriptionArray);
    }
  });
}
//================================================================================================
function getPrescriptionByID (req, res){  // Get prescription by prescriptionId
  const PrescriptionID = req.params.prescriptionId;
  const sql_query = generatePrescriptionQuery("",` AND prescription.PrescriptionID = ${PrescriptionID}`);
  connection.query(sql_query, [PrescriptionID], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: `Prescription with ID ${PrescriptionID} not found.` });
    } 
    else {
      const prescriptionArray = processQueryResult(result);
      res.json(prescriptionArray);
    }
  });
}
//================================================================================================
function getPrescriptionByPatientID (req, res){   // Get prescription by patientId
  const PatientID = req.params.patientId;
  const sql_query = generatePrescriptionQuery("",` AND prescription.PatientID = ${PatientID}`);
  connection.query(sql_query, [PatientID], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: `Prescription with PatientID ${PatientID} not found.` });
    } 
    else {
      const prescriptionArray = processQueryResult(result);
      res.json(prescriptionArray);
    }
  });
}
//===============================================================================================
function generatePrescriptionQuery(joinConditions, whereConditions) {   // Function to generate the common SQL query for retrieving prescriptions
  const sql_query = `
    SELECT prescription.PrescriptionID, prescription.PatientID, prescription.AppointmentID,  prescription.DoctorName, prescription.Diagnosis, prescription.ExtraNotes, 
    prescription.CreatedAt, drug.DrugID, drug.DName, drug.DDuration, drug.DDose
    FROM prescription
    LEFT JOIN drug ON prescription.PrescriptionID = drug.PrescriptionID
    ${joinConditions}
    WHERE prescription.PrescriptionID IS NOT NULL ${whereConditions}` ;

  return sql_query;
}
//===============================================================================================
function processQueryResult(result) {          //Function to process the query result and build the prescription map
  const prescriptionMap = {};
  result.forEach((row) => {
    const {PrescriptionID, DrugID} = row;

    if (!prescriptionMap[PrescriptionID]) {
      prescriptionMap[PrescriptionID] = {
        PrescriptionID,
        PatientID: row.PatientID,
        AppointmentID: row.AppointmentID,
        DoctorName: row.DoctorName,
        Diagnosis: row.Diagnosis,
        ExtraNotes: row.ExtraNotes,
        CreatedAt: row.CreatedAt,
        drug: []
      };
    }
    // Check if DrugID is not null and not already in the array
    if (DrugID !== null ) {
      prescriptionMap[PrescriptionID].drug.push({ DrugID, DrugName: row.DName, DrugDuration: row.DDuration, DrugDose: row.DDose });
    }
  });

  return Object.values(prescriptionMap);
}
//================================================================================================
async function insertPrescription(PatientID, AppointmentID, DoctorName, Diagnosis, ExtraNotes,callback) {    // Insert into Prescription table
  const sql_query_Prescription = `INSERT INTO prescription (PatientID, AppointmentID,  DoctorName, Diagnosis, ExtraNotes) VALUES (?, ?, ?, ?, ?)`;
  const [prescriptionResult] = await connection.promise().query(sql_query_Prescription,[PatientID, AppointmentID,  DoctorName, Diagnosis, ExtraNotes]);
  const insertedPrescriptionID = prescriptionResult.insertId;  // Get the auto-incremented RecordID from the inserted record
  console.log("New Prescription created with PrescriptionID:",insertedPrescriptionID);
  callback(insertedPrescriptionID);      // Pass the insertedPrescriptionID to the callback function
}
//==============================================================================================
function insertDrugs(insertedPrescriptionID,PatientID, Drugs,callback) {        // Insert drugs into drug table
  const sql_query_Drug = `INSERT INTO drug (PrescriptionID,PatientID, DName, DDuration, DDose) VALUES ( ?, ?, ?, ?, ?)`;
  // handling asynchronous insertion of multiple drugs
  Promise.all(Drugs.map((drug) => { return new Promise((resolve, reject) => {
    connection.query(sql_query_Drug,[insertedPrescriptionID,PatientID, drug.DrugName, drug.DrugDuration, drug.DrugDose],(drugErr, drugResult) => {
      if (drugErr) {
        console.error(`Error creating Drug`, drugErr);
        reject(drugErr);
      } else {
        const insertedDrugID = drugResult.insertId;  
        console.log(`New Drug is created with DrudID:`,insertedDrugID);
        resolve(drugResult);
      }
    });
  });
  })
  )
  .then(() => {
    callback ();
  })
  .catch((error) => {
    console.error("Error inserting drugs:", error);
  });
}
//===============================================================================================
module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionByID,
  getPrescriptionByPatientID
};
