const express = require("express");
const cardRoutes = require("./interfaces/express/CardController");

const app = express();

app.use(express.json());
app.use("/cards", cardRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8080");
});
module.exports = app;
