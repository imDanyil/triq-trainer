import React from "react";

const skills = [
  {
    icon: "💡",
    title: "Логіка",
    description: "Розпізнавай логічні помилки в аргументах",
  },
  {
    icon: "⚡",
    title: "Реакція",
    description: "Аналізуй інформацію за секунди, а не години",
  },
  {
    icon: "👁️",
    title: "Увага",
    description: "Помічай деталі, які видають маніпуляції",
  },
  {
    icon: "🔍",
    title: "Аналіз",
    description: "Перевіряй джерела та приховані мотиви",
  },
  {
    icon: "❤️",
    title: "EQ",
    description: "Не піддавайся на емоційні провокації",
  },
];

const SkillsSection: React.FC = () => {
  return (
    <section className="home-page-section skills-section">
      <div className="skills-section__content">
        <h2 className="skills-section__title">
          5 навичок для захисту від дезінформації
        </h2>
        <div className="skills-section__grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.title}>
              <div className="skill-card__icon">
                {/* ЗАЛИШЕНО ТЕГ ДЛЯ ВАШОГО SVG */}
                <span className="svg-placeholder" aria-label={skill.title}>
                  {skill.icon}
                </span>
              </div>
              <h3 className="skill-card__title">{skill.title}</h3>
              <p className="skill-card__description">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
