const express = require("express");

const ArmorController = require("../controllers/armors");

const router = express.Router();

router.post("/create", ArmorController.createArmor);

router.patch("/:_id", ArmorController.updateArmor);

router.get("/list", ArmorController.getArmors);

router.get("/:_id", ArmorController.getOneArmor);

router.delete("/:_id", ArmorController.deleteArmor);

module.exports = router;
