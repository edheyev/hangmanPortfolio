import React from "react";

import Sketch from "react-p5";
import "../styles/Progression.css";

const Progression = ({ words, gameOver }) => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(100, 600).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.stroke("#355070");
    p5.strokeWeight(10);
    p5.frameRate(200);

    if (words.length === 11) {
      p5.background("#B56576");
    }

    //vertical line
    p5.line(50, 570, 50, 30);

    //-------------------------------------

    //top line
    if (words.length <= 1) {
      if (words.length === 1) {
        p5.stroke("green");
      }
      if (gameOver && words.length === 1) p5.stroke("red");

      p5.line(40, 30, 60, 30);
    }
    p5.stroke("#355070");

    //-------------------------------------

    if (words.length <= 2) {
      if (words.length === 2) {
        p5.stroke("green");
      }
      p5.line(40, 84, 60, 84);
    }
    if (gameOver && words.length === 2) p5.stroke("red");

    p5.stroke("#355070");

    //-------------------------------------

    if (words.length <= 3) {
      if (words.length === 3) {
        p5.stroke("green");
      }
      if (gameOver && words.length === 3) p5.stroke("red");

      p5.line(40, 138, 60, 138);
    }
    p5.stroke("#355070");

    //-------------------------------------

    if (words.length <= 4) {
      if (words.length === 4) {
        p5.stroke("green");
      }
      if (gameOver && words.length === 4) p5.stroke("red");

      p5.line(40, 192, 60, 192);
    }
    p5.stroke("#355070");

    //-------------------------------------

    if (words.length <= 5) {
      if (words.length === 5) {
        p5.stroke("green");
      }
      if (gameOver && words.length === 5) p5.stroke("red");

      p5.line(40, 246, 60, 246);
    }
    p5.stroke("#355070");

    //-------------------------------------

    if (words.length <= 6) {
      if (words.length === 6) {
        p5.stroke("green");
      }
      if (gameOver && words.length === 6) p5.stroke("red");

      p5.line(40, 300, 60, 300);
    }
    p5.stroke("#355070");

    //-------------------------------------

    if (words.length <= 7) {
      if (words.length === 7) {
        p5.stroke("green");
      }
      if (gameOver && words.length === 7) p5.stroke("red");

      p5.line(40, 354, 60, 354);
    }
    p5.stroke("#355070");

    //-------------------------------------

    if (words.length <= 8) {
      if (words.length === 8) {
        p5.stroke("green");
      }
      if (gameOver && words.length === 8) p5.stroke("red");

      p5.line(40, 408, 60, 408);
    }
    p5.stroke("#355070");

    //-------------------------------------

    if (words.length <= 9) {
      if (words.length === 9) {
        p5.stroke("green");
      }
      if (gameOver && words.length === 9) p5.stroke("red");
      p5.line(40, 462, 60, 462);
    }
    p5.stroke("#355070");

    //-------------------------------------

    if (words.length <= 10) {
      if (words.length === 10) {
        p5.stroke("green");
      }
      if (gameOver && words.length === 10) p5.stroke("red");

      p5.line(40, 516, 60, 516);
    }
    p5.stroke("#355070");

    //-------------------------------------

    //bottom line
    if (words.length <= 11) {
      if (words.length === 11) {
        p5.stroke("green");
      }
      if (gameOver && words.length === 11) p5.stroke("red");

      p5.line(40, 570, 60, 570);
    }
  };

  return (
    <div className="sketch">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Progression;
