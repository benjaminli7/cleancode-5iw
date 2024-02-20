const express = require("express");
const cardRoutes = require("./interfaces/express/CardController");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use("/cards", cardRoutes);

app.use(cors());

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
module.exports = app;
