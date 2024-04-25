const express = require("express");
const app = express();

app.get("/", (req:any, res:any) => res.send("Express on Vercel"));
app.get("/char/list", (req:any, res:any) => res.send("Express on Vercel"));
app.get("/api/char/list", (req:any, res:any) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
