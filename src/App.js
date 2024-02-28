import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import { createContext, useEffect, useState } from "react";
import GameOver from "./components/GameOver";

// We are making the 'context' globally available,
// so that Board and KeyBoard and App can have access to this
export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord.toUpperCase());
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;

    // Get the existing board via AppContext
    const newBoard = [...board];
    // Update the board with the key that was pressed
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    // Update
    setBoard(newBoard);
    // Update position on board
    setCurrentAttempt({
      attempt: currAttempt.attempt,
      letterPos: currAttempt.letterPos + 1,
    });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;

    // Get the existing board via AppContext
    const newBoard = [...board];
    // Update the board with the key that was pressed
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currAttempt,
      letterPos: currAttempt.letterPos - 1,
    });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord == correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 4) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Liam's Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
