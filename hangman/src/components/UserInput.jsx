import React, { useState, useRef } from "react";
import Button from "./Button";
import Message from "./Message";
import "../styles/UserInput.css";

const UserInput = ({
  currentLetter,
  setCurrentLetter,
  currentlyGuessing,
  guessedLetters,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const inputRef = useRef();

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    const regex = /[a-z]/gi;

    event.preventDefault();
    if (guessedLetters.includes(inputValue)) {
      setErrorInput("Letter already guessed! Try another one");
      setInputValue("");
      inputRef.current.focus();
      return;
    }
    if (inputValue.length > 0 && inputValue.match(regex)) {
      setCurrentLetter(inputValue);
      setErrorInput("");
      setInputValue("");
    } else {
      setErrorInput("Please provide only letters");
    }
    inputRef.current.focus();
  };

  return (
    <>
      <Message text={errorInput} hidden={errorInput.length <= 0 && "hidden"} />
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
    </>
  );
};

export default UserInput;
