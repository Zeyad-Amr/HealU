const express = require('express');
const router = express.Router();

const RecordController = require("../controllers/recordController");

//===================================================================================================
router.post("/record", RecordController.createRecord);                // POST New Record
router.get('/record', RecordController.getRecord);                   // GET All Records
router.get("/record/:recordId", RecordController.getRecordByRecordID);    // GET Record by RecordID
router.get("/record/:patient/:patientId", RecordController.getRecordByPatientID);    // GET Record by PatientID
router.put("/record/:medical-tests/:medicaltestId", RecordController.updateMedicalTestByID);   // Update medicaltests
//===================================================================================================

module.exports =  router;      // Export the 'router' object

