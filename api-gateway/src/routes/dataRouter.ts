import { Router } from "express";
import { get_all_slots, get_appointment_data, get_previous_appointments } from "../controllers/dataController";

const router = Router();

// get appointment data including patient personal and medical information and doctor data
router.get('/data/appointment/:appointmentId', get_appointment_data)

// get patient previous appointments
router.get('/data/previous-appointments/:patientId', get_previous_appointments)

// get patient previous appointments
router.get('/data/slots', get_all_slots)

export default router;