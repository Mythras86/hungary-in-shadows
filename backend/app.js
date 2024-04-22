const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const userRoutes = require("./routes/user");
const charRoutes = require("./routes/char");
const armorRoutes = require("./routes/armor");
const armorAddonRoutes = require("./routes/armorAddon");
const cyberRoutes = require("./routes/cyber");
const artifactRoutes = require("./routes/artifact");
const toolRoutes = require("./routes/tool");
const spellRoutes = require("./routes/spell");
const spiritRoutes = require("./routes/spirit");
const weaponRoutes = require("./routes/weapon");
const weaponAddonRoutes = require("./routes/weaponAddon");
const { dirname } = require("@angular-devkit/core");

const app = express();

app.use(cors())

mongoose
  .connect(
    process.env.DB_CONNECT
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "HungaryInShadow")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "HungaryInShadow", "index.html"))
});

app.use("/api/user", userRoutes);
app.use("/api/char", charRoutes);
app.use("/api/armor", armorRoutes);
app.use("/api/aAddon", armorAddonRoutes);
app.use("/api/weapon", weaponRoutes);
app.use("/api/wAddon", weaponAddonRoutes);
app.use("/api/tool", toolRoutes);
app.use("/api/cyber", cyberRoutes);
app.use("/api/spell", spellRoutes);
app.use("/api/spirit", spiritRoutes);
app.use("/api/artifact", artifactRoutes);

module.exports = app;
