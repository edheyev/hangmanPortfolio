import React, { useState } from "react";

const UserInput = ({ currentLetter, setCurrentLetter }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.length > 0) {
      setCurrentLetter(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="guessInput"
        value={inputValue}
        type="text"
        onChange={handleInput}
        maxLength="1"
      />
      <button type="submit">Guess</button>
    </form>
  );
};

export default UserInput;
