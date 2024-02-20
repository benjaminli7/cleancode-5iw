// src/components/Quiz.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizzCard from "./QuizzCard.jsx";

const Quizz = () => {
  const [cards, setCards] = useState([]);

  const fetchQuizCards = async () => {
    try {
      const response = await axios.get("localhost:8080/cards/quizz");
    } catch (error) {
      console.error("Error fetching quiz cards", error);
    }
  };

  useEffect(() => {
    fetchQuizCards();
  }, []);

  const handleAnswerSubmit = () => {
    // Refresh cards after submitting an answer
    fetchQuizCards();
  };

  return (
    <div>
      {cards.length ? (
        cards.map((card) => (
          <QuizCard
            key={card.id}
            card={card}
            onAnswerSubmit={handleAnswerSubmit}
          />
        ))
      ) : (
        <p>No cards due for review today.</p>
      )}
    </div>
  );
};

export default Quizz;
