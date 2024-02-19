const express = require("express");
const app = express();
const cardController = require("./interfaces/express/CardController");

app.use("/cards", cardController);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
