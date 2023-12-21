const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

//===================================================================================================
router.post('/prescription', prescriptionController.createPrescription);
router.get('/prescription', prescriptionController.getAllPrescriptions);
router.get('/prescription/:prescriptionID', prescriptionController.getPrescriptionByID);
//===================================================================================================

module.exports = router;
