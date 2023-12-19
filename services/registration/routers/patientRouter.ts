import express from 'express';
import * as patientController from '../controllers/patientController';

const router = express.Router();

router.post('/signup', patientController.createPatient);
router.put('/:userID', patientController.updatePatient);
router.get('/:userID', patientController.getPatientById);
router.delete('/:userID', patientController.deletePatient);

export default router;