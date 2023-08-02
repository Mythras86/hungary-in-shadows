const Spirit = require("../models/spirit");

exports.createSpirit = (req, res, next) => {
  const spirit = new Spirit ({
    spiritName: req.body.spiritName,
    spiritCategory: req.body.spiritCategory,
    spiritSkills: req.body.spiritSkills,
    spiritDesc: req.body.spiritDesc,
    spiritAttack: req.body.spiritAttack,
    //fizikai
    spiritFizEro: req.body.spiritFizEro,
    spiritFizGyo: req.body.spiritFizGyo,
    spiritFizUgy: req.body.spiritFizUgy,
    spiritFizAll: req.body.spiritFizAll,
    //szellemi
    spiritAsztEro: req.body.spiritAsztEro,
    spiritAsztGyo: req.body.spiritAsztGyo,
    spiritAsztUgy: req.body.spiritAsztUgy,
    spiritAsztAll: req.body.spiritAsztAll,
  });
  spirit
    .save()
    .then(createdSpirit => {
      res.status(201).json({
        message: "Spirit added successfully",
        spirit: {
          ...createdSpirit,
          _id: createdSpirit._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating an Spirit failed!"
      });
    });
};

exports.updateSpirit = (req, res, next) => {
  const spirit = new Spirit({
    _id: req.body._id,
    spiritName: req.body.spiritName,
    spiritCategory: req.body.spiritCategory,
    spiritSkills: req.body.spiritSkills,
    spiritDesc: req.body.spiritDesc,
    spiritAttack: req.body.spiritAttack,
    //fizikai
    spiritFizEro: req.body.spiritFizEro,
    spiritFizGyo: req.body.spiritFizGyo,
    spiritFizUgy: req.body.spiritFizUgy,
    spiritFizAll: req.body.spiritFizAll,
    //szellemi
    spiritAsztEro: req.body.spiritAsztEro,
    spiritAsztGyo: req.body.spiritAsztGyo,
    spiritAsztUgy: req.body.spiritAsztUgy,
    spiritAsztAll: req.body.spiritAsztAll,
  });
  Spirit.updateOne({_id: req.params._id}, spirit)
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
        message: "Couldn't udpate Spirit!"
      });
    });
};

exports.getSpirits = (req, res, next) => {
  const spiritQuery = Spirit.find();
  let fetchedSpirits;
  spiritQuery
    .then(documents => {
      fetchedSpirits = documents;
      return Spirit.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Spirits fetched successfully!",
        spirits: fetchedSpirits,
        maxSpirits: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Spirits failed!"
      });
    });
};

exports.getOneSpirit = (req, res, next) => {
  Spirit.findById(req.params._id)
    .then(spirit => {
      if (spirit) {
        res.status(200).json(spirit);
      } else {
        res.status(404).json({ message: "Spirit not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Spirit failed!"
      });
    });
};

exports.deleteSpirit = (req, res, next) => {
  Spirit.deleteOne({ _id: req.params._id})
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
