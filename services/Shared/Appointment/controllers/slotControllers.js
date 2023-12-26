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

// // Reverse mapping for numeric to weekday names
const weekdayNamesMap = Object.entries(weekdaysMap).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});
  
  const createSlot = async (req, res, next) => {
    try {
      const { doctorId, clinicId, time, weekDay } = req.body;
  
      // Validate weekday input
      if (!Object.values(weekdaysMap).includes(weekDay)) {
        return res.status(400).json({ message: "Invalid weekday provided" });
      }
  
      // Convert weekday to numeric representation (if needed)
      const numericWeekDay = weekdayNamesMap[weekDay] || weekDay; // Use existing numeric value or map from name
  
      // Check for existing slots with the same doctor, date, and different clinic
      const existingSlot = await Slot.findOne({
        doctorId,
        time,
        // clinicId: { $ne: clinicId }, // Exclude current clinic
      });
      if (existingSlot) {
        return res.status(400).json({
          message: 'Doctor already has a slot on that date in another clinic',
        });
      }
  
      // Check for existing slots with the same time in another clinic (considering weekday)
      const existingSlotWithTime = await Slot.findOne({
        time: time,
        // clinicId: { $ne: clinicId }, // Exclude current clinic
        weekDay: numericWeekDay, // Use numeric weekday for comparison
      });
      if (existingSlotWithTime) {
        return res.status(400).json({
          message: `Another clinic already has a slot at that time on ${weekdaysMap[numericWeekDay]}`,
        });
      }
  
      // Create the slot only if no conflicts are found
      const newSlot = await Slot.create({
        doctorId,
        clinicId,
        time,
        weekDay: numericWeekDay, // Store numeric weekday in the database
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

// const getSlotsByDoctorID = async (req, res, next) => {
//     try {
//       const { doctorId } = req.params;
//       const { unscheduled } = req.query;
  
//       // Retrieve only available slots considering the unique constraints
//       const slots = await Slot.find({
//         doctorId: doctorId,
//         $or: [
//           {
//             // Slot has no corresponding appointment
//             $not: { _id: { $in: await Appointment.distinct('slotId') } }
//           },
//           {
//             // Slot has a corresponding appointment that's not booked
//             $and: [
//               { _id: { $in: await Appointment.distinct('slotId') } },
//               { 'appointments.status': { $ne: 'Booked' } } // Assuming 'Booked' status indicates a booked appointment
//             ]
//           }
//         ]
//       });
  
//       if (slots.length > 0) {
//         res.status(200).json(slots);
//       } else {
//         res.status(404).json({
//           message: `No slot found with Doctor ID: ${doctorId}`,
//         });
//       }
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: `Something went wrong, Please try again!` }) &&
//         next(error);
//     }
//   };

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

module.exports = {
    createSlot,
    getAllSlots,
    getSlotsByDoctorID,
    getSlotsByClinicID,
    getSlotsByDoctorIDandDate,
    updateSlot,
    deleteSlot,
};
