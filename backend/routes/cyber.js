const express = require("express");

const CyberController = require("../controllers/cyber");

const router = express.Router();

router.post("/create", CyberController.createCybernetic);

router.patch("/:_id", CyberController.updateCybernetic);

router.get("/list", CyberController.getCybernetics);

router.get("/:_id", CyberController.getOneCybernetic);

router.delete("/:_id", CyberController.deleteCybernetic);

module.exports = router;
