const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  nev: { type: String, required: true},
  csoport: { type: String, required: true},
  megjegyzes: { type: String},
  szint: { type: Number, required: true }
});

module.exports = mongoose.model("Skill", skillSchema);
