const express = require("express");

const EquipmentController = require("../controllers/tool");

const router = express.Router();

router.post("/create", EquipmentController.createEquipment);

router.patch("/:_id", EquipmentController.updateEquipment);

router.get("/list", EquipmentController.getEquipments);

router.get("/:_id", EquipmentController.getOneEquipment);

router.delete("/:_id", EquipmentController.deleteEquipment);

module.exports = router;
