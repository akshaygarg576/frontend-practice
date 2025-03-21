import { useCallback, useState } from "react";
import { PLAYER_O, PLAYER_X } from "./constants";
import { calculateWinner } from "./utils";

const useTicTacToe = (size) => {
  const [board, setBoard] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(null))
  );
  // makes an assumption that X always starts the game
  const [isXNext, setIsXNext] = useState(true);
  const player = isXNext ? PLAYER_X : PLAYER_O;

  // possible states - null, X, O, Draw
  const [winner, setWinner] = useState(null);

  const handleClick = useCallback(
    (rowIndex, columnIndex) => {
      // ignore if already filled
      if (board[rowIndex][columnIndex] || winner) {
        return;
      }

      // deep copy for immutability
      const newBoard = board.map((row) => [...row]);
      newBoard[rowIndex][columnIndex] = player;
      setBoard(newBoard);

      const gamer = calculateWinner(
        rowIndex,
        columnIndex,
        player,
        size,
        newBoard
      );

      if (gamer) {
        setWinner(gamer);
      } else {
        setIsXNext((prev) => !prev);
      }
    },
    [player, winner]
  );

  return { board, player, winner, onCellClick: handleClick };
};

export default useTicTacToe;
