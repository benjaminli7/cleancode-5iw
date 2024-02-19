const express = require("express");
const bodyParser = require("body-parser");
const cardRoutes = require("./interfaces/express/CardController");

const app = express();

app.use(bodyParser.json());
app.use("/cards", cardRoutes);

module.exports = app;
