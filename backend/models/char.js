const mongoose = require("mongoose");

const charSchema = mongoose.Schema({
  creatorName: { type: String, required: true},
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  teljesnev: { type: String, required: false},
  becenev:{ type: String, required: false},
  alnev:{ type: String, required: false},
  testalkat:{ type: String, required: false},
  hajstilus:{ type: String, required: false},
  megjelenes:{ type: String, required: false},
  nem: { type: String, required: false},
  dns:{ type: String, required: false},
  anyanyelv: { type: String, required: false},
  eletkor:{ type: Number, required: false},
  magassag:{ type: Number, required: false},
  testsuly:{ type: Number, required: false},
  szemszin:{ type: String, required: false},
  hajszin:{ type: String, required: false},
  szorszin:{ type: String, required: false},
  borszin:{ type: String, required: false},
  felelem:{ type: String, required: false},
  osztonzo:{ type: String, required: false},
  gyulolet:{ type: String, required: false},
  kedvenc:{ type: String, required: false},
  irtozat:{ type: String, required: false},
  vonzalom:{ type: String, required: false},
});

module.exports = mongoose.model("Char", charSchema);
