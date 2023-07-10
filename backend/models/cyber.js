const mongoose = require("mongoose");

const cyber = mongoose.Schema({
  cyberneticName: {type: String},
  cyberneticCategory: {type: String},
  cyberneticPrice: {type: Number},
  cyberneticDesc: {type: String},
  cyberneticEssence: {type: Number},
  cyberneticMaxLevel: {type: Number},
});

module.exports = mongoose.model("Cybernetic", cyber);
