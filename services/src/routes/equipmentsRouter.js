const express = require("express");
const router   = express.Router();
const equipmentsController = require("../controllers/equipmentsController");

router.get('/',equipmentsController.getAllEquipments );
router.post('/',equipmentsController.addEquipments );
module.exports = router;