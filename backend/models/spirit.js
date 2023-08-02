const mongoose = require("mongoose");

const spiritSchema = mongoose.Schema({
  spiritName: {type: String},
  spiritCategory: {type: String},
  spiritSkills: {type: String},
  spiritDesc: {type: String},
  spiritAttack: {type: String},
  //fizikai
  spiritFizEro: {type: Number},
  spiritFizGyo: {type: Number},
  spiritFizUgy: {type: Number},
  spiritFizAll: {type: Number},
  //szellemi
  spiritAsztEro: {type: Number},
  spiritAsztGyo: {type: Number},
  spiritAsztUgy: {type: Number},
  spiritAsztAll: {type: Number},
});

module.exports = mongoose.model("Spirit", spiritSchema);
