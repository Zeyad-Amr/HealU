const express = require("express");
const router = express.Router();
const supplyController = require("../controllers/supplyController");

router.get('/', supplyController.getAllSupplies);
router.get('/:id', supplyController.getSupplyById);
router.post('/', supplyController.addSupply);
router.put('/:id', supplyController.updateSupply);
router.delete('/:id', supplyController.deleteSupply);

module.exports = router;


