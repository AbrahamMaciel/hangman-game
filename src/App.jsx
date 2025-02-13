import { useState } from "react";
import styles from "./App.module.css";
import { languages } from "./languages.js";
import clsx from "clsx";

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

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  console.log(wrongGuessCount);
  console.log("over: ", isGameLost);
  console.log("won: ", isGameWon);

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

        <div className={`${styles.statusMessage} ${styles.victory}`}>
          <h2>You Win!</h2>
          <p>Well done! 🎉</p>
        </div>
      </header>

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
