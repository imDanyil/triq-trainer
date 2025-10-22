import React from "react";
import "../styles/HomePage.css"; // Головний файл стилів для сторінки

// Імпортуємо всі наші нові секції
import HeroSection from "../components/HomePage/HeroSection";
import ProblemSolutionSection from "../components/HomePage/ProblemSolutionSection";
import SkillsSection from "../components/HomePage/SkillsSection";
// import ResultSection from '../components/HomePage/ResultSection';
// import SocialProofSection from '../components/HomePage/SocialProofSection';
// import FinalCtaSection from '../components/HomePage/FinalCtaSection';

const HomePage: React.FC = () => {
  return (
    <div className="home-page-container">
      <HeroSection />
      <ProblemSolutionSection />
      <SkillsSection />
      {/* <ResultSection />
      <SocialProofSection />
      <FinalCtaSection /> */}
    </div>
  );
};

export default HomePage;
