import React, { useEffect } from "react";

const Word = ({ currentWord, setCurrentWord, words }) => {
  //initialise word from words
  const exampleWord = {
    word: "cat",
    letters: { c: false, a: false, t: false },
  };
  useEffect(() => {
    setCurrentWord(exampleWord);
  }, []);

  //display current word

  return <div></div>;
};

export default Word;
