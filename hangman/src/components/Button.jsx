import React from "react";

const Button = ({ text, func }) => {
  return <button onClick={func}>{text}</button>;
};

export default Button;
