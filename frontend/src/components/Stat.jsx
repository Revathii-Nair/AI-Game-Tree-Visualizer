import React from "react";

export default function Stat({ label, val, col }) {
  return (
    <div className="stat-container">
      <div className="stat-val" style={{ color: col }}>
        {val}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
