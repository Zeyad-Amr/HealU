const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");
const axios = require("axios");

const status = {
    Booked: 0,
    InProgress: 1,
    Completed: 2,
};

const weekDays = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
};

const createAppointment = async (req, res, next) => {
    try {
        const slotId = req.body.slotId;
        const patientId = req.body.patientId;
        const date = req.body.date;

        const weekDay = weekDays[new Date(date).getDay()];

        // Validate that slotId exists
        try {
            if (!(await Slot.findOne({ _id: slotId, weekDay: weekDay }))) {
                return res.status(400).json({
                    message:
                        "There is no slot found either in this Day or with this SlotID",
                });
            }
        } catch (error) {
            res.status(400).json({
                message: "There is no slot found with this SlotID",
            });
        }

        // Check for existing appointments for the same date and slot
        if (await Appointment.findOne({ slotId, date })) {
            return res.status(400).json({
                message: "Appointment already booked for that slot and date",
            });
        }

        // Validate patientId using registration service
        try {
            const patientValidationResponse = await axios.get(
                `https://registration-zf9n.onrender.com/patient/${patientId}`
            );
        } catch (error) {
            // Handle API request error
            return res.status(400).json({
                message: "Error validating patientId",
            });
        }

        const appointment = await Slot.findOne({ _id: slotId }).then((slot) => {
            const appointmentCreated = Appointment.create({
                slotId: slotId,
                patientId: patientId,
                doctorId: slot.doctorId,
                clinicId: slot.clinicId,
                date: date,
                time: slot.time,
                status: status.Booked,
            });

            return appointmentCreated;
        });

        console.log(appointment);
        res.status(200).json({ message: "Success", appointment });

        next();
    } catch (error) {
        res.status(500).json({ message: error.message }) && next(error);
    }
};

// ================================================================================= //

const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({});
        res.status(200).json(appointments);
        next();
    } catch (error) {
        res.status(500).json({ message: error.message }) && next(error);
    }
};

const getAppointmentByID = async (req, res, next) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await Appointment.findOne({
            _id: appointmentId,
        });
        res.status(200).json(appointment);
        next();
    } catch (error) {
        res.status(500).json({ message: error.message }) && next(error);
    }
};
// ================================================================================= //

const getAppointmentByPatientID = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const appointment = await Appointment.find({ patientId: patientId });
        res.status(200).json(appointment);
        next();
    } catch (error) {
        res.status(500).json({ message: error.message }) && next(error);
    }
};

// ================================================================================= //

const getAppointmentByDoctorID = async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        const appointment = await Appointment.find({ doctorId: doctorId });
        res.status(200).json(appointment);
        next();
    } catch (error) {
        res.status(500).json({ message: error.message }) && next(error);
    }
};

// ================================================================================= //

const getAppointmentByClinicID = async (req, res, next) => {
    try {
        const { clinicId } = req.params;
        const appointment = await Appointment.find({ clinicId: clinicId });
        res.status(200).json(appointment);
        next();
    } catch (error) {
        res.status(500).json({ message: error.message }) && next(error);
    }
};
// ================================================================================= //

const updateAppointment = async (req, res, next) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await Appointment.findOneAndUpdate(
            { _id: appointmentId },
            req.body
        );

        if (appointment)
            res.status(200).json({ message: "Success", appointment });
        else
            res.status(404).json({
                message: `No Appointment found for the given appointmentId`,
            });

        next();
    } catch (error) {
        res.status(500).json({ message: error.message }) && next(error);
    }
};
// ================================================================================= //

const cancelAppointment = async (req, res, next) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await Appointment.findOneAndDelete({
            _id: appointmentId,
        });

        if (appointment)
            res.status(200).json({
                message: `Canceled an appointment with Appointment ID: ${appointmentId}`,
            });
        else
            res.status(404).json({
                message: `No Appointment with Appointment ID: ${appointmentId}`,
            });

        next();
    } catch (error) {
        res.status(500).json({ message: error.message }) && next(error);
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentByID,
    getAppointmentByPatientID,
    getAppointmentByDoctorID,
    getAppointmentByClinicID,
    updateAppointment,
    cancelAppointment,
};
