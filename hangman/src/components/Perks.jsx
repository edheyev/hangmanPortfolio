import React, { useState } from "react";
import "../styles/Perks.css";

const Perks = ({
  perks,
  setPerks,
  setCurrentWord,
  setTotalScore,
  setHangmanCount,
  currentlyGuessing,
}) => {
  const hintPerk = () => {
    if (currentlyGuessing) {
      if (!perks.hintPerk) {
        setPerks((prevPerks) => {
          return { ...prevPerks, hintPerk: true };
        });
      }
    }
  };
  const firstAndLastLetterPerk = () => {
    if (currentlyGuessing) {
      if (!perks.firstAndLastLetter) {
        setCurrentWord((prevCurrentWord) => {
          const newWordState = { ...prevCurrentWord };

          const letters = Object.keys(newWordState.letters);

          const wordArr = newWordState.word.split("");

          newWordState.letters[letters[0]] = true;
          newWordState.letters[wordArr[wordArr.length - 1]] = true;

          return newWordState;
        });
        setHangmanCount((prevCount) => prevCount - 5);

        setPerks((prevPerks) => {
          return { ...prevPerks, firstAndLastLetter: true };
        });
      }
    }
  };
  const skipWordPerk = () => {
    if (currentlyGuessing) {
      if (!perks.skipWord) {
        console.log("skipWord perk");
        setCurrentWord((prevCurrentWord) => {
          const newWordState = { ...prevCurrentWord };

          Object.keys(newWordState.letters).forEach(
            (letter) => (newWordState.letters[letter] = true)
          );

          return newWordState;
        });
        setTotalScore((prevScore) => {
          return prevScore - 10;
        });

        setPerks((prevPerks) => {
          return { ...prevPerks, skipWord: true };
        });
      }
    }
  };

  return (
    <div className="perks-container">
      <div className={`${!perks.hintPerk && "tooltip"}`}>
        <i
          onClick={hintPerk}
          className={`fas fa-lightbulb ${perks.hintPerk && "used"}`}
        >
          <span
            className={`${!perks.hintPerk ? "tooltiptext" : "tooltipdisabled"}`}
          >
            <p>Use this perk to get a hint about the word.</p>
            <p>
              <strong>This perk will cost you 3 points</strong>
            </p>
            <p>
              <i>You have 10 seconds to read the hint after will disappear</i>
            </p>
          </span>
        </i>
      </div>
      <div className={`${!perks.skipWord && "tooltip"}`}>
        <i
          onClick={skipWordPerk}
          className={`fas fa-forward ${perks.skipWord && "used"}`}
        >
          <span
            className={`${!perks.skipWord ? "tooltiptext" : "tooltipdisabled"}`}
          >
            <p>Use this perk to reveal the entire word </p>
            <p>
              <strong>This perk can be used only once per game!</strong>
            </p>
            <p>
              <strong>This perk will cost you 10 points</strong>
            </p>
          </span>
        </i>
      </div>

      <div className={`${!perks.firstAndLastLetter && "tooltip"}`}>
        <i
          onClick={firstAndLastLetterPerk}
          className={`fas fa-text-width ${perks.firstAndLastLetter && "used"}`}
        >
          <span
            className={`${
              !perks.firstAndLastLetter ? "tooltiptext" : "tooltipdisabled"
            }`}
          >
            <p>Reveal first and last letter</p>
            <p>
              <strong>To use this perk, it will cost you 5 points</strong>
            </p>
          </span>
        </i>
      </div>
    </div>
  );
};

export default Perks;
