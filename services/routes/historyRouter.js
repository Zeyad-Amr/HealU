const express = require('express');
const router = express.Router();

const HistoryController = require("../controllers/historyController");

//===================================================================================================
router.post("/medical-history", HistoryController.createMedicalHistory);                // POST New medicalHistory
router.get('/medical-history', HistoryController.getMedicalhistory);                   // GET All medicalHistory
router.get("/medical-history/:patientID", HistoryController.getMedicalhistoryByPatientID);    // GET medicalHistory by patientID
//===================================================================================================

module.exports =  router;      // Export the 'router' object