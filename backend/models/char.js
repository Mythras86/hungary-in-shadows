const mongoose = require("mongoose");

const charSchema = mongoose.Schema({
  creatorName: { type: String, required: true},
  creatorID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  nev: { type: String, required: true},
  kaszt: { type: String, required: true},

});

module.exports = mongoose.model("Char", charSchema);
