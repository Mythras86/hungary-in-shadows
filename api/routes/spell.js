const express = require("express");

const SpellController = require("../controllers/spells");

const router = express.Router();

router.post("/create", SpellController.createSpell);

router.patch("/:_id", SpellController.updateSpell);

router.get("/list", SpellController.getSpells);

router.get("/:_id", SpellController.getOneSpell);

router.delete("/:_id", SpellController.deleteSpell);

module.exports = router;
