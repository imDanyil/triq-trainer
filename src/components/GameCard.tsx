import React from "react";
import { Link } from "react-router-dom";
import "../styles/GameCard.css";

type GameCardProps = {
  title: string;
  description: string;
  link: string;
};

const GameCard: React.FC<GameCardProps> = ({ title, description, link }) => {
  return (
    <Link to={link} className="game-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
};

export default GameCard;
