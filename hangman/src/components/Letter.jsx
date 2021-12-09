import React from "react";
import "../styles/Letter.css";

const Letter = ({ letter, guessed }) => {
  return (
    <p className={guessed ? "guessed" : "not_guessed"}>
      {guessed ? letter : "_"}
    </p>
  );
};

export default Letter;
