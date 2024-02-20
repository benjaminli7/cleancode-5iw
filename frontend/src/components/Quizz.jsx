import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizzCard from "./QuizzCard.jsx";
import {
  Container,
  Typography,
  Box,
  Button,
  Modal,
  Paper,
} from "@mui/material";
import { toast } from "sonner";
import AddQuestion from "./AddQuestion.jsx";

const Quizz = () => {
  const [groupedCards, setGroupedCards] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const fetchAndGroupQuizCards = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cards/quizz");
      const grouped = groupCardsByCategory(response.data);
      setGroupedCards(grouped);
    } catch (error) {
      toast.error("Error fetching quiz cards");
      console.error("Error fetching quiz cards", error);
    }
  };

  const handleAddQuestion = async (questionData) => {
    try {
      await axios.post("http://localhost:8080/cards", questionData);
      fetchAndGroupQuizCards();
      toast.success("Question added successfully!");
    } catch (error) {
      toast.error("Error adding question");
      console.error("Error adding question", error);
    }
  };

  useEffect(() => {
    fetchAndGroupQuizCards();
  }, []);

  const handleAnswerSubmit = async (answer, card) => {
    try {
      await axios.patch(`http://localhost:8080/cards/${card.id}/answer`, {
        isValid: answer == card.answer,
      });
      fetchAndGroupQuizCards();
      if (answer != card.answer) {
        toast("The correct answer was: " + card.answer, { duration: 5000 });
      } else {
        toast.success("Correct answer!");
      }
    } catch (error) {
      toast.error("Error submitting answer");
      console.error("Error submitting answer", error);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <Button variant="contained" onClick={handleOpenModal}>
          Add Question
        </Button>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          variant="contained"
        >
          <AddQuestion
            handleCloseModal={handleCloseModal}
            handleAddQuestion={handleAddQuestion}
          />
        </Modal>
      </Box>
      {Object.keys(groupedCards).length ? (
        Object.entries(groupedCards).map(([category, cards]) => (
          <Paper elevation={3} key={category} sx={{ my: 2, p: 2 }}>
            <Typography variant="h5">{category}</Typography>
            <Box
              sx={{
                maxHeight: "60vh",
                overflowY: "auto",
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              {cards.map((card) => (
                <QuizzCard
                  key={card.id}
                  card={card}
                  onAnswerSubmit={handleAnswerSubmit}
                />
              ))}
            </Box>
          </Paper>
        ))
      ) : (
        <Typography>No cards due for review.</Typography>
      )}
    </Container>
  );
};

export default Quizz;

function groupCardsByCategory(cards) {
  return cards.reduce((acc, card) => {
    if (!acc[card.category]) {
      acc[card.category] = [];
    }
    acc[card.category].push(card);
    return acc;
  }, {});
}
