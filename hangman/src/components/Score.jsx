import React from "react";

const Score = ({ currentScore, currentMaxScore }) => {
  return (
    <div>
      <h3>SCORE</h3>
      <div>
        {currentScore}/{currentMaxScore}
      </div>
    </div>
  );
};

export default Score;
