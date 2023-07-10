const Cybernetic = require("../models/cyber");

exports.createCybernetic = (req, res, next) => {
  const cybernetic = new Cybernetic ({
    cyberneticName:req.body.cyberneticName,
    cyberneticCategory:req.body.cyberneticCategory,
    cyberneticMaxLevel:req.body.cyberneticMaxLevel,
    cyberneticPrice:req.body.cyberneticPrice,
    cyberneticEssence:req.body.cyberneticEssence,
    cyberneticDesc:req.body.cyberneticDesc
  });
  cybernetic
    .save()
    .then(createdCybernetic => {
      res.status(201).json({
        message: "Cybernetic added successfully",
        cybernetic: {
          ...createdCybernetic,
          _id: createdCybernetic._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating an Cybernetic failed!"
      });
    });
};

exports.updateCybernetic = (req, res, next) => {
  const cybernetic = new Cybernetic({
    _id: req.body._id,
    cyberneticName:req.body.cyberneticName,
    cyberneticCategory:req.body.cyberneticCategory,
    cyberneticMaxLevel:req.body.cyberneticMaxLevel,
    cyberneticPrice:req.body.cyberneticPrice,
    cyberneticEssence:req.body.cyberneticEssence,
    cyberneticDesc:req.body.cyberneticDesc
  });
  Cybernetic.updateOne({_id: req.params._id}, cybernetic)
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
        message: "Couldn't udpate Cybernetic!"
      });
    });
};

exports.getCybernetics = (req, res, next) => {
  const cyberneticQuery = Cybernetic.find();
  let fetchedCybernetics;
  cyberneticQuery
  .then(documents => {
    fetchedCybernetics = documents;
      return Cybernetic.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Cybernetics fetched successfully!",
        cybernetics: fetchedCybernetics,
        maxCybernetics: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Cybernetics failed!"
      });
    });
};

exports.getOneCybernetic = (req, res, next) => {
  Cybernetic.findById(req.params._id)
    .then(cybernetic => {
      if (cybernetic) {
        res.status(200).json(cybernetic);
      } else {
        res.status(404).json({ message: "Cybernetic not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Cybernetic failed!"
      });
    });
};

exports.deleteCybernetic = (req, res, next) => {
  Cybernetic.deleteOne({ _id: req.params._id})
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
