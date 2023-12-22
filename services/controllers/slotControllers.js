const Slot = require("../models/Slot");

let counter = 0;

const createSlot = async (req, res, next) => {
  try {
    const newSlot = await Slot.create({
      slotId: counter,
      doctorId: req.body.doctorId,
      clinicId: req.body.clinicId,
      time: req.body.time,
      date: req.body.date,
    });
    counter++;

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

const getSlotByDoctorID = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const slot = await Slot.find({ doctorId: doctorId });

    if(slot.length > 0)
      res.status(200).json(slot);
    else
      res.status(404).json({ message: `No slot found with Doctor ID: ${doctorId}` });

    next();
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
    const slot = await Slot.findOneAndUpdate({ slotId: slotId }, req.body);

    if (slot) 
      res.status(200).json({ message: "Success" });
    else
      res.status(404).json({ message: `No slot found with ID: ${slotId}` });
    
    next();
  } catch (error) {
    res.status(500).json({ message: "No slots found" }) && next(error);
  }
};

// ================================================================================= //

const deleteSlot = async (req, res, next) => {
  try {
    const { slotId } = req.params;
    const slot = await Slot.findOneAndDelete({ slotId: slotId }, req.body);

    if (slot) 
      res.status(200).json({ message: "Success" });
    else
      res.status(404).json({ message: `No slot found with ID: ${slotId}` });
    
    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};

module.exports = {
  createSlot,
  getAllSlots,
  getSlotByDoctorID,
  updateSlot,
  deleteSlot,
};
