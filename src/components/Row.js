import React from "react";

export default function Row({ guess, currentGuess }) {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letterObj, index) => {
          return (
            <div key={index} className={letterObj.color}>
              {letterObj.key}
            </div>
          );
        })}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className="row current">
        {letters.map((letter, index) => {
          return (
            <div key={index} className="filled">
              {letter}
            </div>
          );
        })}
        {[...Array(5 - letters.length)].map((_, index) => {
          return <div key={index}></div>;
        })}
      </div>
    );
  }
  return (
    <>
      <div className="row">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
