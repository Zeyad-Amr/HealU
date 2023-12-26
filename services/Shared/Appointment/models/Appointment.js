const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    slotId: {
        type: String,
        required: [true, "Please enter slot id"],
        unique: true,
    },
    patientId: {
        type: Number,
        required: [true, "Please enter patient id"],
        unique: true,
    },
    doctorId: {
        type: Number,
        required: [true, "Please enter doctor id"],
        unique: true,
    },
    clinicId: {
        type: Number,
        required: [true, "Please enter clinic id"],
        unique: true,
    },
    status: {
        type: String,
        required: [true, "Please enter the appointment's status"],
        unique: true,
    },
    date: {
        type: Date,
        required: [true, "Please enter the appointment's date"],
        unique: true,
    },
    time: {
        type: String,
        required: [true, "Please enter the appointment's time"],
        unique: true,
    },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
