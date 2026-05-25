import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useScores } from "../context/ScoreContext.jsx";
import DecorBoard from "../components/DecorBoard.jsx";
import Stat from "../components/Stat.jsx";
import ModeCard from "../components/ModeCard.jsx"; // shared card
import "../styles/GridSelect.css";
import "../styles/Home.css";

const GRIDS = [
  {
    size: 3,
    title: "3 × 3",
    winMsg: "3 in a row to win",
    desc: "Classic Tic Tac Toe.",
    badge: "Classic",
    accentVar: "--success",
    glowVar: "rgba(0,229,160,0.30)",
    icon: "console",
  },
];

const AI_STRATEGIES = [
  {
    engine: "minimax",
    title: "Minimax",
    icon: "tree",
    badge: "Standard",
    accentVar: "--accent",
    glowVar: "--accent-glow",
    desc: "Full game tree search for best move.",
    tag: "Full search",
  },
  {
    engine: "alphabeta",
    title: "Alpha-Beta",
    icon: "thunder",
    badge: "Optimized",
    accentVar: "--cyan",
    glowVar: "--cyan-glow",
    desc: "Minimax with pruning for faster play.",
    tag: "Pruned search",
  },
];

export default function GridSelect() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { scores, resetScores } = useScores();

  const isAi = mode === "ai";

  const p1 = scores.player1;
  const totalGames = p1.wins + p1.losses + p1.draws;

  const handleStrategyPick = (engine) => {
    navigate(`/game/ai?engine=${engine}`);
  };

  const handleGridPick = (size) => {
    navigate(`/game/${mode}/${size}`);
  };

  return (
    <div className="page grid-select-page">
      <div className="home-page" style={{ animation: "fadeUp 0.5s ease both" }}>
        <DecorBoard />
        {isAi ? (
          <>
            <h1 className="grid-select-title" style={{ marginTop: "14px" }}>
              Choose AI Engine
            </h1>
            <p className="grid-select-subtitle">Select how smart your opponent should be</p>
          </>
        ) : (
          <>
            <h1 className="grid-select-title" style={{ marginTop: "14px" }}>
              Select Grid Size
            </h1>
            <p className="grid-select-subtitle">Choose your battlefield</p>
          </>
        )}
      </div>

      <div className="grid-select-container">
        {isAi
          ? AI_STRATEGIES.map((s) => <ModeCard key={s.engine} {...s} onClick={() => handleStrategyPick(s.engine)} />)
          : GRIDS.map((g) => <ModeCard key={g.size} {...g} onClick={() => handleGridPick(g.size)} />)}
      </div>

      {totalGames > 0 && (
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-m)",
            padding: "22px 32px",
            textAlign: "center",
            animation: "fadeUp 0.5s ease 0.5s both",
            marginTop: 30,
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              color: "var(--muted)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Your Stats (Player 1)
          </div>
          <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap" }}>
            <Stat label="Wins" val={p1.wins} col="var(--success)" />
            <Stat label="Losses" val={p1.losses} col="var(--danger)" />
            <Stat label="Draws" val={p1.draws} col="var(--muted)" />
            <Stat label="Played" val={totalGames} col="var(--accent)" />
          </div>
          <button className="btn btn-outline btn-sm" onClick={resetScores} style={{ marginTop: 16 }}>
            Reset Scores
          </button>
        </div>
      )}
    </div>
  );
}
