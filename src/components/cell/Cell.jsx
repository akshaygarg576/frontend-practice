import React from "react";

const Cell = React.memo(({ cell, onClick }) => {
  return (
    <button className="cell" onClick={onClick}>
      {cell}
    </button>
  );
});

export default Cell;
