const express = require("express");
const router = express.Router();
const SlotController = require("../controllers/slotControllers");

router.post("/", SlotController.createSlot);

router.get("/", SlotController.getAllSlots);

router.get("/:doctorId", SlotController.getSlotByDoctorID);

router.put("/:slotId", SlotController.updateSlot);

router.delete("/:slotId", SlotController.deleteSlot);

module.exports = router;
