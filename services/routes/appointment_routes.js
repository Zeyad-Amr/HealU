const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Add a new appointment
router.post("/appointments", async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================================================================================= //
// Get all appointments
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================================================================================= //
// Get an appointment by patient id
router.get("/appointments/patient/:patient_id", async (req, res) => {
  try {
    const { patient_id } = req.params;
    const appointment = await Appointment.find({ patient_id: patient_id });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================================================================================= //
// Get an appointment by doctor id
router.get("/appointments/doctor/:doctor_id", async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const appointment = await Appointment.find({ doctor_id: doctor_id });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================================================================================= //
// Get an appointment by clinic id
router.get("/appointments/clinic/:clinic_id", async (req, res) => {
  try {
    const { clinic_id } = req.params;
    const appointment = await Appointment.find({ clinic_id: clinic_id });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================================================================================= //
// Update an appointment by patient id and slot id
router.put(
  "/appointments/patient/:patient_id/slot/:slot_id",
  async (req, res) => {
    try {
      const { patient_id, slot_id } = req.params;
      const appointment = await Appointment.findOneAndUpdate(
        { slot_id: slot_id, patient_id: patient_id },
        req.body
      );
      if (!appointment) {
        return res
          .status(404)
          .json({ message: `cannot find an appointment with ID: ${slot_id}` });
      }
      const updatedAppointment = await Appointment.find({
        slot_id: slot_id,
        patient_id: patient_id,
      });
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ================================================================================= //
// Delete appointment by patient id and slot id
router.delete(
  "/appointments/patient/:patient_id/slot/:slot_id",
  async (req, res) => {
    try {
      const { patient_id, slot_id } = req.params;
      const appointment = await Appointment.findOneAndDelete(
        { slot_id: slot_id, patient_id: patient_id },
        req.body
      );
      if (!appointment) {
        return res.status(404).json({
          message: `cannot find an appointemnt with Slot ID: ${slot_id}`,
        });
      }
      res
        .status(200)
        .json({ message: `Deleted an appointment with Slot ID: ${slot_id}` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
