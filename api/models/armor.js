const mongoose = require("mongoose");

const armorSchema = mongoose.Schema({
  nev:{type: String, required: true},
  csoport:{type: String, required: true},
  szint:{type: Number, required: true},
  suly:{type: Number, required: true},
  kiegekSulya:{type: Number, required: false},
  ar:{type: Number, required: true},
  kiegekAra:{type: Number, required: false},
  elhelyezes:{type: String, required: false},
  felszerelt:[{type: Array, required: false}],
  megjegyzes:{type: String, required: false},
  addons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'armorAddonSchema' }]
});

module.exports = mongoose.model("Armor", armorSchema);
