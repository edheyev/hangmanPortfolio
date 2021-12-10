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
  const [hangmanCount, setHangmanCount] = useState(10);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wordComplete, setWordComplete] = useState(false);
  const [currentlyGuessing, setCurrentlyGuessing] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (hangmanCount === 0) {
      setCurrentlyGuessing(false);
      setGameOver(true);
    }
  }, [hangmanCount]);

  useEffect(() => {
    if (currentWord) {
      const wordComplete = Object.values(currentWord.letters).every(
        (letter) => letter === true
      );
      if (wordComplete) {
        setCurrentlyGuessing(false);
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
          return prevCount - 1;
        });
      }

      setGuessedLetters((prevLetters) => {
        return [...prevLetters, currentLetter];
      });
    }
  }, [currentLetter]);

  const initGame = () => {
    //get 15 words into array

    const randomNum = Math.random() * 100000;
  };

  useEffect(() => {}, []);

  const nextWord = () => {
    setWords((prevWords) => {
      const newWords = [...prevWords];
      newWords.shift();
      return newWords;
    });
    setWordComplete(false);
    setCurrentlyGuessing(true);
    setGuessedLetters([]);
    setHangmanCount(10);
  };

  return (
    <main>
      <div className="container">
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
          {gameOver && (
            <div>
              <Message text="GAME OVER" />
              <Button text="Play again?" func={initGame} />
            </div>
          )}
          {wordComplete && (
            <div>
              <Message text="You guessed it!" />
              <Button text="Continue..." func={nextWord} />
            </div>
          )}
          <UserInput
            currentLetter={currentLetter}
            setCurrentLetter={setCurrentLetter}
            currentlyGuessing={currentlyGuessing}
          />
        </div>
        <div className="right_side">
          <Progression />
          <Score />
        </div>
      </div>
    </main>
  );
}
export default App;
