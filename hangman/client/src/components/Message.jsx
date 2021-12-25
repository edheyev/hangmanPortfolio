import React, { useEffect, useState } from "react";
import "../styles/Message.css";

const Message = ({ text, hidden, positive, hint }) => {
  const [hideHint, setHideHint] = useState(false);

  useEffect(() => {
    if (hint) {
      setTimeout(() => {
        setHideHint(true);
      }, 10000);
    }
  }, [hint]);

  return (
    <div
      className={`message ${hidden} ${positive && "positive"} ${hint && "hint"}
      ${hideHint && "hidden"}`}
    >
      {text}
    </div>
  );
};

export default Message;
