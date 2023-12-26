const Slot = require("../models/Slot");
const Appointment = require("../models/Appointment");

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
        const newSlot = await Slot.create({
            doctorId: req.body.doctorId,
            clinicId: req.body.clinicId,
            time: req.body.time,
            weekDay: req.body.weekDay,
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

        if (slots.length > 0) {
            if (unscheduled == "true") {
                // Filter out slots that have corresponding appointments
                slots = slots.filter((slot) => {
                    return !scheduled.some(
                        (appointment) => appointment.slotId == slot._id
                    );
                });
            }

            res.status(200).json(slots);
        } else {
            res.status(404).json({
                message: `No slot found with Doctor ID: ${doctorId}`,
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

const getSlotsByClinicID = async (req, res, next) => {
    try {
        const { clinicId } = req.params;
        const { unscheduled } = req.query;

        let slots = await Slot.find({ clinicId: clinicId });
        const scheduled = await Appointment.find({ clinicId: clinicId });

        if (slots.length > 0) {
            if (unscheduled == "true") {
                // Filter out slots that have corresponding appointments
                slots = slots.filter((slot) => {
                    return !scheduled.some(
                        (appointment) => appointment.slotId == slot._id
                    );
                });
            }

            res.status(200).json(slots);
        } else {
            res.status(404).json({
                message: `No slot found with Clinic ID: ${clinicId}`,
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

const getSlotsByDoctorIDandDate = async (req, res, next) => {
    try {
        const { doctorId, date } = req.params;

        const providedDate = new Date(date);

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

                console.log(isScheduled);

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
        const slot = await Slot.findOneAndDelete({ _id: slotId }, req.body);
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

module.exports = {
    createSlot,
    getAllSlots,
    getSlotsByDoctorID,
    getSlotsByClinicID,
    getSlotsByDoctorIDandDate,
    updateSlot,
    deleteSlot,
};
