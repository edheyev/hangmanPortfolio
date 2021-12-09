import React from "react";

const GuessedLetters = ({ guessedLetters }) => {
  return (
    <>
      <h1>Guessed Letters:</h1>
      <ul>
        {guessedLetters.map((letter, i) => {
          return <li key={i}>{letter}</li>;
        })}
      </ul>
    </>
  );
};

export default GuessedLetters;
