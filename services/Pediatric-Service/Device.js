import mysql2 from "mysql2"
import express from "express"

const connection = mysql2.createConnection({
    host: "localhost",
    database: "Devices",
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
app.post("/device", (req, res) => {
  const {
    DeviceID,
    DName,
    DType,
    DManufacturer,
    PurchaseDate,	
    ExpiryDate,
    DStatus
  } = req.body;

  //.............. Check if DeviceID exists in Device table
  const checkDeviceQuery = `SELECT * FROM Device WHERE DeviceID = ?`;

  connection.query(checkDeviceQuery, [DeviceID], (checkDeviceErr, DeviceResult) => {
    if (checkDeviceErr) {
      console.error("Error checking for existing DeviceID:", checkDeviceErr);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // If DeviceID doesn't exist, handle the error
    if (DeviceResult.length === 0) {
      console.log("DeviceID does not exist in the Device table");
      res.status(400).json({ error: "DeviceID does not exist in Device Table" });
      return;
    }

// If DeviceID is not duplicates, proceed with the insertion
    const sql_query = `INSERT INTO Device (DeviceID, DName, DType, DManufacturer, PurchaseDate,	ExpiryDate, DStatus) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql_query, [DeviceID,DName, DType, DManufacturer, PurchaseDate, ExpiryDate, DStatus], (DeviceErr, result) => {
      if (DeviceErr) {
        console.error("Error adding device:", DeviceErr);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      console.log("New Device is added");

      // Respond with success message
      res
      .status(201)
      .json({ message: "New Device is added successfully" });
    });
  });
});

// ...........................................Read operation (GET All).....................................................
app.get("/device", (req, res) => {
  const sql_query = `
    SELECT Device.DeviceID, Device.DName, Device.DType, Device.DManufacturer, Device.PurchaseDate, Device.ExpiryDate, Device.DStatus
    FROM Device
    WHERE Device.DeviceID IS NOT NULL
  `;

  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: "This Device is not found" });
    } else {
      const DeviceMap = {};

      result.forEach((row) => {
        const { DeviceID, } = row;

        if (!DeviceMap[DeviceID]) {
          DeviceMap[DeviceID] = {
            DeviceID,
            Device: []
          };
        }

        // Check if DeviceID is not null and not already in the array
        if (DeviceID !== null && !DeviceMap[DeviceID].Device.some((Device) => Device.DeviceID === DeviceID)) {
          DeviceMap[DeviceID].Device.push({DeviceName: row.DName, DeviceType: row.DType, DeviceManufacturer: row.DManufacturer, PurchaseDate: row.PurchaseDate, ExpiryDate: row.ExpiryDate, DeviceStatus: row.DStatus });
        }

       
      });

      const DeviceArray = Object.values(DeviceMap);
      res.json(DeviceArray);
    }
  });
});


// ...........................................Read operation (GET BY ID).....................................................
app.get("/device/:deviceID", (req, res) => {
  const DeviceID = req.params.deviceID;
  const sql_query = `SELECT Device.DeviceID, Device.DName, Device.DType, Device.DManufacturer, Device.PurchaseDate, Device.ExpiryDate, Device.DStatus
    FROM Device
    WHERE Device.DeviceID = ?`;

  connection.query(sql_query,[DeviceID], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: "This Device is not found" });
    } else {
      const DeviceMap = {};

      result.forEach((row) => {
        const { DeviceID, } = row;

        if (!DeviceMap[DeviceID]) {
          DeviceMap[DeviceID] = {
            DeviceID,
            Device: []
          };
        }

        // Check if DeviceID is not null and not already in the array
        if (DeviceID !== null && !DeviceMap[DeviceID].Device.some((Device) => Device.DeviceID === DeviceID)) {
          DeviceMap[DeviceID].Device.push({ DeviceName: row.DName, DeviceType: row.DType, DeviceManufacturer: row.DManufacturer, PurchaseDate: row.PurchaseDate, ExpiryDate: row.ExpiryDate, DeviceStatus: row.DStatus });
        }

       
      });

      const DeviceArray = Object.values(DeviceMap);
      res.json(DeviceArray);
    }
  });
});

  // .............................................Update operation (PUT).....................................................
  app.put("/device/:deviceID", (req, res) => {
    const DeviceID = req.params.deviceID;
    const {DName, DType, DManufacturer, PurchaseDate,	ExpiryDate, DStatus} = req.body;
    const sql_query = `UPDATE Device  SET DName = ?, DType = ?,  DManufacturer = ?, PurchaseDate = ?, ExpiryDate = ?, DStatus = ? WHERE DeviceID = ? `;
    connection.query(sql_query, [DName, DType, DManufacturer, PurchaseDate,	ExpiryDate, DStatus, DeviceID], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Device  not found" });
      } else {
        console.log("Device  updated");
        res.json({ message: "Device  updated successfully" });
      }
    });
  });
  
  // .....................................................Delete operation (DELETE).........................................
  app.delete("/device/:deviceID", (req, res) => {
    const DeviceID = req.params.deviceID;
    const sql_query = `DELETE FROM Device  WHERE DeviceID = ?`;
    connection.query(sql_query, [DeviceID], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Device  not found" });
      } else {
        console.log("Device  deleted");
        res.json({ message: "Device  deleted successfully" });
  }
  });
  });