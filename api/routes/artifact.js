const express = require("express");

const ArtifactController = require("../controllers/artifacts");

const router = express.Router();

router.post("/create", ArtifactController.createArtifact);

router.patch("/:_id", ArtifactController.updateArtifact);

router.get("/list", ArtifactController.getArtifacts);

router.get("/:_id", ArtifactController.getOneArtifact);

router.delete("/:_id", ArtifactController.deleteArtifact);

module.exports = router;
