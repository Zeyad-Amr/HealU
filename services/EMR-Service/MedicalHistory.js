const mysql2 = require('mysql2');
const express = require('express');

// import mysql2 from "mysql2"
// import express from "express"

const connection = mysql2.createConnection({
    host: "localhost",
    database: "emr_service",
    user: "root",
    password: "",
});

const app = express();


const PORT = 5000;


app.listen(PORT, ()=> {
    console.log(`SERVER : http://localhost:${PORT}`);
    connection.connect((err)=> {
        if (err) throw err;
        console.log("DATABASE CONNECTED");
    })
})

app.use(express.json());
   
 //======================================= Read operation (GET All) ===================================================
 app.get("/medicalHistory", (req, res) => {
  const sql_query = `
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
    WHERE MedicalHistory.PatientID IS NOT NULL
  `;

  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: "This Patient is not found in the medical history" });
    } else {
      const patientsMap = {};

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
        if (IllnessID !== null && !patientsMap[PatientID].Illnesses.some((illness) => illness.IllnessID === IllnessID)) {
          patientsMap[PatientID].Illnesses.push({ IllnessID, IllnessDescription: row.IllnessDescription });
        }

        // Check if OperationID is not null and not already in the array
        if (OperationID !== null && !patientsMap[PatientID].Operations.some((operation) => operation.OperationID === OperationID)) {
          patientsMap[PatientID].Operations.push({ OperationID, OperationName: row.OperationName, OperationDate: row.OperationDate });
        }

        // Check if TestID is not null and not already in the array
        if (TestID !== null && !patientsMap[PatientID].MedicalTests.some((medicaltest) => medicaltest.TestID === TestID)) {
          patientsMap[PatientID].MedicalTests.push({ TestID, TestName: row.TestName, TestResult: row.TestResult });
        }

        // Check if ComplaintID is not null and not already in the array
        if (ComplaintID !== null && !patientsMap[PatientID].Complaints.some((complaint) => complaint.ComplaintID === ComplaintID)) {
          patientsMap[PatientID].Complaints.push({ ComplaintID, ComplaintDescription: row.ComplaintDescription });
        }
      });

      const patientsArray = Object.values(patientsMap);
      res.json(patientsArray);
    }
  });
});


  //========================================== Read operation (GET BY ID) ========================================
  app.get("/medicalHistory/:patientID", (req, res) => {
    const PatientID = req.params.patientID;
    const sql_query = `
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
    WHERE MedicalHistory.PatientID = ?
  `;
    connection.query(sql_query, [PatientID], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).json({ message: "This Patient is not found in the medical history" });
      } else {
        const patientsMap = {};

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
          if (IllnessID !== null && !patientsMap[PatientID].Illnesses.some((illness) => illness.IllnessID === IllnessID)) {
            patientsMap[PatientID].Illnesses.push({ IllnessID, IllnessDescription: row.IllnessDescription });
          }
  
          // Check if OperationID is not null and not already in the array
          if (OperationID !== null && !patientsMap[PatientID].Operations.some((operation) => operation.OperationID === OperationID)) {
            patientsMap[PatientID].Operations.push({ OperationID, OperationName: row.OperationName, OperationDate: row.OperationDate });
          }
  
          // Check if TestID is not null and not already in the array
          if (TestID !== null && !patientsMap[PatientID].MedicalTests.some((medicaltest) => medicaltest.TestID === TestID)) {
            patientsMap[PatientID].MedicalTests.push({ TestID, TestName: row.TestName, TestResult: row.TestResult });
          }
  
          // Check if ComplaintID is not null and not already in the array
          if (ComplaintID !== null && !patientsMap[PatientID].Complaints.some((complaint) => complaint.ComplaintID === ComplaintID)) {
            patientsMap[PatientID].Complaints.push({ ComplaintID, ComplaintDescription: row.ComplaintDescription });
          }
        });
  
        const patientsArray = Object.values(patientsMap);
        res.json(patientsArray);
            }
    });
  });


   // .......................................Create operation (POST)....................................................
   app.post("/medicalHistory", (req, res) => {
    const { PatientID,Illnesses,Operations,MedicalTests, Complaints} = req.body;
  
    // ..................Check for existing PatientID in the MedicalHistory table
  const checkMedicalHistoryQuery = `SELECT * FROM MedicalHistory WHERE PatientID = ?`;

  connection.query(checkMedicalHistoryQuery, [PatientID], (checkPatientErr, PatientResult) => {
    if (checkPatientErr) {
      console.error("Error checking for existing PatientID:", checkPatientErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  
     // If PatientID already exists, handle the error
    if (PatientResult.length > 0) {
      console.log("PatientID already exists in the MedicalHistory table");
      res.status(400).json({ error: "Duplicate PatientID" });
      return;
    }
  
        // If PatientID is not a duplicate, proceed with the insertion
                // Insert into MedicalHistory table
                const sql_query_MedicalHistory = `INSERT INTO MedicalHistory (PatientID) VALUES (?)`;
                connection.query(
                  sql_query_MedicalHistory,
                  [PatientID],
                  (PatientIDErr, PatientIDResult) => {
                    if (PatientIDErr) {
                      console.error("Error creating MedicalHistory:", PatientIDErr);
                      res.status(500).json({ error: "Internal Server Error" });
                      return;
                    }
                    console.log("New PatientID created");
            // ....................Insert into Illness table
            const sql_query_Illness = `INSERT INTO Illnesses (IllnessID , PatientID , IllnessDescription) VALUES (?, ?, ?)`;

            // handling asynchronous insertion of multiple drugs
            Promise.all(
              Illnesses.map((Illness) => {
                return new Promise((resolve, reject) => {
                  connection.query(
                    sql_query_Illness,
                    [Illness.IllnessID, PatientID, Illness.IllnessDescription],
                    (IllnessErr, IllnessResult) => {
                      if (IllnessErr) {
                        console.error(`Error creating Illness ${Illness.IllnessID}:`, IllnessErr);
                        reject(IllnessErr);
                      } else {
                        console.log(`Illness ${Illness.IllnessID} created`);
                        resolve(IllnessResult);
                      }
                    }
                  );
                });
              })
            )

             // ................Insert into Operations table
                const sql_query_Operations = `INSERT INTO Operations (OperationID , PatientID , OperationName, OperationDate) VALUES (?, ?, ?, ?)`;
  
            // handling asynchronous insertion of multiple Operations
            Promise.all(
              Operations.map((Operation) => {
                return new Promise((resolve, reject) => {
                  connection.query(
                    sql_query_Operations,
                    [Operation.OperationID, PatientID, Operation.OperationName,Operation.OperationDate],
                    (OperationErr, OperationResult) => {
                      if (OperationErr) {
                        console.error(`Error creating Operation ${Operation.OperationID}:`, OperationErr);
                        reject(OperationErr);
                      } else {
                        console.log(`Operation ${Operation.OperationID} created`);
                        resolve(OperationResult);
                      }
                    }
                  );
                });
              })
            )

              // ................Insert into MedicalTests table
              const sql_query_MedicalTests = `INSERT INTO MedicalTests (TestID , PatientID , TestName, TestResult) VALUES (?, ?, ?, ?)`;
  
            // handling asynchronous insertion of multiple drugs
            Promise.all(
              MedicalTests.map((medicalTest) => {
                return new Promise((resolve, reject) => {
                  connection.query(
                    sql_query_MedicalTests,
                    [medicalTest.TestID, PatientID, medicalTest.TestName,medicalTest.TestResult],
                    (medicalTestErr, medicalTestResult) => {
                      if (medicalTestErr) {
                        console.error(`Error creating MedicalTest ${medicalTest.TestID}:`, medicalTestErr);
                        reject(medicalTestErr);
                      } else {
                        console.log(`MedicalTest ${medicalTest.TestID} created`);
                        resolve(medicalTestResult);
                      }
                    }
                  );
                });
              })
            )

          // ................Insert into Complaints table
          const sql_query_Complaints = `INSERT INTO Complaints (ComplaintID  , PatientID , ComplaintDescription) VALUES (?, ?, ?)`;
  
            // handling asynchronous insertion of multiple Complaints
            Promise.all(
              Complaints.map((complaint) => {
                return new Promise((resolve, reject) => {
                  connection.query(
                    sql_query_Complaints,
                    [complaint.ComplaintID, PatientID, complaint.ComplaintDescription],
                    (complaintErr, complaintResult) => {
                      if (complaintErr) {
                        console.error(`Error creating Complaint ${complaint.ComplaintID}:`, complaintErr);
                        reject(complaintErr);
                      } else {
                        console.log(`Complaint ${complaint.ComplaintID} created`);
                        resolve(complaintResult);
                      }
                    }
                  );
                });
              })
            )
              .then(() => {
                // Respond with success message
                res
                  .status(201)
                  .json({ message: "Medical History created successfully" });
              })
              .catch((error) => {
                console.error("Error inserting:", error);
                res.status(500).json({ error: "Internal Server Error" });
              });
          }
        );
      });
   });  
