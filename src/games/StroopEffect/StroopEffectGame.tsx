import React, { useState, useEffect } from "react";
import { generateStroopChallenge } from "./logic";
import { type StroopChallenge } from "./types";
import GameLayout from "../../components/common/GameLayout";
import "../../styles/StroopPage.css";

type GameState = "settings" | "playing" | "finished";
const TOTAL_ROUNDS = 10; // Визначимо кількість раундів у грі

const StroopEffectGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("settings");
  const [challenge, setChallenge] = useState<StroopChallenge | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  // Ця функція генерує наступний раунд
  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setGameState("finished"); // Якщо раунди закінчились - завершуємо гру
    } else {
      setRound((r) => r + 1);
      setChallenge(generateStroopChallenge());
    }
  };

  const handleStartGame = () => {
    setScore(0);
    setRound(0);
    setGameState("playing");
  };

  // Використовуємо useEffect, щоб запустити перший раунд, коли гра переходить у стан 'playing'
  useEffect(() => {
    if (gameState === "playing") {
      nextRound();
    }
  }, [gameState]);

  const handleOptionClick = (selectedOption: string) => {
    if (!challenge) return;

    if (selectedOption === challenge.correctAnswer) {
      setScore((s) => s + 1);
    }
    // Незалежно від відповіді, переходимо до наступного раунду
    nextRound();
  };
  // TODO: title, description
  if (gameState === "settings") {
    return (
      <GameLayout
        title={<h2 className="game-intro__title">Title</h2>}
        footer={
          <button onClick={handleStartGame} className="btn btn--cta">
            Почати гру ({TOTAL_ROUNDS} раундів)
          </button>
        }
      >
        <p className="game-intro__description">Description</p>
      </GameLayout>
    );
  }

  if (gameState === "finished") {
    return (
      <GameLayout
        title={<h2>Гра завершена!</h2>}
        footer={
          <button className="btn btn--cta" onClick={handleStartGame}>
            Спробувати ще
          </button>
        }
      >
        <p>
          Ваш результат:{" "}
          <strong>
            {score} / {TOTAL_ROUNDS}
          </strong>
        </p>
      </GameLayout>
      // <div className="results-container">

      //   <div className="stats">
      //     <p>
      //       Ваш результат:{" "}
      //       <strong>
      //         {score} / {TOTAL_ROUNDS}
      //       </strong>
      //     </p>
      //   </div>
      //   <button className="btn btn--cta" onClick={handleStart}>
      //     Спробувати ще
      //   </button>
      // </div>
    );
  }

  // Показуємо екран гри, якщо є активне завдання
  return (
    <div className="stroop-game-area">
      {challenge && (
        <>
          <div className="stroop-word" style={{ color: challenge.color }}>
            {challenge.word}
          </div>
          <div className="stroop-options">
            {challenge.options.map((option) => (
              <button
                className="btn btn--primary"
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StroopEffectGame;
