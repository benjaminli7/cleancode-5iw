import React, { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { toast } from "sonner";

const AddQuestion = ({ handleAddQuestion, handleCloseModal }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) {
      toast.error("Please fill in both the question and answer fields.");
      return;
    }
    const questionData = {
      question,
      answer,
      tag: tag || "",
    };

    handleCloseModal();
    await handleAddQuestion(questionData);
    setQuestion("");
    setAnswer("");
    setTag("");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        p: 4,
        backgroundColor: "#fff",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Add a New Question
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Question"
          variant="outlined"
          color="primary"
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <TextField
          label="Answer"
          variant="outlined"
          required
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <TextField
          label="Tag (Optional)"
          variant="outlined"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Question
        </Button>
      </Box>
    </Container>
  );
};

export default AddQuestion;
