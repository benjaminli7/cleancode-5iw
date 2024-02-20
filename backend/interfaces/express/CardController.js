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
  try {
    const newCard = await cardService.createCard(req.body);
    res.status(201).json(newCard);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the card.");
  }
});

router.get("/quizz", async (req, res) => {
  try {
    const cardsQuizz = await cardService.getCardsQuizz();
    res.json(cardsQuizz);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the quizz cards.");
  }
});

router.patch("/:cardId/answer", async (req, res) => {
  try {
    const { cardId } = req.params;
    const answer = req.body;
    const updatedCard = await cardService.answerCard(cardId, answer);
    res.status(204).json(updatedCard);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while answering the card.");
  }
});

module.exports = router;
