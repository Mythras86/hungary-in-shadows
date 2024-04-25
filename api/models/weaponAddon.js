const mongoose = require("mongoose");

const weaponAddonSchema = mongoose.Schema({
  addonName:{type: String, required: true},
  addonCategory:{type: String, required: true},
  addonPlace:{type: String, required: true},
  addonAddWeight:{type: Number, required: true},
  addonAddPrice:{type: Number, required: true},
  addonMultiWeight:{type: Number, required: true},
  addonMultiPrice:{type: Number, required: true},
  addonDesc:{type: String, required: true},
});

module.exports = mongoose.model("WeaponAddon", weaponAddonSchema);
