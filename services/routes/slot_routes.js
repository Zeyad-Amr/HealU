const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot");

// Add a new slot
router.post("/slots", async (req, res) => {
  try {
    const slot = await Slot.create(req.body);
    res.status(200).json(slot);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
});

// ================================================================================= //
// Get all slots
router.get("/slots", async (req, res) => {
  try {
    const slots = await Slot.find({});
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: "No slots found" });
  }
});

// ================================================================================= //
// Get all the slots by the doctor id
router.get("/slots/:doctor_id", async (req, res) => {
  try {
    const { doctor_id } = req.params;
    const slot = await Slot.find({
      doctor_id: doctor_id,
    });
    res.status(200).json(slot);
  } catch (error) {
    res.status(500).json({ message: "No slots found" });
  }
});

// ================================================================================= //
// Update a slot by the slot id
router.put("/slots/:slot_id", async (req, res) => {
  try {
    const { slot_id } = req.params;
    const slot = await Slot.findOneAndUpdate({ _id: slot_id }, req.body);
    if (!slot) {
      return res
        .status(404)
        .json({ message: `cannot find a slot with ID: ${slot_id}` });
    }
    const updatedSlot = await Slot.find({ _id: slot_id });
    res.status(200).json(updatedSlot);
  } catch (error) {
    res.status(500).json({ message: "No slots found" });
  }
});

// ================================================================================= //
// Delete slot by the slot id
router.delete("/slots/:slot_id", async (req, res) => {
  try {
    const { slot_id } = req.params;
    const slot = await Slot.findOneAndDelete({ _id: slot_id }, req.body);
    if (!slot) {
      return res
        .status(404)
        .json({ message: `cannot find a project with ID: ${slot_id}` });
    }
    res.status(200).json({ message: `Deleted a slot with ID: ${slot_id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
