import React from "react";
import Sketch from "react-p5";
import "../styles/Hangman.css";

let x = 50;
let y = 50;
let baseLine = 120;
let vertLine = 490;
let upLine = 200;
let noLine = 100;
let headSize = 0;
let bodyLine = 195;
let arm1X = 320;
let arm2X = 320;
let arm1Y = 200;
let arm2Y = 200;
let leg1X = 320;
let leg2X = 320;
let leg1Y = 300;
let leg2Y = 300;

export default ({ hangmanCount }) => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.stroke("#355070");

    p5.strokeWeight(10);

    let baselineStop = 380;
    let baseY = 490;
    p5.frameRate(200);

    if (hangmanCount <= 10) {
      p5.background("#B56576");
    }
    if (hangmanCount <= 9) {
      p5.line(120, baseY, baseLine, baseY);
      if (baseLine < baselineStop) {
        baseLine += 15;
      }
    }
    if (hangmanCount <= 8) {
      //vertical line
      p5.line(200, 490, 200, vertLine);
      if (vertLine > 100) {
        vertLine -= 15;
      }
    }
    if (hangmanCount <= 7) {
      //upper cross
      p5.line(200, 100, upLine, 100);
      if (upLine < 320) {
        upLine += 15;
      }
    }
    if (hangmanCount <= 6) {
      //noose
      p5.line(320, 100, 320, noLine);
      if (noLine < 140) {
        noLine += 15;
      }
    }
    if (hangmanCount <= 5) {
      //head
      p5.fill("#B56576");
      p5.ellipse(320, 170, headSize, headSize);
      if (headSize < 50) {
        headSize += 15;
      }
    }
    if (hangmanCount <= 4) {
      //body
      p5.line(320, 195, 320, bodyLine);
      if (bodyLine < 300) {
        bodyLine += 15;
      }
    }
    if (hangmanCount <= 3) {
      //arm1
      p5.line(320, 200, arm1X, arm1Y);
      if (arm1X > 270) {
        arm1X -= 15;
        arm1Y += 15;
      }
    }
    if (hangmanCount <= 2) {
      //arm2
      p5.line(320, 200, arm2X, arm2Y);
      if (arm2X < 370) {
        arm2X += 15;
        arm2Y += 15;
      }
    }
    if (hangmanCount <= 1) {
      //leg1
      p5.line(320, 300, leg1X, leg1Y);
      if (leg1X > 270) {
        leg1X -= 15;
        leg1Y += 15;
      }
    }
    if (hangmanCount <= 0) {
      //leg2
      p5.line(320, 300, leg2X, leg2Y);
      if (leg2X < 370) {
        leg2X += 15;
        leg2Y += 15;
      }
    }
  };

  return (
    <div className="hangman-container">
      <p>
        {hangmanCount} {hangmanCount === 1 ? "try" : "tries"} left...
      </p>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};
