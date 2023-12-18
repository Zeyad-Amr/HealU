const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointmentsController");

router.post("/", AppointmentController.createAppointment);

router.get("/", AppointmentController.getAllAppointments);

router.get(
  "/patient/:patientId",
  AppointmentController.getAppointmentByPatientID
);

router.get("/doctor/:doctorId", AppointmentController.getAppointmentByDoctorID);

router.get("/clinic/:clinicId", AppointmentController.getAppointmentByClinicID);

router.put("/:patientId/:slotId", AppointmentController.updateAppointment);

router.delete("/:patientId/:slotId", AppointmentController.deleteAppointment);

module.exports = router;
