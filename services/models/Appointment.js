const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    appointmentId: {
      type: Number,
      required: [true, "Please enter appointment id"],
    },
    patientId: {
      type: Number,
      required: [true, "Please enter patient id"],
    },
    doctorId: {
      type: Number,
      required: [true, "Please enter doctor id"],
    },
    clinicId: {
      type: Number,
      required: [true, "Please enter clinic id"],
    },
    status: {
      type: String,
      required: [true, "Please enter the appointment's status"],
    },
    date: {
      type: Date,
      required: [true, "Please enter the appointment's date"],
    },
    time: {
      type: String,
      required: [true, "Please enter the appointment's time"],
    },
  },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
