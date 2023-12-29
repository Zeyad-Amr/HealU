const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");

const createAppointment = async (req, res, next) => {
    try {
        const slotId = req.body.slotId;
        const patientId = req.body.patientId;
        const date = req.body.date;

        //Check for existing appointments for the same date and slot
        const existingAppointment = await Appointment.findOne({ slotId, date });
        if (existingAppointment) {
            return res.status(400).json({
                message: "Appointment already booked for that slot and date",
            });
        }

        // Validate that slotId exists
        try {
            const slot = await Slot.findOne({ _id: slotId });
        } catch (error) {
            res
                .status(500)
                .json({ message: "There is no slot found with this slotId" }) &&
                next(error);
        }

        const appointment = await Slot.findOne({ _id: slotId }).then((slot) => {
            console.log(slot);

            const appointmentCreated = Appointment.create({
                slotId: slotId,
                patientId: patientId,
                doctorId: slot.doctorId,
                clinicId: slot.clinicId,
                date: date,
                time: slot.time,
                status: "Booked",
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
            { appointmentId: appointmentId },
            req.body
        );

        if (appointment) res.status(200).json({ message: "Success" });
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
