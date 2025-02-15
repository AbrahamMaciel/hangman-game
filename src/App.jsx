import { useState } from "react";
import styles from "./App.module.css";
import { languages } from "./languages.js";
import clsx from "clsx";
import { getFarewellText } from "./utils.js";

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameLost = wrongGuessCount >= languages.length - 1;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameOver = isGameLost || isGameWon;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];

  const isLastGuessWrong =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // This should give as basis the class statusMessage and the other 3 depending of their current value, though i dont know yet how would i have to use it with css modules since is a bit different, maybe a join.
  const statusMessageClass = clsx({
    warning: !isGameOver && isLastGuessWrong,
    victory: isGameWon,
    defeat: isGameLost,
  });

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Helper function
  function renderGameStatus() {
    if (isGameOver) {
      if (isGameWon) {
        return (
          <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </>
        );
      } else if (isGameLost) {
        return (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        );
      }
    } else {
      if (isLastGuessWrong) {
        return (
          <>
            <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
          </>
        );
      } else {
        return (
          <>
            <h2>All's good!</h2>
            <p>Yay lots of choice, the world is safe!</p>
          </>
        );
      }
    }
  }

  // console.log(wrongGuessCount);
  // console.log("over: ", isGameLost);
  // console.log("won: ", isGameWon);
  // console.log("lastguessiswrong?: ", isLastGuessWrong);
  // console.log("statusMessageClass/es: ", statusMessageClass);

  function registerLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const languageElements = languages.map((langObj, index) => {
    const chipStyles = {
      backgroundColor: langObj.backgroundColor,
      color: langObj.color,
    };

    return (
      <span
        style={chipStyles}
        className={[
          styles.chip,
          index < wrongGuessCount ? styles.lost : null,
        ].join(" ")}
        key={langObj.name}
      >
        {langObj.name}
      </span>
    );
  });

  const lettersElements = currentWord.split("").map((letter, index) => {
    return (
      <span key={index} className={styles.letter}>
        {guessedLetters.includes(letter) ? letter.toUpperCase() : null}
      </span>
    );
  });

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    const keyClassName = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        // This is a way i found to add the classnames since using template literals didnt work with styles.keyClassName
        className={[styles.key, styles[keyClassName]].join(" ")}
        key={letter}
        onClick={() => registerLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <>
      <header className={styles.instructions}>
        <h3>Assembly: Endgame</h3>
        <p className={styles.secondary}>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <section
        className={[styles.statusMessage, styles[statusMessageClass]].join(" ")}
      >
        {renderGameStatus()}
      </section>

      <section className={styles.languageChips}>{languageElements}</section>

      <section className={styles.word}>{lettersElements}</section>

      <section className={styles.keyboard}>{keyboardElements}</section>

      {isGameOver && (
        <button type="button" className={styles.newGameBtn}>
          New Game
        </button>
      )}
    </>
  );
}

export default App;
