import React from "react";
import ComputerIcon from "../assets/robotIcon.svg";
import FriendIcon from "../assets/friendIcon.svg";
import TreeIcon from "../assets/treeIcon.svg";
import ThunderIcon from "../assets/thunderIcon.svg";
import ConsoleIcon from "../assets/consoleIcon.svg";

const ICON_MAP = {
  computer: ComputerIcon,
  friend: FriendIcon,
  tree: TreeIcon,
  thunder: ThunderIcon,
  console: ConsoleIcon,
};

export default function ModeCard({ icon, title, desc, badge, accentVar, glowVar, onClick, delay, tag, winMsg }) {
  const IconSrc = ICON_MAP[icon?.toLowerCase()];
  const iconElement = IconSrc ? <img src={IconSrc} alt={`${icon} icon`} className="mode-icon-img" /> : <span>{icon}</span>;

  return (
    <div
      onClick={onClick}
      className="mode-card"
      style={{
        "--card-accent": `var(${accentVar})`,
        "--card-glow": `var(${glowVar})`,
        animationDelay: delay ? `${delay}s` : undefined,
      }}
    >
      <div className="mode-icon">{iconElement}</div>
      {badge && <span className="mode-badge">{badge}</span>}
      <h2 className="mode-title">{title}</h2>
      <p className="mode-desc">{desc}</p>
      <div className="mode-btn">{tag || winMsg || "Play Now →"}</div>
    </div>
  );
}
