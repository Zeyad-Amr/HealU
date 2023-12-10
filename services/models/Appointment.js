const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    slot_id: {
      type: String,
    },
    patient_id: {
      type: String,
    },
    doctor_id: {
      type: String,
    },
    clinic_id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
