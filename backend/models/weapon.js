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
  kiegekSulya:{type: Number, required: false},
  ar:{type: Number, required: true},
  kiegekAra:{type: Number, required: false},
  elhelyezes:{type: String, required: false},
  felszerelt:[{type: Array, required: false}],
  megjegyzes:{type: String, required: false},
  addons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'weaponAddonSchema' }]
});

module.exports = mongoose.model("Weapon", weaponSchema);
