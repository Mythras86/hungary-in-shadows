const mongoose = require("mongoose");

const toolSchema = mongoose.Schema({
  nev:{type: String, required: true},
  csoport:{type: String, required: true},
  maxSzint:{type: Number, required: true},
  szint:{type: Number},
  suly:{type: Number, required: true},
  ar:{type: Number, required: true},
  elhelyezes:{type: String, required: false},
  megjegyzes:{type: String, required: false},
});

module.exports = mongoose.model("Equipment", toolSchema, "equipments");
