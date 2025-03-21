import Cell from "../cell/Cell";
import React from "react";

const Board = React.memo(({ size, board, onCellClick }) => {
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${size}, 100px)`,
        gridTemplateRows: `repeat(${size}, 100px)`,
      }}
    >
      {board.map((row, rowIndex) => {
        return row.map((cell, columnIndex) => {
          return (
            <Cell
              key={`${rowIndex}:${columnIndex}`}
              cell={cell}
              onClick={() => onCellClick(rowIndex, columnIndex)}
            />
          );
        });
      })}
    </div>
  );
});

export default Board;
