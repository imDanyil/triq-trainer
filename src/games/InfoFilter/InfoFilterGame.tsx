import React, { useState, useEffect, useMemo } from "react";
import type { AnswerOption, AnswerResult } from "./types";
import { QUESTIONS_DATA, SCORE_CONFIG, DIFFICULTY_CONFIGS } from "./data";
import { calculateAnswerScore } from "./logic";
import { shuffleArray } from "../../utils/array";
import TimerBar from "../../components/common/TimerBar";
import GameLayout from "../../components/common/GameLayout";
import "../../styles/InfoFilter.css";

type GameState = "idle" | "playing" | "show_feedback" | "finished";
type GameDifficulty = "easy" | "medium" | "hard";

const ROUNDS_PER_GAME = 4;
const ROUND_DURATION = 6000; // 6s

const InfoFilterGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState<AnswerResult[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [lastAnswer, setLastAnswer] = useState<AnswerResult | null>(null);

  const [difficulty, setDifficulty] = useState<GameDifficulty>("medium");
  const [timerProgress, setTimerProgress] = useState(1);
  const gameConfig = DIFFICULTY_CONFIGS[difficulty];

  const shuffledQuestions = useMemo(
    () => shuffleArray(QUESTIONS_DATA).slice(0, gameConfig.rounds),
    [difficulty, gameConfig.rounds]
  );

  const handleStartGame = () => {
    setCurrentQuestionIndex(0);
    setSessionResults([]);
    setQuestionStartTime(Date.now());
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "show_feedback") {
      return;
    }
    const timerId = setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setQuestionStartTime(Date.now());
        setGameState("playing");
      } else {
        setGameState("finished");
      }
    }, 1500);
    return () => clearTimeout(timerId);
  }, [gameState, currentQuestionIndex, shuffledQuestions.length]);

  useEffect(() => {
    // Таймер працює тільки під час гри
    if (gameState !== "playing") {
      return;
    }

    const timerId = setTimeout(() => {
      // Якщо час вийшов, симулюємо неправильну відповідь
      handleAnswer(null); // Передаємо null, щоб позначити, що це тайм-аут
    }, gameConfig.duration);

    // Очищуємо таймер, якщо користувач встиг відповісти
    return () => clearTimeout(timerId);
  }, [gameState, currentQuestionIndex, gameConfig.duration]);

  useEffect(() => {
    if (gameState !== "playing") {
      return;
    }

    // Скидаємо прогрес на 100% на початку нового питання
    setTimerProgress(1);

    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - questionStartTime;
      const newProgress = 1 - elapsedTime / gameConfig.duration;
      setTimerProgress(newProgress);
    }, 50); // Оновлюємо 20 разів на секунду

    return () => clearInterval(intervalId);
  }, [gameState, currentQuestionIndex, questionStartTime, gameConfig.duration]);

  const handleAnswer = (userAnswer: AnswerOption | null) => {
    const responseTime = Date.now() - questionStartTime;
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect =
      userAnswer !== null && userAnswer === currentQuestion.correctAnswer;

    const scoreResponseTime =
      userAnswer === null ? gameConfig.duration + 1 : responseTime;
    const { points, speedBonusName } = calculateAnswerScore(
      scoreResponseTime,
      isCorrect
    );

    const newResult: AnswerResult = {
      questionId: currentQuestion.id,
      isCorrect,
      responseTime,
      points,
      speedBonusName,
    };

    setSessionResults((prev) => [...prev, newResult]);
    setLastAnswer(newResult);
    setGameState("show_feedback");
  };

  if (gameState === "idle") {
    return (
      <GameLayout
        title={
          <h2 className="game-intro__title">Готові фільтрувати інформацію?</h2>
        }
        footer={
          <button onClick={handleStartGame} className="btn btn--cta">
            Почати
          </button>
        }
      >
        <p className="game-intro__description">
          Визначте, де факт, а де фейк. Відповідайте якомога швидше та точніше!
        </p>

        <div className="difficulty-selector">
          <h3>Оберіть складність:</h3>
          <div className="difficulty-selector__buttons">
            <button
              className={`btn ${difficulty === "easy" ? "btn--primary" : ""}`}
              onClick={() => setDifficulty("easy")}
            >
              Легко
            </button>
            <button
              className={`btn ${difficulty === "medium" ? "btn--primary" : ""}`}
              onClick={() => setDifficulty("medium")}
            >
              Нормально
            </button>
            <button
              className={`btn ${difficulty === "hard" ? "btn--primary" : ""}`}
              onClick={() => setDifficulty("hard")}
            >
              Складно
            </button>
          </div>
        </div>
      </GameLayout>
    );
  }

  if (gameState === "playing" || gameState === "show_feedback") {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    let feedbackContent = null;

    let factButtonClass = "btn btn--fact";
    let fakeButtonClass = "btn btn--fake";
    if (gameState === "show_feedback" && lastAnswer) {
      const userAnswer =
        lastAnswer.questionId === currentQuestion.id &&
        (lastAnswer.isCorrect
          ? currentQuestion.correctAnswer
          : currentQuestion.correctAnswer === "FACT"
          ? "FAKE"
          : "FACT");

      const correctAnswer = currentQuestion.correctAnswer;

      // Логіка для кнопки ФАКТ
      if (userAnswer === "FACT") {
        factButtonClass += lastAnswer.isCorrect
          ? " btn--selected-correct"
          : " btn--selected-incorrect";
        fakeButtonClass += " btn--faded";
      } else if (correctAnswer === "FACT" && !lastAnswer.isCorrect) {
        factButtonClass += " btn--was-correct";
      }

      // Логіка для кнопки ФЕЙК
      if (userAnswer === "FAKE") {
        fakeButtonClass += lastAnswer.isCorrect
          ? " btn--selected-correct"
          : " btn--selected-incorrect";
        factButtonClass += " btn--faded";
      } else if (correctAnswer === "FAKE" && !lastAnswer.isCorrect) {
        fakeButtonClass += " btn--was-correct";
      }

      const pointsText =
        lastAnswer.points > 0 ? `+${lastAnswer.points}` : lastAnswer.points;
      const pointsClass = lastAnswer.isCorrect
        ? "feedback-screen__points--correct"
        : "feedback-screen__points--incorrect";

      feedbackContent = (
        <div className="feedback-screen">
          <h2 className="feedback-screen__title">
            {lastAnswer.speedBonusName}
          </h2>
          <p className={`feedback-screen__points ${pointsClass}`}>
            {pointsText} балів
          </p>
        </div>
      );
    }

    return (
      <GameLayout
        title={
          <div className="game-board__progress-container">
            <div className="game-board__progress">
              Питання {currentQuestionIndex + 1} / {shuffledQuestions.length}
            </div>
            <TimerBar progress={timerProgress} key={currentQuestionIndex} />
          </div>
        }
        footer={
          <button
            onClick={() => setGameState("idle")}
            className="btn btn--primary"
          >
            Грати знову
          </button>
        }
      >
        <div className="game-board__main-content">
          {gameState === "show_feedback" ? (
            feedbackContent
          ) : (
            <p className="game-board__question-text">{currentQuestion.text}</p>
          )}
        </div>

        <div className="game-board__controls">
          <button
            onClick={() => handleAnswer("FACT")}
            className={factButtonClass}
            disabled={gameState === "show_feedback"}
          >
            ФАКТ
          </button>
          <button
            onClick={() => handleAnswer("FAKE")}
            className={fakeButtonClass}
            disabled={gameState === "show_feedback"}
          >
            ФЕЙК
          </button>
        </div>
      </GameLayout>
    );
  }

  if (gameState === "finished") {
    const totalBaseScore = sessionResults.reduce(
      (sum, result) => sum + result.points,
      0
    );
    const correctAnswersCount = sessionResults.filter(
      (r) => r.isCorrect
    ).length;
    const isPerfect = correctAnswersCount === shuffledQuestions.length;

    let finalScore = totalBaseScore;
    if (isPerfect) {
      finalScore += SCORE_CONFIG.PRECISION_BONUS;
    }
    finalScore = Math.max(0, finalScore);

    return (
      <GameLayout
        title={<h2 className="results-screen__title">Гра завершена!</h2>}
        footer={
          <button
            onClick={() => setGameState("idle")}
            className="btn btn--primary"
          >
            Грати знову
          </button>
        }
      >
        <p className="results-screen__score">
          Ваш TRIQ-score: <strong>{finalScore}</strong>
        </p>
        {isPerfect && (
          <p className="results-screen__bonus">
            Майстер точності! (+{SCORE_CONFIG.PRECISION_BONUS} балів)
          </p>
        )}
        <p>
          Точність {correctAnswersCount} / {shuffledQuestions.length}{" "}
        </p>
      </GameLayout>
    );
  }
};

export default InfoFilterGame;
