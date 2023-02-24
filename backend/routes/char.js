const express = require("express");

const CharController = require("../controllers/char");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", CharController.createChar);

router.put("/:_id", CharController.updateChar);

router.get("/list", CharController.getChars);

router.get("/:_id", CharController.getOneChar);

router.delete("/:_id", CharController.deleteChar);

module.exports = router;
