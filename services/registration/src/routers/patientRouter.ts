import express from 'express';
import * as patientController from '../controllers/patientController';

const router = express.Router();

router.post('/', patientController.createPatient);
router.put('/:userId', patientController.updatePatient);
router.get('/:userId', patientController.getPatientById);
router.delete('/:userId', patientController.deletePatient);

export default router;