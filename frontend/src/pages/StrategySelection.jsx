import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StrategySelection.css";

export default function StrategySelection() {
  const navigate = useNavigate();

  const handleChoice = (engineType) => {
    navigate(`/game/ai?engine=${engineType}`);
  };

  return (
    <div className="strategy-selection-page">
      <h1>Select AI Difficulty</h1>
      <div className="strategy-button-group">
        <button className="strategy-btn" onClick={() => handleChoice("minimax")}>
          Standard Minimax
        </button>
        <button className="strategy-btn" onClick={() => handleChoice("alphabeta")}>
          Optimized Alpha-Beta
        </button>
      </div>
    </div>
  );
}
