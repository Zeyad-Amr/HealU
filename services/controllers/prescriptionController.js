const connection = require('../DataBase/connection'); // Import the connection module 

//=========================================================================================
function createPrescription(req, res) {
  const {
    RecordID,
    DoctorName,
    Diagnosis,
    ExtraNotes,
    Drugs,
    } = req.body;

  // Check if RecordID exists in Record table
  const checkRecordQuery = `SELECT * FROM Record WHERE RecordID = ?`;
  connection.query(checkRecordQuery, [RecordID], (checkRecordErr, recordResult) => {
    if (checkRecordErr) {
      console.error("Error checking for existing RecordID:", checkRecordErr);
      res.status(500).json({ error: "Internal Server Error, Check if RecordID exists in Record table" });
      return;
    }
    if (recordResult.length === 0) {    // If RecordID doesn't exist, handle the error
      console.log("RecordID does not exist in the Record table");
      res.status(400).json({ error: "RecordID does not exist in Record Table" });
      return;
    }
    // Extract PatientID from recordResult
    const PatientID= recordResult[0].PatientID;

    // Check if RecordID already exists in the Prescription table    ( 1 to 1 connection)
    const checkPrescriptionQuery = `SELECT * FROM Prescription WHERE RecordID = ?`;

    connection.query(checkPrescriptionQuery, [RecordID], (checkPrescriptionErr, prescriptionResult) => {
      if (checkPrescriptionErr) {
        console.error("Error checking for existing RecordID in Prescription table:", checkPrescriptionErr);
        res.status(500).json({ error: "Internal Server Error, Check if RecordID exists in the Prescription table " });
        return;
      }
      if (prescriptionResult.length > 0) {          // If RecordID already exists in Prescription table, handle the error
        console.log("RecordID already exists in the Prescription table");
        res.status(400).json({ error: "Duplicate RecordID in Prescription table" });
        return;
      }

      insertPrescription(RecordID,PatientID, DoctorName, Diagnosis, ExtraNotes, res, (insertedPrescriptionID) => {
        if (Drugs.length > 0){
          insertDrugs(insertedPrescriptionID, Drugs, res ,() => {});
        }
        res.status(201).json({ message: "Prescription with Drugs is created successfully" });
    });
  });
});
}

//================================================================================================
function getAllPrescriptions(req, res) {
  const sql_query = generatePrescriptionQuery("","");

  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: "This Prescription is not found" });
    } 
    else {
      const prescriptionArray = processQueryResult(result);
      res.json(prescriptionArray);
    }
  });
  };
//================================================================================================
function getPrescriptionByID (req, res){
  const PrescriptionID = req.params.prescriptionID;
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
};
//===============================================================================================
function generatePrescriptionQuery(joinConditions, whereConditions) {   // Function to generate the common SQL query for retrieving prescriptions
  const sql_query = `
    SELECT prescription.PrescriptionID, prescription.RecordID, prescription.PatientID,  prescription.DoctorName, prescription.Diagnosis, prescription.ExtraNotes, 
    drug.DrugID, drug.DName, drug.DDuration, drug.DDose
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
        RecordID: row.RecordID,
        PatientID: row.PatientID,
        DoctorName: row.DoctorName,
        Diagnosis: row.Diagnosis,
        ExtraNotes: row.ExtraNotes,
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
function insertPrescription(RecordID, PatientID, DoctorName, Diagnosis, ExtraNotes, res, callback) {    // Insert into Prescription table
const sql_query_Prescription = `INSERT INTO Prescription (RecordID, PatientID, DoctorName, Diagnosis, ExtraNotes) VALUES (?, ?, ?, ?, ?)`;
connection.query(
  sql_query_Prescription,
  [RecordID, PatientID, DoctorName, Diagnosis, ExtraNotes],
  (prescriptionErr, prescriptionResult) => {
    if (prescriptionErr) {
      console.error("Error creating Prescription:", prescriptionErr);
      res.status(500).json({ error: "Internal Server Error, Check if RecordID exists" });
      return;
    }
    const insertedPrescriptionID = prescriptionResult.insertId;  // Get the auto-incremented RecordID from the inserted record
    console.log("New Prescription created with PrescriptionID:",insertedPrescriptionID);
    callback(insertedPrescriptionID);      // Pass the insertedPrescriptionID to the callback function
  });
}
//==============================================================================================
function insertDrugs(insertedPrescriptionID, Drugs, res , callback) {        // Insert drugs into drug table
const sql_query_Drug = `INSERT INTO drug (PrescriptionID, DName, DDuration, DDose) VALUES ( ?, ?, ?, ?)`;

// handling asynchronous insertion of multiple drugs
Promise.all(Drugs.map((drug) => { return new Promise((resolve, reject) => {
  connection.query(sql_query_Drug,[insertedPrescriptionID, drug.DName, drug.DDuration, drug.DDose],(drugErr, drugResult) => {
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
    res.status(500).json({ error: "Internal Server Error, Check if PrescriptionID exists " });
  });
}
//===============================================================================================
module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionByID,
};