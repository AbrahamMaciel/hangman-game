import { useState } from "react";
import styles from "./App.module.css";
import { languages } from "./languages.js";

function App() {
  const [currentWord, setCurrentWord] = useState("react");

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const languageElements = languages.map((langObj) => {
    const chipStyles = {
      backgroundColor: langObj.backgroundColor,
      color: langObj.color,
    };
    return (
      <span style={chipStyles} className={styles.chip} key={langObj.name}>
        {langObj.name}
      </span>
    );
  });

  const lettersElements = currentWord.split("").map((letter, index) => (
    <span key={index} className={styles.letter}>
      {letter.toUpperCase()}
    </span>
  ));

  const keyboardElements = alphabet.split("").map((letter) => (
    <button className={styles.key} key={letter}>
      {letter.toUpperCase()}
    </button>
  ));

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

      <button type="button" className={styles.newGameBtn}>
        New Game
      </button>
    </>
  );
}

export default App;
