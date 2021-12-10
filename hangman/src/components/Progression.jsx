import React from "react";
import "../styles/Progression.css";

const Progression = ({ completedWords }) => {
  return (
    <div>
      <h3>Completed Words</h3>
      <p class="guessedList">
        {completedWords.map((word, i) => {
          return <p key={i}>{word}</p>;
        })}
      </p>
    </div>
  );
};

export default Progression;
