import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = ({ size }) => {
  // board will have possible values of null, X, O
  const [board, setBoard] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(null))
  );
  // makes an assumption that X always starts the game
  const [isXNext, setIsXNext] = useState(true);
  // possible states - null, X, O
  const [winner, setWinner] = useState(null);

  const handleClick = (rowIndex, columnIndex) => {
    // ignore if already filled
    if (board[rowIndex][columnIndex]) {
      return;
    }

    // deep copy for immutability
    const newBoard = board.map((row) => [...row]);
    const player = isXNext ? "X" : "O";
    newBoard[rowIndex][columnIndex] = player;
    setBoard(newBoard);

    // calculateWinner

    // only if winner is not found yet. Otherwise stop!
    setIsXNext((prev) => !prev);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return row.map((cell, columnIndex) => {
          return (
            <button
              className="cell"
              key={`${rowIndex}:${columnIndex}`}
              onClick={() => handleClick(rowIndex, columnIndex)}
            >
              {cell}
            </button>
          );
        });
      })}
    </div>
  );
};

export default TicTacToe;
