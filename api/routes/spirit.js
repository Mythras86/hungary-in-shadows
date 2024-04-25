const express = require("express");

const SpiritController = require("../controllers/spirits");

const router = express.Router();

router.post("/create", SpiritController.createSpirit);

router.patch("/:_id", SpiritController.updateSpirit);

router.get("/list", SpiritController.getSpirits);

router.get("/:_id", SpiritController.getOneSpirit);

router.delete("/:_id", SpiritController.deleteSpirit);

module.exports = router;
