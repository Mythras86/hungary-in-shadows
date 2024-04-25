const express = require("express");

const WeaponController = require("../controllers/weapons");

const router = express.Router();

router.post("/create", WeaponController.createWeapon);

router.patch("/:_id", WeaponController.updateWeapon);

router.get("/list", WeaponController.getWeapons);

router.get("/:_id", WeaponController.getOneWeapon);

router.delete("/:_id", WeaponController.deleteWeapon);

module.exports = router;
