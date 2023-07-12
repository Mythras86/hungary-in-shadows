const Artifact = require("../models/artifact");

exports.createArtifact = (req, res, next) => {
  const artifact = new Artifact ({
    artifactName: req.body.artifactName,
    artifactCategory: req.body.artifactCategory,
    artifactMaxLevel: req.body.artifactMaxLevel,
    artifactKarmaCost: req.body.artifactKarmaCost,
    artifactPrice: req.body.artifactPrice,
    artifactDesc: req.body.artifactDesc,
  });
  artifact
    .save()
    .then(createdArtifact => {
      res.status(201).json({
        message: "Artifact added successfully",
        artifact: {
          ...createdArtifact,
          _id: createdArtifact._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating an Artifact failed!"
      });
    });
};

exports.updateArtifact = (req, res, next) => {
  const artifact = new Artifact({
    _id: req.body._id,
    artifactName: req.body.artifactName,
    artifactCategory: req.body.artifactCategory,
    artifactMaxLevel: req.body.artifactMaxLevel,
    artifactKarmaCost: req.body.artifactKarmaCost,
    artifactPrice: req.body.artifactPrice,
    artifactDesc: req.body.artifactDesc,
  });
  Artifact.updateOne({_id: req.params._id}, artifact)
    .then(result => {
      console.log (result);
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized, no kidding!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate Artifact!"
      });
    });
};

exports.getArtifacts = (req, res, next) => {
  const artifactQuery = Artifact.find();
  let fetchedArtifacts;
  artifactQuery
    .then(documents => {
      fetchedArtifacts = documents;
      return Artifact.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Artifacts fetched successfully!",
        artifacts: fetchedArtifacts,
        maxArtifacts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Artifacts failed!"
      });
    });
};

exports.getOneArtifact = (req, res, next) => {
  Artifact.findById(req.params._id)
    .then(artifact => {
      if (artifact) {
        res.status(200).json(artifact);
      } else {
        res.status(404).json({ message: "Artifact not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Artifact failed!"
      });
    });
};

exports.deleteArtifact = (req, res, next) => {
  Artifact.deleteOne({ _id: req.params._id})
    .then(result => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Deletion failed" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting failed!"
      });
    });
};
