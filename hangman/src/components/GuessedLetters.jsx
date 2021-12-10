import React from "react";
import "../styles/GuessedLetters.css";
const GuessedLetters = ({ guessedLetters }) => {
  return (
    <div className="letters-container">
      <h3>Guessed Letters:</h3>
      <div className="letters">
        {guessedLetters.map((letter, i) => {
          return <p key={i}>{letter}</p>;
        })}
      </div>
    </div>
  );
};

export default GuessedLetters;
