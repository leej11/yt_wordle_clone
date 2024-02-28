import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, setGameOver, correctWord, currAttempt } =
    useContext(AppContext);

  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "You Correctly guessed" : "You failed"}</h3>
      <h1>Correct: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guess in {currAttempt.attempt} attemps</h3>
      )}
    </div>
  );
}

export default GameOver;
