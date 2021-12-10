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
const axios = require("axios");

function App() {
  const [words, setWords] = useState(["banana", "cat"]);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentLetter, setCurrentLetter] = useState("");
  const [hangmanCount, setHangmanCount] = useState(10);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wordComplete, setWordComplete] = useState(false);
  const [currentlyGuessing, setCurrentlyGuessing] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [completedWords, setCompletedWords] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentMaxScore, setCurrentMaxScore] = useState(0);

  useEffect(() => {
    getWords();
  }, []);

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

  useEffect(() => {
    words.forEach((word) => {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((result) => {
          console.log(word);
          console.log(result.data[0].meanings[0].definitions[0].definition);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [words]);

  const getWords = () => {
    axios
      .get("https://random-word-api.herokuapp.com/word?number=10")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setWords(response.data);
      });
  };

  // const getDef = async (word) => {
  //   const result = await axios.get(
  //     `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  //   );

  //   return result;
  // };

  const initGame = () => {
    //get 15 words into array
    // const randomNum = Math.random() * 100000;
    getWords();

    setWords(["banana", "cat"]);
    setGameOver(false);
    setCurrentScore(0);
    setCurrentMaxScore(0);
    setCompletedWords([]);
    setWordComplete(false);
    setCurrentlyGuessing(true);
    setGuessedLetters([]);
    setHangmanCount(10);
  };

  useEffect(() => {}, []);

  const nextWord = () => {
    setCurrentScore((prevSc) => {
      return (prevSc += hangmanCount);
    });
    setCurrentMaxScore((prevSc) => {
      return (prevSc += 10);
    });
    setCompletedWords((prevComWords) => {
      const newWords = [...prevComWords];
      newWords.push(currentWord.word);
      return newWords;
    });
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
            <div className="messages">
              <Message text="GAME OVER" />
              <Button text="Play again?" func={initGame} />
            </div>
          )}
          {wordComplete && (
            <div className="messages">
              <Message text="You guessed it!" />
              <Button className="continue" text="Continue..." func={nextWord} />
            </div>
          )}
          <UserInput
            currentLetter={currentLetter}
            setCurrentLetter={setCurrentLetter}
            currentlyGuessing={currentlyGuessing}
          />
        </div>
        <div className="right_side">
          <Progression completedWords={completedWords} />
          <Score
            currentScore={currentScore}
            currentMaxScore={currentMaxScore}
          />
        </div>
      </div>
    </main>
  );
}
export default App;
