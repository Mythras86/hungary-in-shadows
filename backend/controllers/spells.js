const Spell = require("../models/spell");

exports.createSpell = (req, res, next) => {
  const spell = new Spell ({
    spellName: req.body.spellName,
    spellCategory: req.body.spellCategory,
    spellType: req.body.spellType,
    spellTarget: req.body.spellTarget,
    spellRange: req.body.spellRange,
    spellTargetNum: req.body.spellTargetNum,
    spellDuration: req.body.spellDuration,
    spellFatigue: req.body.spellFatigue,
    spellDesc: req.body.spellDesc,
  });
  spell
    .save()
    .then(createdSpell => {
      res.status(201).json({
        message: "Spell added successfully",
        spell: {
          ...createdSpell,
          _id: createdSpell._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating an Spell failed!"
      });
    });
};

exports.updateSpell = (req, res, next) => {
  const spell = new Spell({
    _id: req.body._id,
    spellName: req.body.spellName,
    spellCategory: req.body.spellCategory,
    spellType: req.body.spellType,
    spellTarget: req.body.spellTarget,
    spellRange: req.body.spellRange,
    spellTargetNum: req.body.spellTargetNum,
    spellDuration: req.body.spellDuration,
    spellFatigue: req.body.spellFatigue,
    spellDesc: req.body.spellDesc,
  });
  Spell.updateOne({_id: req.params._id}, spell)
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
        message: "Couldn't udpate Spell!"
      });
    });
};

exports.getSpells = (req, res, next) => {
  const spellQuery = Spell.find();
  let fetchedSpells;
  spellQuery
    .then(documents => {
      fetchedSpells = documents;
      return Spell.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Spells fetched successfully!",
        spells: fetchedSpells,
        maxSpells: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Spells failed!"
      });
    });
};

exports.getOneSpell = (req, res, next) => {
  Spell.findById(req.params._id)
    .then(spell => {
      if (spell) {
        res.status(200).json(spell);
      } else {
        res.status(404).json({ message: "Spell not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Spell failed!"
      });
    });
};

exports.deleteSpell = (req, res, next) => {
  Spell.deleteOne({ _id: req.params._id})
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
