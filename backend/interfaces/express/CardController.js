const express = require("express");
const router = express.Router();
const CardService = require("../../domain/card/CardService");
const { v4: uuidv4 } = require('uuid');
const cardService = new CardService();

router.get("/", async (req, res) => {
  try {
    const cards = await cardService.getAllCards();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { category, question, answer, tag } = req.body;
    const id = uuidv4();

    const newCard = await cardService.createCard({
      id,
      category,
      question,
      answer,
      tag,
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/quizz", async (req, res) => {
  try {
    const cards = await cardService.getAllCards();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
