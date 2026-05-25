import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import minimaxDiagram from "../assets//minmax.png";
import alphabetaDiagram from "../assets/alphabeta.webp";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-bg-glow"></div>
      <div className="landing-content">
        <h1 className="landing-title">
          Tic Tac <span className="landing-highlight">Pro</span>
        </h1>

        <p className="landing-subtitle">Play smart. Challenge AI. Compete with friends.</p>

        <button className="landing-btn" onClick={() => navigate("/home")}>
          Play Now!
        </button>

        <div className="landing-engine-header">
          <h2 className="landing-engine-title">The AI Engine: Beyond Simple Moves</h2>
          <p className="landing-engine-desc">At the heart of Tic Tac Pro lies a decision-making engine using industry-standard adversarial search.</p>
        </div>

        <div className="landing-grid-container">
          <p className="landing-debug-text">AI_ENGINE: EVALUATING_TREE...</p>
          <div className="landing-grid">
            {Array(9)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="landing-cell">
                  <div className="landing-scanner" style={{ animationDelay: `${i * 0.1}s` }}></div>
                </div>
              ))}
          </div>
        </div>

        <div className="landing-info-section">
          <div class="landing-card">
            <div class="landing-card-header">
              <h3>Minimax Algorithm</h3>
            </div>
            <p class="landing-card-text">
              The Minimax algorithm is a classic decision-making strategy used in two-player games such as Tic-Tac-Toe, Chess, and Checkers. It helps
              the AI play optimally by simulating every possible move and counter-move, assuming both players are playing their best.
            </p>
            <p class="landing-card-text">
              <b>How it works:</b>
            </p>
            <ul class="landing-card-text">
              <li>
                <b>Game Tree Exploration:</b> Builds a tree of all possible moves.
              </li>
              <li>
                <b>Scoring:</b> AI win = +1, Human win = -1, Draw = 0.
              </li>
              <li>
                <b>Maximizer vs. Minimizer:</b> AI maximizes the score, Human minimizes it.
              </li>
              <li>
                <b>Backtracking:</b> Scores from leaf nodes are passed upward to decide the best move.
              </li>
              <li>
                <b>Final Decision:</b> AI chooses the move that guarantees the best outcome, even if the opponent plays perfectly.
              </li>
            </ul>
            <img src={minimaxDiagram} alt="Minimax Algorithm Diagram" class="landing-card-image" />
            <p class="landing-card-text">
              In short: Minimax is the brain of game-playing AI, it explores all possible moves, assumes the opponent is perfect, and chooses the move
              that guarantees the best outcome.
            </p>
          </div>

          <div class="landing-card">
            <div class="landing-card-header">
              <h3>Alpha-Beta Pruning</h3>
            </div>
            <p class="landing-card-text">
              Alpha-Beta Pruning is an optimization technique for the Minimax algorithm. It makes the search process faster by cutting off branches
              that cannot affect the final decision.
            </p>
            <p class="landing-card-text">
              <b>Key Concepts:</b>
            </p>
            <ul class="landing-card-text">
              <li>
                <b>Alpha (α):</b> Best score the AI (Maximizer) can guarantee so far.
              </li>
              <li>
                <b>Beta (β):</b> Best score the opponent (Minimizer) can guarantee so far.
              </li>
              <li>
                <b>Pruning:</b> If α ≥ β, the algorithm stops exploring that branch since it won’t affect the outcome.
              </li>
            </ul>
            <p class="landing-card-text">
              <b>How It Works:</b>
            </p>
            <ul class="landing-card-text">
              <li>The algorithm explores moves just like Minimax.</li>
              <li>At each step, it keeps track of α and β values.</li>
              <li>If a branch cannot improve the current best outcome, it is pruned (ignored).</li>
              <li>This reduces the number of nodes evaluated, making the algorithm significantly faster.</li>
            </ul>
            <p class="landing-card-text">
              <b>Benefits:</b> Faster decision-making, fewer nodes explored, and the same optimal result as plain Minimax.
            </p>
            <img src={alphabetaDiagram} alt="Alpha Beta Pruning Algorithm Diagram" class="landing-card-image" />
            <p class="landing-card-text">
              In short: Alpha-Beta Pruning is the "shortcut" that makes Minimax practical,it ensures the AI engine can think several moves ahead
              quickly without wasting effort on irrelevant possibilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
