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

import Perks from "./components/Perks";

const wordsArray = [
  "banana",
  "cat",
  "telephone",
  "deer",
  "encyclopedia",
  "everest",
  "tyrannosaurus",
  "helicopter",
  "egypt",
  "mathematics",
  "piranha",
];

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

  useEffect(() => {
    if (words) {
      console.log("finished loading");
      // setLoading(false);
      // console.log(words[0]);
    }
  }, [words]);

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

  useEffect(() => {
    //definitions
    if (!loading) {
      // words.forEach((word) => {
      //   axios
      //     .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      //     .then((result) => {
      //       console.log(word);
      //       console.log(result.data[0].meanings[0].definitions[0].definition);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // });
    }
  }, [words]);

  const getWords = async () => {
    console.log("getting words");

    //words
    const words = await axios.get(
      "https://random-word-api.herokuapp.com/word?number=11"
    );
    // console.log(words);

    const wordsArray = [];
    words.data.forEach(async (word) => {
      // console.log(word);
      try {
        const wordDef = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        console.log(wordDef.data[0].meanings[0].definitions[0]?.definition);

        const thisWord = {
          word: word,
          definition: wordDef.data[0].meanings[0].definitions[0]?.definition,
        };
        wordsArray.push(thisWord);
      } catch (err) {}
    });
    // handle success
    setWords(wordsArray);
    console.log("GET WORDS", wordsArray, wordsArray[0]);
    setLoading(false);
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
            {perks.hintPerk && <Message text="This is a hint" hint={true} />}
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
