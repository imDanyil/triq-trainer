import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Сторінку не знайдено</h2>
      <p>На жаль, сторінка, яку ви шукаєте, не існує.</p>
      <Link to="/" className="home-link">
        Повернутися на головну
      </Link>
    </div>
  );
};

export default NotFoundPage;
