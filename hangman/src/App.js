import { useState } from "react";
import GuessedLetters from "./components/GuessedLetters";
import Hangman from "./components/Hangman";
import Message from "./components/Message";
import Progression from "./components/Progression";
import Score from "./components/Score";
import UserInput from "./components/UserInput";
import Word from "./components/Word";
import "./styles/App.css";

function App() {
  const [words, setWords] = useState(["banana", "cat"]);
  const [currentWord, setCurrentWord] = useState({});

  return (
    <main>
      <div className="left_side">
        <GuessedLetters />
      </div>
      <div className="center">
        <Word
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
          words={words}
        />
        <Hangman />
        <Message />
        <UserInput />
      </div>
      <div className="right_side">
        <Progression />
        <Score />
      </div>
    </main>
  );
}
export default App;
