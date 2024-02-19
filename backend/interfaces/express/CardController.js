// src/routes/cardRoutes.js
const express = require("express");
const router = express.Router();
const CardService = require("../../domain/card/CardService");
const CardRepository = require("../../domain/card/CardRepository");

const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);

router.get("/", async (req, res) => {
  const { tags } = req.query;
  try {
    console.log(tags);
    const filteredCards = await cardService.getAllCards(
      tags ? tags.split(",") : null
    );
    res.json(filteredCards);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the cards.");
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const newCard = await cardService.createCard(req.body);

  res.status(201).json(newCard);
});

router.get("/quizz", async (req, res) => {
  res.json([]);
});

router.patch("/:cardId/answer", async (req, res) => {
  res.status(204).end();
});

module.exports = router;
