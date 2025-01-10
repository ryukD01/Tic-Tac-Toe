import React, { useState, useEffect } from 'react';
import './App.css';

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turnO, setTurnO] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    checkWinner(board);
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = turnO ? 'O' : 'X';
    setBoard(newBoard);
    setTurnO(!turnO);
  };

  const checkWinner = (currentBoard) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        setWinningCells([a, b, c]);
        return;
      }
    }

    // Check for draw
    if (currentBoard.every(cell => cell !== '')) {
      setIsDraw(true);
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(''));
    setTurnO(true);
    setWinner(null);
    setWinningCells([]);
    setIsDraw(false);
  };

  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>
      {(winner || isDraw) && (
        <div className="win show">
          <h2 className="win-annc">
            {isDraw 
              ? "It's a draw!" 
              : `Congratulation!! ${winner} is the winner`}
          </h2>
          <button id="new-game" onClick={reset}>New Game</button>
        </div>
      )}
      <div className={`container ${winner || isDraw ? 'hide' : ''}`}>
        <div className="box">
          {board.map((cell, index) => (
            <button
              key={index}
              className={`btn ${winningCells.includes(index) ? 'winning' : ''}`}
              onClick={() => handleClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
      <button id="reset-btn" className={winner || isDraw ? 'hide' : ''} onClick={reset}>Reset</button>
    </div>
  );
}

export default App;

