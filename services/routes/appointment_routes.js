const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointmentsController");

router.post("/", AppointmentController.createAppointment);

router.get("/", AppointmentController.getAllAppointments);

router.get(
  "/patient/:patientID",
  AppointmentController.getAppointmentByPatientID
);

router.get("/doctor/:doctorID", AppointmentController.getAppointmentByDoctorID);

router.get("/clinic/:clinicID", AppointmentController.getAppointmentByClinicID);

router.put("/:patientID/:slotID", AppointmentController.updateAppointment);

router.delete("/:patientID/:slotID", AppointmentController.deleteAppointment);

module.exports = router;
