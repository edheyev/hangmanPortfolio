import React, { useEffect } from "react";
import Letter from "./Letter";
import "../styles/Word.css";
const axios = require("axios");

const Word = ({
  currentWord,
  setCurrentWord,
  words,
  currentLetter,
  loading,
}) => {
  useEffect(() => {
    if (!loading > 0) {
      console.log("words", words, words[0]);
    }
    const wordArray = words[0]?.word.split("");

    const wordObject = {
      word: words[0]?.word,
      letters: {},
      definition: words[0]?.definition,
    };

    wordArray.forEach((letter) => {
      wordObject.letters[letter] = false;
    });

    // axios
    //   .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordObject.word}`)
    //   .then((result) => {
    //     wordObject.definition =
    //       result.data[0].meanings[0].definitions[0]?.definition;
    //     console.log(result.data[0]);
    //     setCurrentWord(wordObject);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
