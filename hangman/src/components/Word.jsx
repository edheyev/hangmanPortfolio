import React, { useEffect } from "react";
import Letter from "./Letter";
import "../styles/Word.css";
const axios = require("axios");

const Word = ({ currentWord, setCurrentWord, words, currentLetter }) => {
  useEffect(() => {
    const wordArray = words[0].split("");

    const wordObject = {
      word: words[0],
      letters: {},
    };

    wordArray.forEach((word) => {
      wordObject.letters[word] = false;
    });
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordObject.word}`)
      .then((result) => {
        wordObject.definition =
          result.data[0].meanings[0].definitions[0].definition;
        setCurrentWord(wordObject);
      })
      .catch((err) => {});
  }, [words]);
  return (
    <div className="word">
      {currentWord &&
        currentWord.word.split("").map((letter, i) => {
          return (
            <Letter
              key={i}
              letter={letter}
              guessed={currentWord.letters[letter]}
            />
          );
        })}
    </div>
  );
};

export default Word;
