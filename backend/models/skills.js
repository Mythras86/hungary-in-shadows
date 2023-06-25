const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  szakertNev: { type: String, required: true},
  szakertCsoport: { type: String, required: true},
  szakertMegjegyzes: { type: String},
  szakertSzint: { type: Number, required: true }
});

module.exports = mongoose.model("Skill", skillSchema);
