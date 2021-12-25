import React from "react";
import "../styles/Button.css";

const Button = ({ text, func, type, disabled }) => {
  return (
    <button onClick={func} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
