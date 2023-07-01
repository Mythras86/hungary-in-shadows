const mongoose = require("mongoose");

const armorSchema = mongoose.Schema({
  kategoria: { type: String, required: true},
  szint: { type: Number, required: true },
  suly: { type: Number, required: true },
  ar: { type: Number, required: true },
  megjegyzes: { type: String}
});

module.exports = mongoose.model("Armor", armorSchema);
