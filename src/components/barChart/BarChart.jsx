import React, { useMemo } from "react";
import Bar from "../bar/Bar";
import "./BarChart.css";

const BarChart = ({ data }) => {
  // no need top calculate this again and again
  const maxHeight = useMemo(
    () => Math.max(...data.map((d) => d.ticketCount)),
    [data]
  );

  return (
    <div className="container">
      <div className="chart">
        {data.map((bar) => {
          // dynamically calulating height of each bar
          const height = `${(bar.ticketCount / maxHeight) * 100}%`;

          return <Bar key={bar.id} data={bar} height={height} />;
        })}
      </div>
      <div className="y-axis-label">Y-axis</div>
      <div className="x-axis-label">X-axis</div>
    </div>
  );
};

export default BarChart;
