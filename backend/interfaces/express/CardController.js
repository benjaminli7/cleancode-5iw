const express = require("express");
const router = express.Router();

// Mock data and handlers for demonstration
router.get("/", (req, res) => {
  res.json([]); // Return an empty array for now
});

router.post("/", (req, res) => {
  res.status(201).json(req.body); // Echo back the new card for simplicity
});

router.get("/quizz", (req, res) => {
  res.json([]); // Return an empty array for now
});

router.patch("/:cardId/answer", (req, res) => {
  res.status(204).end(); // Just send back a 204 No Content for simplicity
});

module.exports = router;
