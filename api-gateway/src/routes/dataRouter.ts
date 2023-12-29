import { Router } from "express";
import { get_patient_data, get_previous_appointments } from "../controllers/dataController";

const router = Router();

// get patient personal and medical information
router.get('/data/patient/:patientId', get_patient_data)

// get patient previous appointments
router.get('/data/previous-appointments/:patientId', get_previous_appointments)

export default router;