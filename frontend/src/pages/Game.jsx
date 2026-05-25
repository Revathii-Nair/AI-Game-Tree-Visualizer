import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getMinimaxMove, checkWinner, getWinningLine } from "../utils/minimax.jsx";
import { getAlphaBetaMove } from "../utils/alphabeta.jsx";
import { useScores } from "../context/ScoreContext.jsx";
import AlgoVisualizer from "../components/AlgoVisualizer.jsx";
import "../styles/Game.css";

const CONF_COLORS = ["#4f7fff", "#ff4d7d", "#00d4ff", "#ffd700", "#00e5a0", "#a78bfa"];

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({ id: i, color: CONF_COLORS[i % CONF_COLORS.length], left: `${Math.random() * 100}%` }));
  return (
    <>
      {pieces.map((p) => (
        <div key={p.id} className="confetti-piece" style={{ left: p.left, background: p.color, animationDelay: `${Math.random() * 0.5}s` }} />
      ))}
    </>
  );
}

function Cell({ value, onClick, isWin }) {
  return (
    <div
      onClick={onClick}
      className="game-cell"
      style={{
        border: `1.5px solid ${isWin ? "var(--success)" : "var(--border-hi)"}`,
        cursor: value ? "default" : "pointer",
        color: value === "X" ? "var(--x-col)" : "var(--o-col)",
        background: isWin ? "color-mix(in srgb, var(--success) 10%, transparent)" : "var(--card)",
      }}
    >
      {value}
    </div>
  );
}

function ScoreBlock({ name, symbol, wins, losses, draws }) {
  return (
    <div className="score-block">
      <div className="score-symbol" style={{ color: symbol === "X" ? "var(--x-col)" : "var(--o-col)" }}>
        {symbol}
      </div>
      <div className="score-name">{name}</div>
      <div className="score-stats">
        <span className="stat-w">{wins}W</span> {" · "}
        <span className="stat-l">{losses}L</span> {" · "}
        <span className="stat-d">{draws}D</span>
      </div>
    </div>
  );
}

function ResultOverlay({ emoji, message, isWin, onPlayAgain, onHome }) {
  return (
    <div className="result-overlay-bg">
      {isWin && <Confetti />}
      <div className="result-overlay-box">
        <div style={{ fontSize: 52 }}>{emoji}</div>
        <h2 style={{ fontFamily: "Orbitron, monospace", fontSize: "1.4rem", color: "var(--text)", margin: 0 }}>{message}</h2>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={onPlayAgain} className="game-btn-primary">
            Play Again
          </button>
          <button onClick={onHome} className="game-btn-secondary">
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { scores, updateScore } = useScores();

  const queryParams = new URLSearchParams(location.search);
  const engine = queryParams.get("engine") || "minimax";
  const isAi = mode === "ai" || mode === "computer";

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [winLine, setWinLine] = useState([]);
  const [over, setOver] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [resultEmoji, setResultEmoji] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  const [showVisualizer, setShowVisualizer] = useState(false);
  const [traceLogs, setTraceLogs] = useState([]);
  const [aiStats, setAiStats] = useState({ visited: 0, pruned: 0 });

  useEffect(() => {
    if (over) return;

    const result = checkWinner(board);
    if (!result) return;

    setOver(true);
    setWinLine(getWinningLine(board) || []);

    if (result === "X") {
      setIsWin(true);
      setResultEmoji("🎉");
      setResultMsg(isAi ? "You Win!" : "Player X Wins!");
      updateScore("player1", "wins");
      if (isAi) updateScore("ai", "losses");
      else updateScore("player2", "losses");
    } else if (result === "O") {
      setIsWin(true);
      setResultEmoji(isAi ? "🤖" : "🎉");
      setResultMsg(isAi ? "AI Wins!" : "Player O Wins!");
      updateScore("player1", "losses");
      if (isAi) updateScore("ai", "wins");
      else updateScore("player2", "wins");
    } else {
      setIsWin(false);
      setResultEmoji("🤝");
      setResultMsg("Draw!");
      updateScore("player1", "draws");
      if (isAi) updateScore("ai", "draws");
      else updateScore("player2", "draws");
    }
  }, [board, over]);

  useEffect(() => {
    if (!isAi || turn !== "O" || over) return;

    setAiThinking(true);
    const timer = setTimeout(() => {
      const {
        bestMove,
        traceLogs: newLogs,
        nodesVisited,
        nodesPruned,
      } = engine === "alphabeta" ? getAlphaBetaMove([...board]) : getMinimaxMove([...board]);

      if (bestMove !== -1 && bestMove !== undefined) {
        const newBoard = [...board];
        newBoard[bestMove] = "O";
        setBoard(newBoard);
        setTurn("X");
        setTraceLogs(newLogs);
        setAiStats({ visited: nodesVisited, pruned: nodesPruned });
      }
      setAiThinking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [turn, over, board, engine]);

  function handleClick(index) {
    if (board[index] || over || aiThinking) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
    if (isAi) setTraceLogs([]);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinLine([]);
    setOver(false);
    setResultMsg("");
    setResultEmoji("");
    setIsWin(false);
    setAiThinking(false);
    setTraceLogs([]);
    setAiStats({ visited: 0, pruned: 0 });
  }

  const p1 = scores.player1;
  const p2 = isAi ? scores.ai : scores.player2;

  return (
    <div className="game-layout" style={{ maxWidth: showVisualizer ? "1400px" : "800px" }}>
      <div className="game-board-container">
        {over && <ResultOverlay emoji={resultEmoji} message={resultMsg} isWin={isWin} onPlayAgain={resetGame} onHome={() => navigate("/")} />}

        <div className="score-row">
          <ScoreBlock name="Player 1" symbol="X" {...p1} />
          <ScoreBlock name={isAi ? "AI" : "Player 2"} symbol="O" {...p2} />
        </div>

        <h4 className="turn-heading">{aiThinking ? "🤖 AI Thinking..." : `${turn === "X" ? "Player 1" : isAi ? "AI" : "Player 2"}'s Turn`}</h4>

        <div className="game-grid">
          {board.map((cell, i) => (
            <Cell key={i} value={cell} onClick={() => handleClick(i)} isWin={winLine.includes(i)} />
          ))}
        </div>

        <div className="ai-stats-wrapper">
          {isAi && aiStats.visited > 0 && (
            <div className="ai-stats-box">
              <div>
                Nodes Checked: <strong style={{ color: "var(--text)" }}>{aiStats.visited}</strong>
              </div>
              {engine === "alphabeta" && (
                <div>
                  Branches Pruned: <strong style={{ color: "var(--danger)" }}>{aiStats.pruned}</strong>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="game-buttons-row">
          <button onClick={resetGame} className="game-btn-primary">
            Reset
          </button>
          <button onClick={() => navigate("/")} className="game-btn-secondary">
            Home
          </button>

          {isAi && (
            <button
              onClick={() => setShowVisualizer(!showVisualizer)}
              className="game-btn-secondary"
              style={{ background: showVisualizer ? "var(--border)" : "var(--card)", width: "100%", marginTop: "5px" }}
            >
              {showVisualizer ? "Hide Algorithm Visualization" : "Show Algorithm Visualization"}
            </button>
          )}
        </div>
      </div>

      {isAi && showVisualizer && (
        <div className="game-visualizer-container">
          <AlgoVisualizer traceData={traceLogs} />
        </div>
      )}
    </div>
  );
}
