import { useState, useEffect } from "react";
import Button from "./components/Button";
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
  const [currentWord, setCurrentWord] = useState(null);
  const [currentLetter, setCurrentLetter] = useState("");
  const [hangmanCount, setHangmanCount] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wordComplete, setWordComplete] = useState(false);

  useEffect(() => {
    if (currentWord) {
      const wordComplete = Object.values(currentWord.letters).every(
        (letter) => letter === true
      );
      if (wordComplete) {
        setWordComplete(true);
      }
    }
  }, [currentWord]);

  useEffect(() => {
    if (currentWord) {
      const letterArray = Object.keys(currentWord.letters);
      const letterIncluded = letterArray.includes(currentLetter);
      if (letterIncluded) {
        setCurrentWord((prevWordState) => {
          const newWordState = {
            ...prevWordState,
          };
          newWordState.letters[currentLetter] = true;
          return newWordState;
        });
      } else {
        setHangmanCount((prevCount) => {
          return prevCount + 1;
        });
      }

      setGuessedLetters((prevLetters) => {
        return [...prevLetters, currentLetter];
      });
    }
  }, [currentLetter]);

  const nextWord = () => {
    setWords((prevWords) => {
      const newWords = [...prevWords];
      newWords.shift();
      return newWords;
    });
    setWordComplete(false);
    setGuessedLetters([]);
    setHangmanCount(0);
  };

  return (
    <main>
      <div className="left_side">
        <GuessedLetters guessedLetters={guessedLetters} />
      </div>
      <div className="center">
        <Word
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
          words={words}
          currentLetter={currentLetter}
        />
        <Hangman hangmanCount={hangmanCount} />
        {wordComplete && (
          <div>
            <Message />
            <Button text="Continue..." func={nextWord} />
          </div>
        )}
        <UserInput
          currentLetter={currentLetter}
          setCurrentLetter={setCurrentLetter}
        />
      </div>
      <div className="right_side">
        <Progression />
        <Score />
      </div>
    </main>
  );
}
export default App;
