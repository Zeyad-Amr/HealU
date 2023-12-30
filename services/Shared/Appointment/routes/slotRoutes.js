const express = require("express");
const router = express.Router();
const SlotController = require("../controllers/slotControllers");

router.post("/", SlotController.createSlot);

router.get("/", SlotController.getAllSlots);

router.get("/doctor/:doctorId", SlotController.getSlotsByDoctorID);

router.get("/clinic/:clinicId", SlotController.getSlotsByClinicID);

router.get(
    "/doctor/:doctorId/date/:date",
    SlotController.getSlotsByDoctorIDandDate
);

router.put("/:slotId", SlotController.updateSlot);

router.delete("/:slotId", SlotController.deleteSlot);

module.exports = router;
