import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="home-page-section hero-section">
      <div className="hero-section__content">
        <h1 className="hero-section__title">
          Прокачай свій мозок проти дезінформації
        </h1>
        <p className="hero-section__subtitle">
          Тренуй критичне мислення та швидкість аналізу, щоб миттєво
          розпізнавати фейки та маніпуляції
        </p>
        <Link to="/trainers" className="btn btn--cta hero-section__cta">
          Почати тренування
        </Link>
        <p className="hero-section__meta">
          5-10 хвилин щодня • Реальні кейси • Без теорії
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
