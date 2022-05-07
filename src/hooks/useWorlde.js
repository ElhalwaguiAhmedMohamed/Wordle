import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a:'green', b:'yellow',c:'grey'};

  // format a guess into an array of letter objects
  // e.g. [{key: 'a' , color:'yellow}]
  const formatGuess = () => {
    const solutionArray = [...solution];
    const foramttedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    // find ant green letters
    foramttedGuess.forEach((letterObj, index) => {
      if (solutionArray[index] === letterObj.key) {
        letterObj.color = "green";
        solutionArray[index] = null;
      }
    });

    // find any yellow letters
    foramttedGuess.forEach((letterObj, index) => {
      if (solutionArray.includes(letterObj.key)) {
        // && letterObj.color !== "green"
        letterObj.color = "yellow";
        solutionArray[solution.indexOf(letterObj.key)] = null;
      }
    });

    return foramttedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (foramttedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = foramttedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      foramttedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];

        if (letter.color === "green") {
          newKeys[letter.key] = "green";
          return;
        }
        if (letter.color === "yellow" && currentColor !== "green") {
          newKeys[letter.key] = "yellow";
          return;
        }
        if (
          letter.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[letter.key] = "grey";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log("you used all of your guesses");
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("you already tried that word");
        return;
      }
      // word must be 5 characters long
      if (currentGuess.length < 5) {
        console.log("guessed word must be 5 chars long");
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
      console.log(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
    }
    if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys };
};

export default useWordle;
