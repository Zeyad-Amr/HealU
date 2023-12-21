const express = require('express');
const router = express.Router();

const RecordController = require("../controllers/recordController");

//===================================================================================================
router.post("/record", RecordController.createRecord);                // POST New Record
router.get('/record', RecordController.getRecord);                   // GET All Records
router.get("/record/:recordID", RecordController.getRecordByRecordID);    // GET Record by RecordID
router.get("/record/:patient/:patientID", RecordController.getRecordByPatientID);    // GET Record by PatientID
//===================================================================================================

module.exports =  router;      // Export the 'router' object

