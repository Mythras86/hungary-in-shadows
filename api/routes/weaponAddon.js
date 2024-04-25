const express = require("express");

const AddonController = require("../controllers/weaponAddons");

const router = express.Router();

router.post("/create", AddonController.createAddon);

router.patch("/:_id", AddonController.updateAddon);

router.get("/list", AddonController.getAddons);

router.get("/:_id", AddonController.getOneAddon);

router.delete("/:_id", AddonController.deleteAddon);

module.exports = router;
