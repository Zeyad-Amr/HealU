import { Router } from "express";
import { get_patient_data } from "../controllers/clinicController";

const router = Router();

// get patient personal and medical information
router.get('/clinic/:patientId', get_patient_data)

export default router;