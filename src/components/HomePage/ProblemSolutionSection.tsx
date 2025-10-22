import React from "react";

const ProblemSolutionSection: React.FC = () => {
  return (
    <section className="home-page-section problem-section">
      <div className="problem-section__content">
        <h2 className="problem-section__title">
          Інформація атакує тебе щосекунди
        </h2>
        <p className="problem-section__text">
          У 2025 році обсяг інформації подвоюється{" "}
          <span className="problem-section__highlight">кожні 12 годин</span>.
          Фейки, маніпуляції, ШІ-контент — все це змагається за твою увагу.
        </p>
        <p className="problem-section__text">
          Результат? Ти витрачаєш години на перевірку, не знаєш кому довіряти, і
          приймаєш рішення наосліп. TRIQ тренує твій мозок розпізнавати
          маніпуляції{" "}
          <span className="problem-section__highlight problem-section__highlight--accent">
            автоматично — як рефлекс
          </span>
          . Без чек-листів, без нудних курсів. Тільки практика з реальними
          кейсами.
        </p>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
