import React, { useState } from "react";
import "./TicTacToe.css";

const PLAYER_X = "X";
const PLAYER_O = "O";
const DRAW = "Draw";

const TicTacToe = ({ size }) => {
  // board will have possible values of null, X, O
  const [board, setBoard] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(null))
  );
  // makes an assumption that X always starts the game
  const [isXNext, setIsXNext] = useState(true);
  // possible states - null, X, O, Draw
  const [winner, setWinner] = useState(null);

  const calculateWinner = (rowIndex, columnIndex, player, newBoard) => {
    let winRow = true;
    let winCol = true;
    let winDiag = true;
    let winRevDiag = true;

    for (let i = 0; i < size; i++) {
      if (newBoard[rowIndex][i] !== player) {
        winRow = false;
      }
      if (newBoard[i][columnIndex] !== player) {
        winCol = false;
      }
      if (newBoard[i][i] !== player) {
        winDiag = false;
      }
      if (newBoard[i][size - 1 - i] !== player) {
        winRevDiag = false;
      }
    }

    if (winRow || winCol || winDiag || winRevDiag) {
      return player;
    }

    if (newBoard.flat().every((cell) => cell)) {
      return DRAW;
    }
  };

  const handleClick = (rowIndex, columnIndex) => {
    // ignore if already filled
    if (board[rowIndex][columnIndex] || winner) {
      return;
    }

    // deep copy for immutability
    const newBoard = board.map((row) => [...row]);
    const player = isXNext ? PLAYER_X : PLAYER_O;
    newBoard[rowIndex][columnIndex] = player;
    setBoard(newBoard);

    const gamer = calculateWinner(rowIndex, columnIndex, player, newBoard);

    if (gamer) {
      setWinner(gamer);
    } else {
      setIsXNext((prev) => !prev);
    }
  };

  return (
    <div>
      {!winner ? (
        <h3>Next Player: {isXNext ? PLAYER_X : PLAYER_O}</h3>
      ) : (
        <h1>Winner: {winner}</h1>
      )}
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
    </div>
  );
};

export default TicTacToe;
