const express = require("express");
const router   = express.Router();
const equipmentsController = require("../controllers/equipmentsController");

router.get('/', equipmentsController.getAllEquipments);
router.get('/:id', equipmentsController.getEquipmentById);
router.post('/', equipmentsController.addEquipments);
router.put('/:id', equipmentsController.updateEquipment);
router.delete('/:id', equipmentsController.deleteEquipment);

module.exports = router;