const connection = require('../Database/connection');  
//==============================================================================================================
function createDevice(req, res) {
    const {
       Devices
      } = req.body;
    
    const sql_query = `INSERT INTO devices (DName, DType, DManufacturer, PurchaseDate, ExpiryDate, DStatus) VALUES (?, ?, ?, ?, ?, ?)`;
    Promise.all(Devices.map((Devices) => { return new Promise((resolve, reject) => {
      connection.query(sql_query, [Devices.DeviceName, Devices.DeviceType, Devices.DeviceManufacturer, Devices.PurchaseDate, Devices.ExpiryDate, Devices.DeviceStatus], (DevicesErr, result) => {
        if (DevicesErr) {
          console.error("Error adding device:", DevicesErr);
          res.status(500).json({ error: "Internal Server Error" });
          reject(DevicesErr);
        } else {
        const insertedDeviceID = result.insertId; 
        console.log("New Device is added with DeviceID:",insertedDeviceID);
        res.status(201).json({ message: "New Device is added successfully with DeviceID:"+ insertedDeviceID });   // Respond with success message
        resolve(result);
        }
      });
      });
    })
    )
}
//====================================================================================================================
function getDevice(req, res) {
  const sql_query = getting("","");
  connection.query(sql_query, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: "No devices were found in the list." });
    } 
    else {
      const process_results = processquery(result);
      res.status(200).json(process_results);
    }
  });
}
//====================================================================================================================
function getDeviceByDeviceID(req, res){
    const deviceID = req.params.deviceID;
    sql_query = getting("",`AND devices.DeviceID = ${deviceID}`);
    connection.query(sql_query, (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).json({ message: "No device with DeviceID:"+ deviceID +' was found.'});
      } 
      else {
        const process_results = processquery(result);
        res.status(200).json(process_results);
      }
    });
}
//====================================================================================================================
function getting(joinConditions, whereConditions){
    const sql_query = `SELECT devices.DeviceID, devices.DName, devices.DType, devices.DManufacturer, devices.PurchaseDate, devices.ExpiryDate, devices.DStatus
    FROM devices
    ${joinConditions}
    WHERE devices.DeviceID IS NOT NULL ${whereConditions}` ;

    return sql_query;

}
//==================================================================================================================
function processquery(result){
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

  return Object.values(DeviceMap);
}
//===================================================================================================================
function updateDevice(req, res){
    const DeviceID = req.params.deviceID;
    const {DeviceStatus }= req.body;          //Device Status can be updated
    const sql_query = `UPDATE devices SET DStatus = ? WHERE DeviceID = ? `;
    connection.query(sql_query, [DeviceStatus, DeviceID], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "No device with DeviceID:"+ DeviceID +' was found.' });
      } else {
        console.log("Device with DeviceID: " + DeviceID + " is updated");
        res.json({ message: "Device with DeviceID: " + DeviceID + " is updated successfully" });
      }
    });
}
//====================================================================================================================
function deleteDevice(req, res){
    const DeviceID = req.params.deviceID;
    const sql_query = `DELETE FROM devices  WHERE DeviceID = ?`;
    connection.query(sql_query, [DeviceID], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Device with DeviceID: " + DeviceID + " not found" });
      } else {
        console.log("Device with DeviceID: " + DeviceID + " is deleted");
        res.json({ message: "Device with DeviceID: " + DeviceID + " is deleted successfully" });
  }
  });
}
//====================================================================================================================
module.exports = {
    createDevice,
    getDevice,
    getDeviceByDeviceID,
    updateDevice,
    deleteDevice
  };