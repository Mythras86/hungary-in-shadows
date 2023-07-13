const mongoose = require("mongoose");

const charSchema = mongoose.Schema({
  creatorName: { type: String, required: true},
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},

  //szöveges
  teljesnev: { type: String, required: true},
  becenev:{ type: String, required: true},
  alnev:{ type: String, required: true},
  testalkat:{ type: String, required: true},
  hajstilus:{ type: String, required: true},
  //értékválasztó
  nem: { type: String, required: true},
  dns:{ type: String, required: true},
  anyanyelv: { type: String, required: true},
  eletkor:{ type: Number, required: true},
  magassag:{ type: Number, required: true},
  testsuly:{ type: Number, required: true},
  //szín
  szemszin:{ type: String, required: true},
  hajszin:{ type: String, required: true},
  szorszin:{ type: String, required: true},
  borszin:{ type: String, required: true},
  kedvencszin:{ type: String, required: true},
  // hosszú szöveg
  felelem:{ type: String, required: true},
  osztonzo:{ type: String, required: true},
  gyulolet:{ type: String, required: true},
  kedvenc:{ type: String, required: true},
  irtozat:{ type: String, required: true},
  vonzalom:{ type: String, required: true},
  megjelenes:{ type: String, required: true},

  //erőforrások
  elkolthetoKarma: { type: Number, required: true},
  elkolthetoToke: { type: Number, required: true},
  karmabolToke: { type: Number, required: true},

  //fizikai
  fizEro: { type: Number, required: true},
  fizEroMod: { type: Number, required: true},
  fizGyo: { type: Number, required: true},
  fizGyoMod: { type: Number, required: true},
  fizUgy: { type: Number, required: true},
  fizUgyMod: { type: Number, required: true},
  fizKit: { type: Number, required: true},
  fizKitMod: { type: Number, required: true},
  //asztrál
  asztEro: { type: Number, required: true},
  asztEroMod: { type: Number, required: true},
  asztGyo: { type: Number, required: true},
  asztGyoMod: { type: Number, required: true},
  asztUgy: { type: Number, required: true},
  asztUgyMod: { type: Number, required: true},
  asztKit: { type: Number, required: true},
  asztKitMod: { type: Number, required: true},
  //speciális
  magia: { type: Number, required: true},
  magiaMod: { type: Number, required: true},
  esszencia: { type: Number, required: true},
  esszenciaMod: { type: Number, required: true},
  kockatartalek: { type: Number, required: true},
  kockatartalekMod: { type: Number, required: true},
  kezdemenyezes: { type: Number, required: true},
  kezdemenyezesMod: { type: Number, required: true},
  // szakértelmek
  skills: {type: Array, ref: 'Skill'},
  // állapot
  asztralisAllapot: { type: Number, required: true},
  fizikaiAllapot: { type: Number, required: true},
  pinhentsegAllapot: { type: Number, required: true},
  taplaltsagAllapot: { type: Number, required: true},
  // páncélok
  armors: {type: Array, ref: 'Armor'},
  cybers: {type: Array, ref: 'Cyber'},
  tools: {type: Array, ref: 'Tool'},
  artifacts: {type: Array, ref: 'Artifact'},
});

module.exports = mongoose.model("Char", charSchema);
