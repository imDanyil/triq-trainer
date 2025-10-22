import React from "react";
import "../../styles/GameLayout.css";

interface GameLayoutProps {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const GameLayout: React.FC<GameLayoutProps> = ({ title, children, footer }) => {
  return (
    <div className="game-layout">
      {title && <header className="game-layout__header">{title}</header>}
      <main className="game-layout__main">{children}</main>
      {footer && <footer className="game-layout__footer">{footer}</footer>}
    </div>
  );
};

export default GameLayout;
