import { useState } from "react";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.instructions}>
        <h3>Assembly: Endgame</h3>
        <p className={styles.secondary}>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </div>
      <div>
        <p>“Yay lots of choice, the world is safe”</p>
      </div>
    </>
  );
}

export default App;
