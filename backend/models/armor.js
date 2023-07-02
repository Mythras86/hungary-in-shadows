const mongoose = require("mongoose");

const armorSchema = mongoose.Schema({
  armorName:{type: String, required: true},
  armorCategory:{type: String, required: true},
  armorRating:{type: Number, required: true},
  armorWeight:{type: Number, required: true},
  armorPrice:{type: Number, required: true},
  armorDesc:{type: String, required: false},
});

module.exports = mongoose.model("Armor", armorSchema);
