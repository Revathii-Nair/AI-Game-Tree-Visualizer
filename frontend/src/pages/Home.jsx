import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useScores } from "../context/ScoreContext.jsx";
import DecorBoard from "../components/DecorBoard.jsx";
import Stat from "../components/Stat.jsx";
import ModeCard from "../components/ModeCard.jsx";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { scores, resetScores } = useScores();
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);

  const p1 = scores.player1;
  const totalGames = p1.wins + p1.losses + p1.draws;

  const MODES = [
    {
      icon: "computer",
      title: "Play with Computer",
      desc: "Challenge our unbeatable AI. Choose Minimax or Alpha-Beta algorithm.",
      badge: "Single Player",
      accentVar: "--accent",
      glowVar: "--accent-glow",
      delay: 0.2,
      onClick: () => navigate("/select/ai"),
    },
    {
      icon: "friend",
      title: "Play with Friend",
      desc: "Enjoy a classic game of Tic Tac Toe with your friend on the same device.",
      badge: "Two Players",
      accentVar: "--cyan",
      glowVar: "--cyan-glow",
      delay: 0.35,
      onClick: () => navigate("/select/friend"),
    },
  ];

  return (
    <div className="page">
      <div className="home-page" style={{ animation: show ? "fadeUp 0.5s ease both" : "none" }}>
        <DecorBoard />
        <h1 style={{ fontSize: "clamp(1.9rem,5vw,2.9rem)", fontWeight: 900, letterSpacing: "2px", margin: 0 }}>
          Tic Tac&nbsp;
          <span
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Pro
          </span>
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "0.97rem", maxWidth: 360, lineHeight: 1.6 }}>
          Challenge yourself against our unbeatable AI or have fun with a friend. Track your stats and become the ultimate Tic Tac Toe champion!
        </p>
      </div>

      <div style={{ display: "flex", gap: 22, flexWrap: "wrap", justifyContent: "center", marginTop: 20 }}>
        {MODES.map((m, i) => (
          <ModeCard key={i} {...m} />
        ))}
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
