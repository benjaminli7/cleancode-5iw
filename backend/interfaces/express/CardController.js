// src/routes/cardRoutes.js
const express = require("express");
const router = express.Router();

// Sample mock data
const mockCards = [
  {
    id: "1",
    question: "What is pair programming?",
    answer: "A practice to work in pair on the same computer.",
    tag: "Teamwork",
    category: "FIRST",
  },
  {
    id: "2",
    question: "What is TDD?",
    answer: "Test Driven Development",
    tag: "Methodology",
    category: "SECOND",
  },
];

// Updated GET handler to filter cards by tags
router.get("/", (req, res) => {
  const { tags } = req.query;
  let filteredCards = mockCards;

  if (tags) {
    const tagsArray = tags.split(",");
    filteredCards = mockCards.filter((card) => tagsArray.includes(card.tag));
  }

  res.json(filteredCards);
});

router.post("/", (req, res) => {
  // Assuming body contains a valid card object
  const newCard = { ...req.body, id: Date.now().toString() }; // Simplified ID generation for example
  mockCards.push(newCard); // Add the new card to the mock data
  res.status(201).json(newCard);
});

router.get("/quizz", (req, res) => {
  res.json([]); // Return an empty array for demonstration
});

router.patch("/:cardId/answer", (req, res) => {
  res.status(204).end(); // Assume answer is recorded
});

module.exports = router;
