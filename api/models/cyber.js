const mongoose = require("mongoose");

const cyber = mongoose.Schema({
  nev: {type: String},
  csoport: {type: String},
  maxSzint: {type: Number},
  szint: {type: Number},
  ar: {type: Number},
  esszencia: {type: Number},
  megjegyzes: {type: String},
});

module.exports = mongoose.model("Cybernetic", cyber);
