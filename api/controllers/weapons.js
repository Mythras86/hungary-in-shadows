const Weapon = require("../models/weapon");

exports.createWeapon = (req, res, next) => {
  const weapon = new Weapon ({
    weaponName:req.body.weaponName,
    weaponCategory:req.body.weaponCategory,
    weaponType:req.body.weaponType,
    weaponClip:req.body.weaponClip,
    weaponMods:req.body.weaponMods,
    weaponRange:req.body.weaponRange,
    weaponPower:req.body.weaponPower,
    weaponDamage:req.body.weaponDamage,
    weaponDmgType:req.body.weaponDmgType,
    weaponWeight:req.body.weaponWeight,
    weaponPrice:req.body.weaponPrice,
    weaponDesc:req.body.weaponDesc
  });
  weapon
    .save()
    .then(createdWeapon => {
      res.status(201).json({
        message: "Weapon added successfully",
        weapon: {
          ...createdWeapon,
          _id: createdWeapon._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a Weapon failed!"
      });
    });
};

exports.updateWeapon = (req, res, next) => {
  const weapon = new Weapon({
    _id: req.body._id,
    weaponName:req.body.weaponName,
    weaponCategory:req.body.weaponCategory,
    weaponType:req.body.weaponType,
    weaponClip:req.body.weaponClip,
    weaponMods:req.body.weaponMods,
    weaponRange:req.body.weaponRange,
    weaponPower:req.body.weaponPower,
    weaponDamage:req.body.weaponDamage,
    weaponDmgType:req.body.weaponDmgType,
    weaponWeight:req.body.weaponWeight,
    weaponPrice:req.body.weaponPrice,
    weaponDesc:req.body.weaponDesc
  });
  Weapon.updateOne({_id: req.params._id}, weapon)
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
        message: "Couldn't udpate Weapon!"
      });
    });
};

exports.getWeapons = (req, res, next) => {
  const weaponQuery = Weapon.find();
  let fetchedWeapons;
  weaponQuery
    .then(documents => {
      fetchedWeapons = documents;
      return Weapon.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Weapons fetched successfully!",
        weapons: fetchedWeapons,
        maxWeapons: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Weapons failed!"
      });
    });
};

exports.getOneWeapon = (req, res, next) => {
  Weapon.findById(req.params._id)
    .then(weapon => {
      if (weapon) {
        res.status(200).json(weapon);
      } else {
        res.status(404).json({ message: "Weapon not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Weapon failed!"
      });
    });
};

exports.deleteWeapon = (req, res, next) => {
  Weapon.deleteOne({ _id: req.params._id})
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
