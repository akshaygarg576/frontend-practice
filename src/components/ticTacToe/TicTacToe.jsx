import "./TicTacToe.css";
import Status from "../status/Status";
import Board from "../board/Board";
import useTicTacToe from "./hooks";

const TicTacToe = ({ size }) => {
  const { board, player, winner, onCellClick } = useTicTacToe(size);

  return (
    <div>
      <Status winner={winner} nextPlayer={player} />
      <Board board={board} size={size} onCellClick={onCellClick} />
    </div>
  );
};

export default TicTacToe;
