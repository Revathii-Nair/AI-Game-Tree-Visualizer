import React from "react";

export default function DecorBoard() {
  return (
    <div className="decor-board">
      <div className="decor-line-v" style={{ left: "33%" }} />
      <div className="decor-line-v" style={{ left: "66%" }} />
      <div className="decor-line-h" style={{ top: "33%" }} />
      <div className="decor-line-h" style={{ top: "66%" }} />

      <div className="decor-symbol-container">
        <span className="decor-symbol" style={{ color: "var(--x-col)", textShadow: "0 0 18px var(--x-glow)", fontSize: "1.3rem" }}>
          X
        </span>
      </div>
      <div />
      <div />
      <div />
      <div className="decor-symbol-container">
        <span className="decor-symbol" style={{ color: "var(--o-col)", textShadow: "0 0 18px var(--o-glow)", fontSize: "1.5rem" }}>
          O
        </span>
      </div>
      <div />
      <div />
      <div />
      <div className="decor-symbol-container">
        <span className="decor-symbol" style={{ color: "var(--x-col)", textShadow: "0 0 18px var(--x-glow)", fontSize: "1.3rem" }}>
          X
        </span>
      </div>
    </div>
  );
}
