const mongoose = require("mongoose");

const spellSchema = mongoose.Schema({
  nev: {type: String, required: true},
  csoport: {type: String, required: true},
  tipus: {type: String, required: true},
  szint: {type: Number, required: false},
  celszam: {type: String, required: true},
  hatotav: {type: String, required: true},
  celpontok: {type: String, required: true},
  hatoido: {type: String, required: true},
  kifaradas: {type: String, required: true},
  megjegyzes: {type: String, required: true},
});

module.exports = mongoose.model("Spell", spellSchema);
