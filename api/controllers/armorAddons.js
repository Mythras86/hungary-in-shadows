const ArmorAddon = require("../models/armorAddon");

exports.createAddon = (req, res, next) => {
  const addon = new ArmorAddon ({
    addonName:req.body.addonName,
    addonPlace:req.body.addonPlace,
    addonAddWeight:req.body.addonAddWeight,
    addonAddPrice:req.body.addonAddPrice,
    addonMultiWeight:req.body.addonMultiWeight,
    addonMultiPrice:req.body.addonMultiPrice,
    addonDesc:req.body.addonDesc
  });
  addon
    .save()
    .then(createdAddon => {
      res.status(201).json({
        message: "ArmorAddon added successfully",
        addon: {
          ...createdAddon,
          _id: createdAddon._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a ArmorAddon failed!"
      });
    });
};

exports.updateAddon = (req, res, next) => {
  const addon = new ArmorAddon({
    _id: req.body._id,
    addonName:req.body.addonName,
    addonPlace:req.body.addonPlace,
    addonAddWeight:req.body.addonAddWeight,
    addonAddPrice:req.body.addonAddPrice,
    addonMultiWeight:req.body.addonMultiWeight,
    addonMultiPrice:req.body.addonMultiPrice,
    addonPrice:req.body.addonPrice,
    addonDesc:req.body.addonDesc,
  });
  ArmorAddon.updateOne({_id: req.params._id}, addon)
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
        message: "Couldn't udpate ArmorAddon!"
      });
    });
};

exports.getAddons = (req, res, next) => {
  const addonQuery = ArmorAddon.find();
  let fetchedAddons;
  addonQuery
    .then(documents => {
      fetchedAddons = documents;
      return ArmorAddon.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Addons fetched successfully!",
        addons: fetchedAddons,
        maxAddons: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Addons failed!"
      });
    });
};

exports.getOneAddon = (req, res, next) => {
  ArmorAddon.findById(req.params._id)
    .then(addon => {
      if (addon) {
        res.status(200).json(addon);
      } else {
        res.status(404).json({ message: "ArmorAddon not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching ArmorAddon failed!"
      });
    });
};

exports.deleteAddon = (req, res, next) => {
  ArmorAddon.deleteOne({ _id: req.params._id})
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
