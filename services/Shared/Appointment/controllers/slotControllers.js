const Slot = require("../models/Slot");
const Appointment = require("../models/Appointment");
const axios = require("axios");

// Map weekdays to numeric representation
const weekdaysMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
};

const createSlot = async (req, res, next) => {
    try {
        const { doctorId, time, weekDay } = req.body;

        // Assign clinicId to a separate variable
        let clinicId = 0;

        // Validate patientId using registration service
        try {
            const doctorValidationResponse = await axios.get(
                `https://registration-zf9n.onrender.com/staff/${doctorId}`
            );

            if (doctorValidationResponse.data.data.role == "Doctor")
                clinicId = doctorValidationResponse.data.data.clinicId;
            else
                return res.status(400).json({
                    message: "The entered ID is not for a doctor",
                });
        } catch (error) {
            // Handle API request error
            return res.status(400).json({
                message: "Error validating doctorId",
            });
        }

        // Validate the time format using a regular expression
        const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
        if (!timeRegex.test(time)) {
            return res.status(400).json({
                message: "Invalid time format. Use the format HH:mm.",
            });
        }

        // Check for existing slots with the same doctor, date, and different clinic
        const existingSlot = await Slot.findOne({
            doctorId,
            time,
            weekDay,
        });
        if (existingSlot) {
            return res.status(400).json({
                message: "Doctor already isn't available at that time and date",
            });
        }

        // Create the slot only if no conflicts are found
        const newSlot = await Slot.create({
            doctorId,
            clinicId,
            time,
            weekDay,
        });

        res.status(201).json({ message: "Success", newSlot });
        next();
    } catch (error) {
        res.status(500).json({ message: error.message }) && next(error);
    }
};
// ================================================================================= //

const getAllSlots = async (req, res, next) => {
    try {
        const slots = await Slot.find({});
        res.status(200).json(slots);
        next();
    } catch (error) {
        res.status(500).json({ message: "No slots found" }) && next(error);
    }
};

// ================================================================================= //

const getSlotsByDoctorID = async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        const { unscheduled } = req.query;

        let slots = await Slot.find({ doctorId: doctorId });
        const scheduled = await Appointment.find({ doctorId: doctorId });

        if (unscheduled == "true") {
            // Filter out slots that have corresponding appointments
            slots = slots.filter((slot) => {
                return !scheduled.some(
                    (appointment) => appointment.slotId == slot._id
                );
            });
        }

        res.status(200).json(slots);
    } catch (error) {
        res
            .status(500)
            .json({ message: `Something went wrong, Please try again!` }) &&
            next(error);
    }
};
// ================================================================================= //

const getSlotsByClinicID = async (req, res, next) => {
    try {
        const { clinicId } = req.params;
        const { unscheduled } = req.query;

        let slots = await Slot.find({ clinicId: clinicId });
        const scheduled = await Appointment.find({ clinicId: clinicId });

        if (unscheduled == "true") {
            // Filter out slots that have corresponding appointments
            slots = slots.filter((slot) => {
                return !scheduled.some(
                    (appointment) => appointment.slotId == slot._id
                );
            });
        }

        res.status(200).json(slots);
    } catch (error) {
        res
            .status(500)
            .json({ message: `Something went wrong, Please try again!` }) &&
            next(error);
    }
};

// ================================================================================= //

const getSlotsByDoctorIDandDate = async (req, res, next) => {
    try {
        const { doctorId, date } = req.params;

        const providedDate = new Date(date);

        if (dateValidation(date).valid == false) {
            return res.status(404).json(dateValidation(date).message);
        }

        const slots = await Slot.find({
            doctorId: doctorId,
            weekDay: weekdaysMap[providedDate.getDay()],
        });

        const scheduled = await Appointment.find({
            doctorId: doctorId,
            date: date,
        });

        if (slots.length > 0) {
            const result = slots.map((slot) => {
                const isScheduled = scheduled.some(
                    (appointment) => appointment.slotId == slot._id
                );

                return {
                    slot: slot,
                    appointmentObject: isScheduled
                        ? scheduled.find(
                              (appointment) => appointment.slotId == slot._id
                          )
                        : {},
                };
            });

            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: `No slot found with Doctor ID: ${doctorId} or Week Day: ${
                    weekdaysMap[providedDate.getDay()]
                }`,
            });
        }
    } catch (error) {
        res
            .status(500)
            .json({ message: `Something went wrong, Please try again!` }) &&
            next(error);
    }
};

// ================================================================================= //

const updateSlot = async (req, res, next) => {
    try {
        const { slotId } = req.params;
        const slot = await Slot.findOneAndUpdate({ _id: slotId }, req.body);

        if (slot) res.status(200).json({ message: "Success" });
        else
            res.status(404).json({
                message: `No slot found with ID: ${slotId}`,
            });

        next();
    } catch (error) {
        res.status(500).json({ message: "No slots found" }) && next(error);
    }
};

// ================================================================================= //

const deleteSlot = async (req, res, next) => {
    try {
        const { slotId } = req.params;

        const slot = await Slot.findOneAndDelete({ _id: slotId });

        await Appointment.findOneAndDelete({ slotId: slotId });

        if (slot) res.status(200).json({ message: "Success" });
        else
            res.status(404).json({
                message: `No slot found with ID: ${slotId}`,
            });

        next();
    } catch (error) {
        res.status(500).json({ message: error.message }) && next(error);
    }
};

const timeValidation = () => {
    const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    if (!timeRegex.test(time)) {
        return json({
            message: "Invalid time format. Use the format HH:mm.",
        });
    }
};

const dateValidation = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(date)) {
        return {
            valid: false,
            message: "Invalid date format. Use the format YYYY-MM-DD.",
        };
    }

    return { valid: true };
};
module.exports = {
    createSlot,
    getAllSlots,
    getSlotsByDoctorID,
    getSlotsByClinicID,
    getSlotsByDoctorIDandDate,
    updateSlot,
    deleteSlot,
};
