const express = require("express");

const CharController = require("../controllers/chars");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", checkAuth, CharController.createChar);

router.put("/:_id", checkAuth, CharController.updateChar);

router.get("/list", CharController.getChars);

router.get("/:_id", CharController.getOneChar);

router.delete("/:_id", checkAuth, CharController.deleteChar);

module.exports = router;
