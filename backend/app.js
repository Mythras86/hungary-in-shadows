const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const charRoutes = require("./routes/char");
const armorRoutes = require("./routes/armor");
const cyberRoutes = require("./routes/cyber");
const artifactRoutes = require("./routes/artifact");
const toolRoutes = require("./routes/tool");
const spellRoutes = require("./routes/spell");
const weaponRoutes = require("./routes/weapon");

const app = express();

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

app.use ("/api/user", userRoutes);
app.use ("/api/char", charRoutes);
app.use ("/api/armor", armorRoutes);
app.use ("/api/cyber", cyberRoutes);
app.use ("/api/artifact", artifactRoutes);
app.use ("/api/tool", toolRoutes);
app.use ("/api/spell", spellRoutes);
app.use ("/api/weapon", weaponRoutes);

module.exports = app;
