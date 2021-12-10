import React, { useState, useRef } from "react";
import Button from "./Button";
import "../styles/UserInput.css";
const UserInput = ({ currentLetter, setCurrentLetter, currentlyGuessing }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.length > 0) {
      setCurrentLetter(inputValue);
      setInputValue("");
    }
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="guessInput"
        value={inputValue}
        type="text"
        onChange={handleInput}
        maxLength="1"
        ref={inputRef}
        disabled={!currentlyGuessing}
      />
      <Button type="submit" text="Guess" disabled={!currentlyGuessing} />
    </form>
  );
};

export default UserInput;
