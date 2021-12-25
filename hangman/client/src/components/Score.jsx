import React, { useState } from "react";
import "../styles/Score.css";

const Score = ({ totalScore }) => {
  return <div className="score">Total Score: {totalScore}</div>;
};

export default Score;
