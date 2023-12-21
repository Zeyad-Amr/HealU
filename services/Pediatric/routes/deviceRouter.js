const express = require('express');
const router = express.Router();

const DeviceController = require("../controllers/deviceController");

//===================================================================================================
router.post("/device", DeviceController.createDevice);                // POST New device
router.get('/device', DeviceController.getDevice);                   // GET All devices
router.get("/device/:deviceID", DeviceController.getDeviceByDeviceID);    // GET device by deviceID
router.put("/device/:deviceID", DeviceController.updateDevice);    // Update device by deviceID
router.delete("/device/:deviceID", DeviceController.deleteDevice);    // Delete device by deviceID
//===================================================================================================

module.exports =  router;      // Export the 'router' object

