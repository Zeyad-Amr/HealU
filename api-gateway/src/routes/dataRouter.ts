import { Router } from "express";
import { book_appt, create_slot, get_all_slots, get_appointment_data, get_doctor_slots, get_previous_appointments, get_upcoming_appointments, post_examination } from "../controllers/dataController";

const router = Router();

// get appointment data including patient personal and medical information and doctor data
router.get('/data/appointment/:appointmentId', get_appointment_data)

// get patient previous appointments
router.get('/data/previous-appointments/:patientId', get_previous_appointments)

// get patient previous appointments
router.get('/data/upcoming-appointments/:patientId', get_upcoming_appointments)

// get patient previous appointments
router.get('/data/slots', get_all_slots)


// get doctor's slots in given date
router.get('/data/slots/:date', get_doctor_slots)

// create slot for logged in user
router.post('/data/slots', create_slot)


// add examination for patient 
router.post('/data/examination', post_examination)

// book appointment
router.post('/data/book-appointment', book_appt)


export default router;