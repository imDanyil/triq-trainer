import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { generateSchulteBoard } from "./logic";
import { useTimer } from "../../hooks/useTimer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { SchulteGameResult } from "./types";

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
    // start();

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
    <div className="game">
      {gameState === "settings" && (
        <div className="game__settings">
          <h2 className="game__title">Налаштування гри</h2>
          <p className="game__desc">Оберіть розмір таблиці:</p>
          <div className="game__settings-btns">
            <button
              className="btn game__btn"
              onClick={() => handleStartGame(3)}
            >
              3x3
            </button>
            <button
              className="btn game__btn"
              onClick={() => handleStartGame(5)}
            >
              5x5
            </button>
            <button
              className="btn game__btn"
              onClick={() => handleStartGame(7)}
            >
              7x7
            </button>
          </div>
        </div>
      )}

      {gameState === "playing" && (
        <div className="game__dashboard">
          <div className="game__stats">
            <div className="game__stat">
              <span className="game__stat-label">Час</span>
              <strong className="game__stat-value">{formatTime(time)}</strong>
            </div>
            <div className="game__stat game__stat--target">
              <span className="game__stat-label">Шукайте</span>
              <strong className="game__stat-value">{currentTarget}</strong>
            </div>
            <div className="game__stat">
              <span className="game__stat-label">Помилки</span>
              <strong className="game__stat-value">{mistakes}</strong>
            </div>
          </div>

          <div
            className="game__board"
            style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
          >
            {board.map((number) => {
              let cellClassName = "btn game__cell";
              if (lastClick.number === number) {
                if (lastClick.status === "correct") {
                  cellClassName += " game__cell--correct";
                } else if (lastClick.status === "incorrect") {
                  cellClassName += " game__cell--incorrect";
                }
              }

              return (
                <button
                  key={number}
                  className={cellClassName}
                  onClick={() => handleCellClick(number)}
                >
                  {number}
                </button>
              );
            })}
          </div>

          <div className="game__actions">
            <button
              className="btn btn--secondary game__btn"
              onClick={handlePlayAgain}
            >
              Почати знову
            </button>
          </div>
        </div>
      )}

      {gameState === "finished" && (
        <div className="game__results">
          <h2 className="game__title">Гра завершена!</h2>
          <div className="game__stats">
            <p>
              Ваш час: <strong>{formatTime(time)} с</strong>
            </p>
            <p>
              Помилки: <strong>{mistakes}</strong>
            </p>
          </div>
          <button className="btn btn--cta game__btn" onClick={handlePlayAgain}>
            Спробувати ще
          </button>
          <Link to="/stats" className="btn btn--secondary">
            Переглянути статистику
          </Link>
        </div>
      )}
    </div>
  );

  // if (gameState === "settings") {
  //   return (
  //     <div>
  //       <h2>Налаштування гри</h2>
  //       <p>Оберіть розмір таблиці:</p>
  //       <div className="settings-container">
  //         <button onClick={() => handleStartGame(3)}>3x3</button>
  //         <button onClick={() => handleStartGame(5)}>5x5</button>
  //         <button onClick={() => handleStartGame(7)}>7x7</button>
  //       </div>
  //     </div>
  //   );
  // }

  // if (gameState === "finished") {
  //   return (
  //     <div className="results-container">
  //       <h2>Гра завершена!</h2>
  //       <div className="stats">
  //         <p>
  //           Ваш час: <strong>{formatTime(time)} с</strong>
  //         </p>
  //         <p>
  //           Помилки: <strong>{mistakes}</strong>
  //         </p>
  //       </div>
  //       <button onClick={handlePlayAgain}>Спробувати ще</button>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="game-container">
  //     <div className="game-stats-bar">
  //       <span>Час: {formatTime(time)}</span>
  //       <span>
  //         Шукайте: <strong>{currentTarget}</strong>
  //       </span>
  //       <span>Помилки: {mistakes}</span>
  //     </div>
  //     <div
  //       className="schulte-board"
  //       style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
  //     >
  //       {board.map((number) => (
  //         <button
  //           key={number}
  //           className="schulte-cell"
  //           onClick={() => handleCellClick(number)}
  //         >
  //           {number}
  //         </button>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default SchulteTableGame;
