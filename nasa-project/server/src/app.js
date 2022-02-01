const express = require("express");
const path = require("path");

const planetRouter = require("./routes/planets/planets.routes");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(planetRouter);
module.exports = app;
