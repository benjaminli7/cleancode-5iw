// src/components/QuizCard.js
import React, { useState } from 'react';
import axios from 'axios';

const QuizzCard = ({ card, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/cards/${card.id}/answer`, { isValid: answer === card.answer });
      onAnswerSubmit();
    } catch (error) {
      console.error('Error submitting answer', error);
    }
  };

  return (
    <div>
      <h2>{card.question}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuizzCard;
