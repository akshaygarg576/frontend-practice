import React, { useEffect, useState } from "react";
import "./Bar.css";

const Bar = ({ data, height }) => {
  const [animatedHeight, setAnimatedHeight] = useState("0%"); // Start from 0%

  useEffect(() => {
    setTimeout(() => setAnimatedHeight(height), 100); // Apply transition
  }, [height]); // Runs when `height` changes

  return (
    <div
      className="bar"
      style={{
        height: animatedHeight,
        backgroundColor: data.colour,
      }}
    >
      <div className="tooltip">
        {data.name}: {data.ticketCount}
      </div>
    </div>
  );
};

export default Bar;
