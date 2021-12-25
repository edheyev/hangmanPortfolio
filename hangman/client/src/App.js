import { useState, useEffect } from "react";
import axios from "axios";

import Button from "./components/Button";
import GuessedLetters from "./components/GuessedLetters";
import Hangman from "./components/Hangman";
import Message from "./components/Message";
import Progression from "./components/Progression";
import Score from "./components/Score";
import UserInput from "./components/UserInput";
import Word from "./components/Word";
import "./styles/App.css";

import { getRandomWords } from "./utils/reqOptions";

import Perks from "./components/Perks";

function App() {
  const [words, setWords] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentLetter, setCurrentLetter] = useState("");
  const [hangmanCount, setHangmanCount] = useState(10);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wordComplete, setWordComplete] = useState(false);
  const [currentlyGuessing, setCurrentlyGuessing] = useState(true);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWords();
  }, []);

  const [perks, setPerks] = useState({
    hintPerk: false,
    firstAndLastLetter: false,
    skipWord: false,
  });

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
    if (currentWord && !loading) {
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

  const getWords = async () => {
    const wordsArray = [];
    const words = await getRandomWords();

    for (const word of words) {
      wordsArray.push(word.word);
    }
    console.log(wordsArray, "******");
    if (words) {
      setWords(wordsArray);
      setLoading(false);
    }
  };

  const resetPerksNewWord = () => {
    setPerks((prevPerks) => {
      return { ...prevPerks, hintPerk: false, firstAndLastLetter: false };
    });
  };
  const resetPerksNewGame = () => {
    setPerks({ skipWord: false, hintPerk: false, firstAndLastLetter: false });
  };

  const scoreUp = (points) => {
    setTotalScore((prevScore) => prevScore + points);
  };

  const initGame = () => {
    console.log("game initialised");
    getWords();
    if (!loading) {
      // setWords([...wordsArray]);
      setCurrentWord(null);
      setHangmanCount(10);
      setGuessedLetters([]);
      setGameOver(false);
      setCurrentlyGuessing(true);
      setTotalScore(0);
      resetPerksNewGame();
      // setWordComplete(false);}
    }
  };

  const nextWord = () => {
    scoreUp(hangmanCount);
    setWords((prevWords) => {
      const newWords = [...prevWords];
      newWords.shift();
      return newWords;
    });
    setGameOver(false);
    setWordComplete(false);
    setCurrentlyGuessing(true);
    setGuessedLetters([]);
    setHangmanCount(10);
    resetPerksNewWord();
  };

  return (
    <main>
      {loading ? (
        "loading...."
      ) : (
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
              loading={loading}
            />
            <Hangman hangmanCount={hangmanCount} />
            {gameOver && (
              <div className="msg-btn">
                <Message text="GAME OVER" />
                <Button text="Play again?" func={initGame} />
              </div>
            )}
            {wordComplete && (
              <div className="msg-btn">
                <Message text="You guessed it!" positive={true} />
                <Button text="Continue..." func={nextWord} />
              </div>
            )}
            {perks.hintPerk && currentWord.definition !== null && (
              <Message text={currentWord.definition} hint={true} />
            )}
            <UserInput
              guessedLetters={guessedLetters}
              currentLetter={currentLetter}
              setCurrentLetter={setCurrentLetter}
              currentlyGuessing={currentlyGuessing}
            />
          </div>
          <div className="right_side">
            <Progression words={words} gameOver={gameOver} />
            <Score totalScore={totalScore} />
            <Perks
              setTotalScore={setTotalScore}
              perks={perks}
              setPerks={setPerks}
              setCurrentWord={setCurrentWord}
              currentWord={currentWord}
              setHangmanCount={setHangmanCount}
              currentlyGuessing={currentlyGuessing}
            />
          </div>
        </div>
      )}
    </main>
  );
}
export default App;
