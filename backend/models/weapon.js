const mongoose = require("mongoose");

const weaponSchema = mongoose.Schema({
  nev:{type: String, required: true},
  csoport:{type: String, required: true},
  tipus:{type: String, required: true},
  tar:{type: String, required: true},
  tamadasiModok:{type: String, required: true},
  tav:{type: Number, required: true},
  ero:{type: Number, required: true},
  sebzes:{type: Number, required: true},
  sebzesTipus:{type: String, required: true},
  suly:{type: Number, required: true},
  ar:{type: Number, required: true},
  megjegyzes:{type: String, required: false},
});

module.exports = mongoose.model("Weapon", weaponSchema);
