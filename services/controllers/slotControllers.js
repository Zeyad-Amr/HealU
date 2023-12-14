const Slot = require("../models/Slot");

const createSlot = async (req, res) => {
  try {
    await Slot.create(req.body);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};

// ================================================================================= //

const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find({});
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: "No slots found" }) && next(error);
  }
};

// ================================================================================= //

const getSlotByDoctorID = async (req, res) => {
  try {
    const { doctorID } = req.params;
    const slot = await Slot.find({ doctor_id: doctorID });
    res.status(200).json(slot);
  } catch (error) {
    res
      .status(500)
      .json({ message: `No Slot found with Doctor ID: ${doctorID}` }) &&
      next(error);
  }
};

// ================================================================================= //

const updateSlot = async (req, res) => {
  try {
    const { slotID } = req.params;
    const slot = await Slot.findOneAndUpdate({ _id: slotID }, req.body);
    if (!slot) {
      return res.status(404).json({ message: `No Slot with ID: ${slotID}` });
    }
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "No slots found" }) && next(error);
  }
};

// ================================================================================= //

const deleteSlot = async (req, res) => {
  try {
    const { slotID } = req.params;
    const slot = await Slot.findOneAndDelete({ _id: slotID }, req.body);
    if (!slot) {
      return res.status(404).json({ message: `No Slot with ID: ${slotID}` });
    }
    res.status(200).json({ message: "Success" });
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
