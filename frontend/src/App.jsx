import React from "react";
import Quizz from "./components/Quizz";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Quizz />
    </>
  );
}

export default App;
