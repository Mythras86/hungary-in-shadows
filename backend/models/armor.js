const mongoose = require("mongoose");

const armorSchema = mongoose.Schema({
  nev:{type: String, required: true},
  csoport:{type: String, required: true},
  szint:{type: Number, required: true},
  suly:{type: Number, required: true},
  ar:{type: Number, required: true},
  megjegyzes:{type: String, required: false},
  elhelyezes:{type: String, required: false},
});

module.exports = mongoose.model("Armor", armorSchema);
