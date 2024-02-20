import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const QuizzCard = ({ card, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      onAnswerSubmit(answer, card);
    } catch (error) {
      console.error("Error submitting answer", error);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 275, marginBottom: 2, position: "relative" }}
    >
      {/* Tag positioned at the top right */}
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <Chip label={card.tag} color="primary" />
      </Box>

      <CardContent>
        <Typography variant="h5" component="div">
          {card.question}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="answer"
            label="Your Answer"
            name="answer"
            autoFocus
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizzCard;
