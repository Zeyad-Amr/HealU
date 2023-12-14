const express = require("express");
const router = express.Router();
const SlotController = require("../controllers/slotControllers");

router.post("/", SlotController.createSlot);

router.get("/", SlotController.getAllSlots);

router.get("/:doctorID", SlotController.getSlotByDoctorID);

router.put("/:slotID", SlotController.updateSlot);

router.delete("/:slotID", SlotController.deleteSlot);

module.exports = router;
