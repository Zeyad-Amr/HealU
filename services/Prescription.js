import mysql2 from "mysql2"
import express from "express"

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
  
  // .......................................Create operation (POST)....................................................
  app.post("/prescription", (req, res) => {
    const {
      PrescriptionID,
      PatientID,
      Drugs,
      RecordID,
      DoctorName,
      Diagnosis,
      ExtraNotes,
    } = req.body;
  
    // ..........Check if RecordID exists in Record table
    const checkRecordQuery = `SELECT * FROM Record WHERE RecordID = ?`;
  
    connection.query(checkRecordQuery, [RecordID], (checkRecordErr, recordResult) => {
      if (checkRecordErr) {
        console.error("Error checking for existing RecordID:", checkRecordErr);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
  
      // If RecordID doesn't exist, handle the error
      if (recordResult.length === 0) {
        console.log("RecordID does not exist in the Record table");
        res.status(400).json({ error: "RecordID does not exist in Record Table" });
        return;
      }
  
      // Check if RecordID already exists in the Prescription table
      const checkPrescriptionQuery = `SELECT * FROM Prescription WHERE RecordID = ?`;
  
      connection.query(checkPrescriptionQuery, [RecordID], (checkPrescriptionErr, prescriptionResult) => {
        if (checkPrescriptionErr) {
          console.error("Error checking for existing RecordID in Prescription table:", checkPrescriptionErr);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
  
        // If RecordID already exists in Prescription table, handle the error
        if (prescriptionResult.length > 0) {
          console.log("RecordID already exists in the Prescription table");
          res.status(400).json({ error: "Duplicate RecordID in Prescription table" });
          return;
        }
  
// If RecordID is not a duplicate, proceed with the insertion
  
        // Insert into Prescription table
        const sql_query_Prescription = `INSERT INTO Prescription (PrescriptionID, RecordID, DoctorName, Diagnosis, ExtraNotes) VALUES (?, ?, ?, ?, ?)`;
        connection.query(
          sql_query_Prescription,
          [PrescriptionID, RecordID, DoctorName, Diagnosis, ExtraNotes],
          (prescriptionErr, prescriptionResult) => {
            if (prescriptionErr) {
              console.error("Error creating Prescription:", prescriptionErr);
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }
            console.log("New Prescription created");
  
            // Insert drugs into drug table
            const sql_query_Drug = `INSERT INTO drug (DrugID, PatientID, PrescriptionID, DName, DDuration, DDose) VALUES (?, ?, ?, ?, ?, ?)`;
  
            // handling asynchronous insertion of multiple drugs
            Promise.all(
              Drugs.map((drug) => {
                return new Promise((resolve, reject) => {
                  connection.query(
                    sql_query_Drug,
                    [drug.DrugID, PatientID, PrescriptionID, drug.DName, drug.DDuration, drug.DDose],
                    (drugErr, drugResult) => {
                      if (drugErr) {
                        console.error(`Error creating Drug ${drug.DrugID}:`, drugErr);
                        reject(drugErr);
                      } else {
                        console.log(`Drug ${drug.DrugID} created`);
                        resolve(drugResult);
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
                  .json({ message: "Prescription and Drugs created successfully" });
              })
              .catch((error) => {
                console.error("Error inserting drugs:", error);
                res.status(500).json({ error: "Internal Server Error" });
              });
          }
        );
      });
    });
  });
  
  

// ...........................................Read operation (GET All).....................................................
app.get("/prescription", (req, res) => {
  const sql_query = `
    SELECT prescription.PrescriptionID, prescription.RecordID, prescription.DoctorName, prescription.Diagnosis, prescription.ExtraNotes, 
    drug.DrugID, drug.PatientID, drug.PrescriptionID, drug.DName, drug.DDuration, drug.DDose
    FROM prescription
    LEFT JOIN drug ON prescription.PrescriptionID = drug.PrescriptionID
    WHERE prescription.PrescriptionID IS NOT NULL
  `;

  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: "This Prescription is not found" });
    } else {
      const prescriptionMap = {};

      result.forEach((row) => {
        const { PrescriptionID, DrugID, RecordID, DoctorName, Diagnosis, ExtraNotes, PatientID } = row;

        if (!prescriptionMap[PrescriptionID]) {
          prescriptionMap[PrescriptionID] = {
            PrescriptionID,
            RecordID,
            PatientID,
            DoctorName,
            Diagnosis,
            ExtraNotes,
            drug: []
          };
        }

        // Check if IllnessID is not null and not already in the array
        if (DrugID !== null && !prescriptionMap[PrescriptionID].drug.some((drug) => drug.DrugID === DrugID)) {
          prescriptionMap[PrescriptionID].drug.push({ DrugID,DrugName: row.DName, DrugTime: row.DDuration, DrugDose: row.DDose });
        }

       
      });

      const prescriptionArray = Object.values(prescriptionMap);
      res.json(prescriptionArray);
    }
  });
});


  // ...............................................Read operation (GET BY ID)...........................................
  app.get("/prescription/:prescriptionID", (req, res) => {
    const PrescriptionID = req.params.prescriptionID;
    const sql_query = `
    SELECT prescription.PrescriptionID, prescription.RecordID, prescription.DoctorName, prescription.Diagnosis, prescription.ExtraNotes, 
    drug.DrugID, drug.PatientID, drug.PrescriptionID, drug.DName, drug.DDuration, drug.DDose
    FROM prescription
    LEFT JOIN drug ON prescription.PrescriptionID = drug.PrescriptionID
    WHERE prescription.PrescriptionID = ?
  `;
    connection.query(sql_query, [PrescriptionID], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).json({ message: "This Prescription is not found" });
      } else {
        const prescriptionMap = {};

      result.forEach((row) => {
        const { PrescriptionID, DrugID, RecordID, DoctorName, Diagnosis, ExtraNotes, PatientID } = row;

        if (!prescriptionMap[PrescriptionID]) {
          prescriptionMap[PrescriptionID] = {
            PrescriptionID,RecordID,PatientID,DoctorName,Diagnosis,ExtraNotes,
            drug: []
          };
        }

        // Check if DrugID is not null and not already in the array
        if (DrugID !== null && !prescriptionMap[PrescriptionID].drug.some((drug) => drug.DrugID === DrugID)) {
          prescriptionMap[PrescriptionID].drug.push({ DrugID,DrugName: row.DName, DrugTime: row.DDuration, DrugDose: row.DDose });
        }

       
      });

      const prescriptionArray = Object.values(prescriptionMap);
      res.json(prescriptionArray);
            }
    });
  });