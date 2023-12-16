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

//............................................................................................................................................................

// .....................................................Create operation (POST).................................................
app.post("/record", (req, res) => {
  const {                         // Required Data from user to create new record
    RecordID, 
    PatientID,
    ServicesID,
    RecommendedActionID,
    VitalID,
    VaccinesID,
    EyeMeasurementID,
    NutritionID,
    RDate,
    Clinic,
    Weight,
    Length,
    ServicesDescription,
    RecommendedActionDescription,
    BloodPressure,
    RespirationRate,
    HeartRate,
    DiabeticTest,
    SPO2,
    VName,
    VType,
    VDate,
    LeftEye,
    RightEye,
    DietPlan,
    Inbody,
  } = req.body;

  
  // ..................Check for existing RecordID in the Record table
  const checkRecordQuery = `SELECT * FROM Record WHERE RecordID = ?`;

  connection.query(checkRecordQuery, [RecordID], (checkRecordErr, RecordResult) => {
    if (checkRecordErr) {
      console.error("Error checking for existing RecordID:", checkRecordErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // If RecordID already exists, handle the error
    if (RecordResult.length > 0) {
      console.log("RecordID already exists in the Record table");
      res.status(400).json({ error: "Duplicate RecordID" });
      return;
    }

    // .......................Check for existing ServicesID in the Services table
    const checkServicesQuery = `SELECT * FROM Services WHERE ServicesID = ?`;

    connection.query(checkServicesQuery,[ServicesID],(checkServicesErr, ServicesResult) => {
      if (checkServicesErr) {
        console.error(
          "Error checking for existing ServicesID:",
          checkServicesErr
        );
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // If ServicesID already exists, handle the error
      if (ServicesResult.length > 0) {
        console.log("ServicesID already exists in the Services table");
        res.status(400).json({ error: "Duplicate ServicesID" });
        return;
      }
        
      // ......................Check for existing RecommendedActionID in the RecommendedAction table
      const checkRecommendedActionQuery = `SELECT * FROM RecommendedAction WHERE RecommendedActionID = ?`;
    
      connection.query(checkRecommendedActionQuery, [RecommendedActionID], (checkRecommendedActionErr, RecommendedActionResult) => {
        if (checkRecommendedActionErr) {
          console.error("Error checking for existing RecommendedActionID:", checkRecommendedActionErr);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
    
        // If RecommendedActionID already exists, handle the error
        if (RecommendedActionResult.length > 0) {
          console.log("RecommendedActionID already exists in the RecommendedAction table");
          res.status(400).json({ error: "Duplicate RecommendedActionID" });
          return;
        }

        // ....................Check for existing VitalID in the Vital table
        const checkVitalQuery = `SELECT * FROM Vital WHERE VitalID = ?`;
    
        connection.query(checkVitalQuery, [VitalID], (checkVitalErr, VitalResult) => {
          if (checkVitalErr) {
            console.error("Error checking for existing VitalID:", checkVitalErr);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
      
          // If VitalID already exists, handle the error
          if (VitalResult.length > 0) {
            console.log("VitalID already exists in the Vital table");
            res.status(400).json({ error: "Duplicate VitalID" });
            return;
          }

          // .........................Check for existing VaccinesID in the Vaccines table
          const checkVaccinesQuery = `SELECT * FROM Vaccines WHERE VaccinesID = ?`;
      
          connection.query(checkVaccinesQuery, [VaccinesID], (checkVaccinesErr, VaccinesResult) => {
            if (checkVaccinesErr) {
              console.error("Error checking for existing VaccinesID:", checkVaccinesErr);
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }
        
            // If VaccinesID already exists, handle the error
            if (VaccinesResult.length > 0) {
              console.log("VaccinesID already exists in the Vaccines table");
              res.status(400).json({ error: "Duplicate VaccinesID" });
              return;
            }

            // .......................Check for existing EyeMeasurementID in the EyeMeasurement table
            const checkEyeMeasurementQuery = `SELECT * FROM EyeMeasurement WHERE EyeMeasurementID = ?`;
        
            connection.query(checkEyeMeasurementQuery, [EyeMeasurementID], (checkEyeMeasurementErr, EyeMeasurementResult) => {
              if (checkEyeMeasurementErr) {
                console.error("Error checking for existing EyeMeasurementID:", checkEyeMeasurementErr);
                res.status(500).json({ error: "Internal Server Error" });
                return;
              }
          
              // If EyeMeasurementID already exists, handle the error
              if (EyeMeasurementResult.length > 0) {
                console.log("EyeMeasurementID already exists in the EyeMeasurement table");
                res.status(400).json({ error: "Duplicate EyeMeasurementID" });
                return;
              }

              // ..................Check for existing NutritionID in the Nutrition table
              const checkNutritionQuery = `SELECT * FROM Nutrition WHERE NutritionID = ?`;
            
              connection.query(checkNutritionQuery, [NutritionID], (checkNutritionErr, NutritionResult) => {
                if (checkNutritionErr) {
                  console.error("Error checking for existing NutritionID:", checkNutritionErr);
                  res.status(500).json({ error: "Internal Server Error" });
                  return;
                }
            
                // If NutritionID already exists, handle the error
                if (NutritionResult.length > 0) {
                  console.log("NutritionID already exists in the Nutrition table");
                  res.status(400).json({ error: "Duplicate NutritionID" });
                  return;
                }
      
// If RecordID, ServicesID, RecommendedActionID, VitalID, VaccinesID, EyeMeasurementID and NutritionID are not duplicates, proceed with the insertion
              
              // ....................Insert into Record table
              const sql_query_Record = `INSERT INTO Record (RecordID, PatientID, RDate, Clinic, Weight, Length) VALUES (?, ?, ?, ?, ?, ?)`;
              connection.query(sql_query_Record, [RecordID, PatientID, RDate, Clinic, Weight, Length], (RecordErr, RecordResult) => {
                if (RecordErr) {
                  console.error("Error creating Record:", RecordErr);
                  res.status(500).json({ error: "Internal Server Error" });
                  return;
                }
                console.log("Record created");

              // ................Insert into Services table
                const sql_query_Services = `INSERT INTO Services (ServicesID,RecordID,ServicesDescription) VALUES (?, ?, ?)`;
                connection.query(sql_query_Services, [ServicesID, RecordID,ServicesDescription], (ServicesErr, ServicesResult) => {
                  if (ServicesErr) {
                    console.error("Error creating Services:", ServicesErr);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }
                  console.log("New Services created");

                  // ................Insert into RecommendedAction table
                const sql_query_RecommendedAction = `INSERT INTO RecommendedAction (RecommendedActionID,RecordID,RecommendedActionDescription) VALUES (?, ?, ?)`;
                connection.query(sql_query_RecommendedAction, [RecommendedActionID, RecordID,RecommendedActionDescription], (RecommendedActionErr, RecommendedActionResult) => {
                  if (RecommendedActionErr) {
                    console.error("Error creating RecommendedAction:", RecommendedActionErr);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }
                  console.log("New RecommendedAction created");

                // ................Insert into Vital table
                const sql_query_Vital = `INSERT INTO Vital (VitalID, RecordID, BloodPressure, RespirationRate, HeartRate, DiabeticTest, SPO2) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                connection.query(sql_query_Vital, [VitalID, RecordID, BloodPressure, RespirationRate, HeartRate, DiabeticTest, SPO2], (VitalErr, VitalResult) => {
                  if (VitalErr) {
                    console.error("Error creating Vital:", VitalErr);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }
                  console.log("New Vital created");

                // ................Insert into Vaccines table
                const sql_query_Vaccines = `INSERT INTO Vaccines (VaccinesID,RecordID, VName, VType,VDate ) VALUES (?, ?, ?, ?, ?)`;
                connection.query(sql_query_Vaccines, [VaccinesID, RecordID, VName, VType,VDate ], (VaccinesErr, VaccinesResult) => {
                    if (VaccinesErr) {
                      console.error("Error creating Vaccines:", VaccinesErr);
                      res.status(500).json({ error: "Internal Server Error" });
                      return;
                    }
                    console.log("New Vaccines created");

                // ................Insert into EyeMeasurement table
                const sql_query_EyeMeasurement = `INSERT INTO EyeMeasurement (EyeMeasurementID, RecordID, LeftEye, RightEye) VALUES (?, ?, ?, ?)`;
                connection.query(sql_query_EyeMeasurement, [EyeMeasurementID, RecordID, LeftEye, RightEye], (EyeMeasurementErr, EyeMeasurementResult) => {
                  if (EyeMeasurementErr) {
                    console.error("Error creating EyeMeasurement:", EyeMeasurementErr);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }
                  console.log("New EyeMeasurement created");

                // ................Insert into Nutrition table
                const sql_query_Nutrition = `INSERT INTO Nutrition (NutritionID, RecordID, DietPlan, Inbody) VALUES (?, ?, ?, ?)`;
                connection.query(sql_query_Nutrition, [NutritionID, RecordID, DietPlan, Inbody], (NutritionErr, NutritionResult) => {
                  if (NutritionErr) {
                    console.error("Error creating Nutrition:", NutritionErr);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }
                  console.log("New Nutrition created");
        

                    // Respond with success message
                    res
                      .status(201)
                      .json({ message: "Record created successfully" });
                  });
              });
          });
        });
       });
      });
      });
      });
      });
    });
    });
});
});
});

});
//............................................................................................................................................................

// ...........................................Read operation (GET All).......................................
app.get("/record", (req, res) => {
  
  const sql_query = `
    SELECT  Record.RecordID, Record.PatientID, Record.RDate, Record.Clinic, Record.Weight, Record.Length,
      Services.ServicesID, Services.ServicesDescription,
      RecommendedAction.RecommendedActionID, RecommendedAction.RecommendedActionDescription,
      Vital.VitalID, Vital.BloodPressure, Vital.RespirationRate, Vital.HeartRate, Vital.DiabeticTest, Vital.SPO2,
      Vaccines.VaccinesID, Vaccines.VName,  Vaccines.VType,  Vaccines.VDate,
      EyeMeasurement.EyeMeasurementID, EyeMeasurement.LeftEye, EyeMeasurement.RightEye,
      Nutrition.NutritionID, Nutrition.DietPlan, Nutrition.Inbody  
      
    FROM Record
    LEFT JOIN Services ON Record.RecordID = Services.RecordID
    LEFT JOIN RecommendedAction ON Record.RecordID = RecommendedAction.RecordID
    LEFT JOIN Vital ON Record.RecordID = Vital.RecordID
    LEFT JOIN Vaccines ON Record.RecordID = Vaccines.RecordID
    LEFT JOIN EyeMeasurement ON Record.RecordID = EyeMeasurement.RecordID
    LEFT JOIN Nutrition ON Record.RecordID = Nutrition.RecordID
    WHERE Record.RecordID IS NOT NULL`;

  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: "This Record is not found " });
    } else {
      const RecordMap = {};

      result.forEach((row) => {
        const { RecordID, ServicesID, RecommendedActionID, VitalID, VaccinesID, EyeMeasurementID, NutritionID } = row;

        if (!RecordMap[RecordID]) {
          RecordMap[RecordID] = {
            RecordID,
            PatientID : row.PatientID,
            RecordDate: row.RDate,
            Clinic: row.Clinic,
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

        // Check if ServicesID is not null and not already in the array
        if (ServicesID !== null && !RecordMap[RecordID].Services.some((Services) => Services.ServicesID === ServicesID)) {
          RecordMap[RecordID].Services.push({ ServicesID, ServicesDescription: row.ServicesDescription });
        }

        // Check if RecommendedActionID is not null and not already in the array
        if (RecommendedActionID !== null && !RecordMap[RecordID].RecommendedAction.some((medicalRecommendedAction) => medicalRecommendedAction.RecommendedActionID === RecommendedActionID)) {
          RecordMap[RecordID].RecommendedAction.push({ RecommendedActionID, RecommendedActionDescription: row.RecommendedActionDescription});
        }

        // Check if VitalID is not null and not already in the array
        if (VitalID !== null && !RecordMap[RecordID].Vital.some((Vital) => Vital.VitalID === VitalID)) {
          RecordMap[RecordID].Vital.push({ VitalID, BloodPressure: row.BloodPressure, RespirationRate: row.RespirationRate, HeartRate: row.HeartRate, DiabeticTest: row.DiabeticTest, SPO2: row.SPO2 });
        }
        // Check if VaccinesID is not null and not already in the array
        if (VaccinesID !== null && !RecordMap[RecordID].Vaccines.some((Vaccines) => Vaccines.VaccinesID === VaccinesID)) {
          RecordMap[RecordID].Vaccines.push({ VaccinesID, VaccinesName: row.VName, VaccinesType: row.VType, VaccinesDate: row.VDate });
        }
        // Check if EyeMeasurementID is not null and not already in the array
        if (EyeMeasurementID !== null && !RecordMap[RecordID].EyeMeasurement.some((EyeMeasurement) => EyeMeasurement.EyeMeasurementID === EyeMeasurementID)) {
          RecordMap[RecordID].EyeMeasurement.push({ EyeMeasurementID, LeftEye: row.LeftEye, RightEye: row.RightEye  });
        }
        // Check if NutritionID is not null and not already in the array
        if (NutritionID !== null && !RecordMap[RecordID].Nutrition.some((Nutrition) => Nutrition.NutritionID === NutritionID)) {
          RecordMap[RecordID].Nutrition.push({ NutritionID, DietPlan: row.DietPlan, Inbody: row.Inbody  });
        }
      });

      const RecordArray = Object.values(RecordMap);
      res.json(RecordArray);
    }
  });
});

//............................................................................................................................................................

// ............................................Read operation (GET BY ID).....................................................
app.get("/record/:recordID", (req, res) => {
  const RecordID = req.params.recordID;
  const sql_query = `
  SELECT  Record.RecordID, Record.PatientID, Record.RDate, Record.Clinic, Record.Weight, Record.Length,
    Services.ServicesID, Services.ServicesDescription,
    RecommendedAction.RecommendedActionID, RecommendedAction.RecommendedActionDescription,
    Vital.VitalID, Vital.BloodPressure, Vital.RespirationRate, Vital.HeartRate, Vital.DiabeticTest, Vital.SPO2,
    Vaccines.VaccinesID, Vaccines.VName,  Vaccines.VType,  Vaccines.VDate,
    EyeMeasurement.EyeMeasurementID, EyeMeasurement.LeftEye, EyeMeasurement.RightEye,
    Nutrition.NutritionID, Nutrition.DietPlan, Nutrition.Inbody  
    
  FROM Record
  LEFT JOIN Services ON Record.RecordID = Services.RecordID
  LEFT JOIN RecommendedAction ON Record.RecordID = RecommendedAction.RecordID
  LEFT JOIN Vital ON Record.RecordID = Vital.RecordID
  LEFT JOIN Vaccines ON Record.RecordID = Vaccines.RecordID
  LEFT JOIN EyeMeasurement ON Record.RecordID = EyeMeasurement.RecordID
  LEFT JOIN Nutrition ON Record.RecordID = Nutrition.RecordID
  WHERE Record.RecordID = ?
`;
  connection.query(sql_query, [RecordID], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: "This Record is not found " });
    } else {
      const RecordMap = {};

      result.forEach((row) => {
        const { RecordID, ServicesID, RecommendedActionID, VitalID, VaccinesID, EyeMeasurementID, NutritionID } = row;

        if (!RecordMap[RecordID]) {
          RecordMap[RecordID] = {
            RecordID,
            PatientID : row.PatientID,
            RecordDate: row.RDate,
            Clinic: row.Clinic,
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

        // Check if ServicesID is not null and not already in the array
        if (ServicesID !== null && !RecordMap[RecordID].Services.some((Services) => Services.ServicesID === ServicesID)) {
          RecordMap[RecordID].Services.push({ ServicesID, ServicesDescription: row.ServicesDescription });
        }

        // Check if RecommendedActionID is not null and not already in the array
        if (RecommendedActionID !== null && !RecordMap[RecordID].RecommendedAction.some((medicalRecommendedAction) => medicalRecommendedAction.RecommendedActionID === RecommendedActionID)) {
          RecordMap[RecordID].RecommendedAction.push({ RecommendedActionID, RecommendedActionDescription: row.RecommendedActionDescription});
        }

        // Check if VitalID is not null and not already in the array
        if (VitalID !== null && !RecordMap[RecordID].Vital.some((Vital) => Vital.VitalID === VitalID)) {
          RecordMap[RecordID].Vital.push({ VitalID, BloodPressure: row.BloodPressure, RespirationRate: row.RespirationRate, HeartRate: row.HeartRate, DiabeticTest: row.DiabeticTest, SPO2: row.SPO2 });
        }
        // Check if VaccinesID is not null and not already in the array
        if (VaccinesID !== null && !RecordMap[RecordID].Vaccines.some((Vaccines) => Vaccines.VaccinesID === VaccinesID)) {
          RecordMap[RecordID].Vaccines.push({ VaccinesID, VaccinesName: row.VName, VaccinesType: row.VType, VaccinesDate: row.VDate });
        }
        // Check if EyeMeasurementID is not null and not already in the array
        if (EyeMeasurementID !== null && !RecordMap[RecordID].EyeMeasurement.some((EyeMeasurement) => EyeMeasurement.EyeMeasurementID === EyeMeasurementID)) {
          RecordMap[RecordID].EyeMeasurement.push({ EyeMeasurementID, LeftEye: row.LeftEye, RightEye: row.RightEye  });
        }
        // Check if NutritionID is not null and not already in the array
        if (NutritionID !== null && !RecordMap[RecordID].Nutrition.some((Nutrition) => Nutrition.NutritionID === NutritionID)) {
          RecordMap[RecordID].Nutrition.push({ NutritionID, DietPlan: row.DietPlan, Inbody: row.Inbody  });
        }
      });

      const RecordArray = Object.values(RecordMap);
      res.json(RecordArray);
    }
  });
});