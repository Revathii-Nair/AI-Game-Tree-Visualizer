import React from "react";
import "../styles/Game.css";

export default function AlgoVisualizer({ traceData }) {
  const getLog = (line) => {
    if (line.includes("✂️")) return "log-pruned";
    if (line.includes("✅")) return "log-success";
    if (line.includes("Imagines")) return "log-imagines";
    if (line.includes("Result")) return "log-result";
    return "log-normal";
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">Algorithm Visualizer</div>
      <div className="visualizer-content">
        {!traceData || traceData.length === 0 ? (
          <div className="visualizer-empty">Play a move to see the algorithm working!</div>
        ) : (
          traceData.map((line) => <div className={`visualizer-line ${getLog(line)}`}>{line}</div>)
        )}
      </div>
    </div>
  );
}
