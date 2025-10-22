import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { generateSchulteBoard } from "./logic";
import { useTimer } from "../../hooks/useTimer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { SchulteGameResult } from "./types";
import GameLayout from "../../components/common/GameLayout";
import "../../styles/SchultePage.css";

type GameState = "settings" | "playing" | "finished";
type LastClickInfo = {
  number: number | null;
  status: "correct" | "incorrect" | null;
};

const formatTime = (timeInMs: number): string => {
  return (timeInMs / 1000).toFixed(2);
};

const SchulteTableGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("settings");
  const [board, setBoard] = useState<number[]>([]);
  const [boardSize, setBoardSize] = useState<number>(0);
  const [currentTarget, setCurrentTarget] = useState<number>(1);

  const [mistakes, setMistakes] = useState<number>(0);
  const { time, isRunning, start, stop, reset } = useTimer();

  const [gameHistory, setGameHistory] = useLocalStorage<SchulteGameResult[]>(
    "schulte-game-history",
    []
  );

  const [lastClick, setLastClick] = useState<LastClickInfo>({
    number: null,
    status: null,
  });

  useEffect(() => {
    if (lastClick.status) {
      const timerId = setTimeout(() => {
        setLastClick({ number: null, status: null });
      }, 200);

      return () => clearTimeout(timerId);
    }
  }, [lastClick]);

  const handleStartGame = (size: number) => {
    reset();
    setMistakes(0);
    //start();  Start timer right away for smoother flow

    setBoardSize(size);
    setBoard(generateSchulteBoard(size));
    setCurrentTarget(1);
    setGameState("playing");
    setLastClick({ number: null, status: null });
  };

  const handleCellClick = (clickedNumber: number) => {
    if (!isRunning && clickedNumber === 1) {
      start();
    }
    if (clickedNumber === currentTarget) {
      setLastClick({ number: clickedNumber, status: "correct" });
      if (currentTarget === boardSize * boardSize) {
        stop();
        setGameState("finished");

        const newResult: SchulteGameResult = {
          id: `schulte-${Date.now()}`,
          date: new Date().toISOString(),
          time: time,
          mistakes: mistakes,
          boardSize: boardSize,
        };

        setGameHistory([...gameHistory, newResult]);
      } else {
        setCurrentTarget((prev) => prev + 1);
      }
    } else {
      if (isRunning) {
        setMistakes((prev) => prev + 1);
        setLastClick({ number: clickedNumber, status: "incorrect" });
      }
    }
  };

  const handlePlayAgain = () => {
    setGameState("settings");
    reset();
  };

  return (
    <div className="schulte-game">
      {gameState === "settings" && (
        <GameLayout
          title={<h2 className="schulte-game__title">Налаштування гри</h2>}
          footer={
            <div className="schulte-game__settings-btns">
              <button
                className="schulte-game__btn"
                onClick={() => handleStartGame(3)}
                aria-label="Почати гру 3x3"
              >
                3x3
              </button>
              <button
                className="schulte-game__btn"
                onClick={() => handleStartGame(5)}
                aria-label="Почати гру 5x5"
              >
                5x5
              </button>
              <button
                className="schulte-game__btn"
                onClick={() => handleStartGame(7)}
                aria-label="Почати гру 7x7"
              >
                7x7
              </button>
            </div>
          }
        >
          <p className="schulte-game__desc">Оберіть розмір таблиці:</p>
        </GameLayout>
      )}

      {gameState === "playing" && (
        <GameLayout
          title={
            <div className="schulte-game__stats">
              <div className="schulte-game__stat">
                <span className="schulte-game__stat-label">Час</span>
                <strong className="schulte-game__stat-value">
                  {formatTime(time)}
                </strong>
              </div>
              <div className="schulte-game__stat schulte-game__stat--target">
                <span className="schulte-game__stat-label">Шукайте</span>
                <strong className="schulte-game__stat-value">
                  {currentTarget}
                </strong>
              </div>
              <div className="schulte-game__stat">
                <span className="schulte-game__stat-label">Помилки</span>
                <strong className="schulte-game__stat-value">{mistakes}</strong>
              </div>
            </div>
          }
          footer={
            <div className="schulte-game__actions">
              <button
                className="btn btn--secondary"
                onClick={handlePlayAgain}
                aria-label="Почати знову"
              >
                Почати знову
              </button>
            </div>
          }
        >
          <div
            className="schulte-game__board"
            style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
          >
            {board.map((number, index) => {
              let cellClassName = "schulte-game__cell";
              if (lastClick.number === number) {
                if (lastClick.status === "correct") {
                  cellClassName += " schulte-game__cell--correct";
                } else if (lastClick.status === "incorrect") {
                  cellClassName += " schulte-game__cell--incorrect";
                }
              }

              return (
                <button
                  key={`${number}-${index}`}
                  className={cellClassName}
                  onClick={() => handleCellClick(number)}
                  aria-label={`Номер ${number}`}
                >
                  {number}
                </button>
              );
            })}
          </div>
        </GameLayout>
      )}

      {gameState === "finished" && (
        <GameLayout
          title={<h2 className="schulte-game__title">Гра завершена!</h2>}
          footer={
            <>
              <button
                className="schulte-game__btn schulte-game__btn--cta"
                onClick={handlePlayAgain}
                aria-label="Спробувати ще раз"
              >
                Спробувати ще
              </button>
              <Link
                to="/stats"
                className="schulte-game__btn schulte-game__btn--secondary"
              >
                Переглянути статистику
              </Link>
            </>
          }
        >
          <div className="schulte-game__stats">
            <p>
              Ваш час: <strong>{formatTime(time)} с</strong>
            </p>
            <p>
              Помилки: <strong>{mistakes}</strong>
            </p>
          </div>
        </GameLayout>
      )}
    </div>
  );
};

export default SchulteTableGame;
