import { DRAW } from "./constants";

/**
 * util to calculate if the current player is a winner after making the move
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @param {string} player
 * @param {*} newBoard
 * @returns
 */
export const calculateWinner = (
  rowIndex,
  columnIndex,
  player,
  size,
  newBoard
) => {
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

    // Exit early if a win is found
    if (!winRow && !winCol && !winDiag && !winRevDiag) {
      break;
    }
  }

  if (winRow || winCol || winDiag || winRevDiag) {
    return player;
  }

  if (newBoard.flat().every((cell) => cell)) {
    return DRAW;
  }
};
