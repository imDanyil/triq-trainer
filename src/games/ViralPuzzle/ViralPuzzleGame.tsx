import React, { useState, useEffect, useCallback } from "react";
import type { Puzzle } from "./types";
import { getRandomPuzzle } from "./data";
import GameLayout from "../../components/common/GameLayout";
import "../../styles/ViralPuzzle.css";

type GameState = "idle" | "playing" | "feedback" | "finished";
const TOTAL_ROUNDS = 3;
const TIME_PER_ROUND = 10;

const ViralPuzzleGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_ROUND);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const nextRound = useCallback(() => {
    setSelectedOption(null);
    if (round < TOTAL_ROUNDS) {
      setCurrentPuzzle(getRandomPuzzle(currentPuzzle?.id));
      setRound((prev) => prev + 1);
      setTimeLeft(TIME_PER_ROUND);
      setGameState("playing");
    } else {
      setGameState("finished");
    }
  }, [round, currentPuzzle?.id]);

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      if (timeLeft <= 0) {
        clearInterval(timer);
        setGameState("feedback");
      }

      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === "feedback") {
      const timer = setTimeout(() => {
        nextRound();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState, nextRound]);

  const handleStartGame = () => {
    setScore(0);
    setRound(0);
    nextRound();
  };

  const handleAnswerClick = (index: number) => {
    if (gameState !== "playing") return;

    setSelectedOption(index);
    if (index === currentPuzzle?.correctOptionIndex) {
      setScore((prev) => prev + 1);
    }
    setGameState("feedback");
  };

  if (gameState === "idle") {
    return (
      <GameLayout
        title={<h2 className="game-intro__title">Вірусна Головоломка</h2>}
        footer={
          <button onClick={handleStartGame} className="btn btn--cta">
            Почати
          </button>
        }
      >
        <p className="game-intro__description">
          Проаналізуйте {TOTAL_ROUNDS} ситуації та знайдіть логічно правильну
          відповідь. Час обмежений!
        </p>
      </GameLayout>
    );
  }

  if (gameState === "finished") {
    return (
      <GameLayout
        title={<h2 className="game-results__title">Гра завершена!</h2>}
        footer={
          <button onClick={handleStartGame} className="btn btn--primary">
            Грати ще раз
          </button>
        }
      >
        <p className="game-results__score">
          Ваш рахунок: {score} / {TOTAL_ROUNDS}
        </p>
      </GameLayout>
    );
  }

  if (!currentPuzzle) return <div>Завантаження...</div>;

  const isFeedbackState = gameState === "feedback";

  return (
    <GameLayout
      title={
        <div className="viral-puzzle__header">
          <span className="viral-puzzle__round">
            Раунд: {round}/{TOTAL_ROUNDS}
          </span>
          <span className="viral-puzzle__score">Рахунок: {score}</span>
          <div
            className="viral-puzzle__timer-bar"
            style={{ width: `${(timeLeft / TIME_PER_ROUND) * 100}%` }}
          ></div>
        </div>
      }
    >
      <div className="viral-puzzle__scenario">{currentPuzzle.scenario}</div>
      <div className="viral-puzzle__options">
        {currentPuzzle.options.map((option, index) => {
          let btnClass = "viral-puzzle__option-btn";
          if (isFeedbackState) {
            if (index === currentPuzzle.correctOptionIndex) {
              btnClass += " viral-puzzle__option-btn--correct";
            } else if (index === selectedOption) {
              btnClass += " viral-puzzle__option-btn--incorrect";
            }
          }
          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={btnClass}
              disabled={isFeedbackState}
            >
              {option}
            </button>
          );
        })}
      </div>
      {isFeedbackState && (
        <div className="viral-puzzle__explanation">
          <strong>Пояснення:</strong> {currentPuzzle.explanation}
        </div>
      )}
    </GameLayout>
  );
};

export default ViralPuzzleGame;
