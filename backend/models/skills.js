const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  szakertNev: { type: String, required: true},
  szakertCsoport: { type: String, required: true},
  szakertMegjegyzes: { type: String, required: true},
  szakertSzint: { type: Number, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Skill", userSchema);
