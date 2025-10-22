import React, { useState, useEffect } from "react";
import { useTimer } from "../../hooks/useTimer";
import type { GameLevel } from "./types";
import { LEVEL_CONFIGS } from "./types";
import { generateNumberSequence } from "./logic";
import { shuffleArray } from "../../utils/array";
import "../../styles/InstantRecallPage.css";

type GameState = "settings" | "memorize" | "recall" | "finished";

const ALL_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const InstantRecallGame: React.FC = () => {
  // --- Стани гри ---
  const [gameState, setGameState] = useState<GameState>("settings");
  const [level, setLevel] = useState<GameLevel>("easy");
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<number[]>([]);
  const {
    time,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
  } = useTimer();

  // --- Життєвий цикл гри ---

  // Ефект для переходу від 'memorize' до 'recall'
  useEffect(() => {
    if (gameState === "memorize") {
      const config = LEVEL_CONFIGS[level];
      const timerId = setTimeout(() => {
        setShuffledOptions(shuffleArray(ALL_NUMBERS));
        setGameState("recall");
        startTimer(); // Запускаємо таймер тільки коли користувач починає відтворювати
      }, config.displayTime);

      return () => clearTimeout(timerId);
    }
  }, [gameState, level, startTimer]);

  const handleStartGame = () => {
    const config = LEVEL_CONFIGS[level];
    setSequence(generateNumberSequence(config.length));
    setPlayerInput([]);
    resetTimer();
    setGameState("memorize");
  };

  const handleOptionClick = (num: number) => {
    if (playerInput.length >= sequence.length) {
      return;
    }

    const newInput = [...playerInput, num];
    setPlayerInput(newInput);

    if (newInput.length === sequence.length) {
      stopTimer();
      setGameState("finished");
    }
  };

  const handlePlayAgain = () => {
    setGameState("settings");
  };

  // [Screen 1]
  if (gameState === "settings") {
    return (
      <div className="game-settings">
        <h2 className="game-settings__title">Налаштування</h2>
        <div className="game-settings__options">
          <label className="game-settings__label">Рівень складності:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as GameLevel)}
            className="game-settings__select"
          >
            <option value="easy">Легкий (6 цифр, 4 секунди)</option>
            <option value="medium">Середній (6 цифр, 3 секунди)</option>
            <option value="hard">Складний (8 цифр, 3 секунди)</option>
          </select>
        </div>
        <button onClick={handleStartGame} className="btn btn--primary">
          Почати
        </button>
      </div>
    );
  }

  // [Screen 2]
  if (gameState === "memorize") {
    return (
      <div className="memorize-screen">
        <p className="memorize-screen__prompt">Запам'ятай:</p>
        <div className="sequence-display">
          {sequence.map((num, index) => (
            <div key={index} className="sequence-display__item">
              {num}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // [Screen 3]
  if (gameState === "recall") {
    const displaySlots = Array(sequence.length)
      .fill(null)
      .map((_, index) => {
        return playerInput[index] !== undefined ? playerInput[index] : "_";
      });

    return (
      <div className="recall-screen">
        <div className="recall-screen__prompt">
          <p>Відтвори послідовність. Твій час: {(time / 1000).toFixed(2)}</p>
        </div>
        <div className="recall-screen__input-display">
          {displaySlots.map((slot, index) => (
            <div
              key={index}
              className={`recall-screen__input-item ${
                slot === "_" ? "recall-screen__input-item--empty" : ""
              }`}
            >
              {slot}
            </div>
          ))}
        </div>
        <div className="options-grid">
          {shuffledOptions.map((num) => (
            <button
              key={num}
              onClick={() => handleOptionClick(num)}
              className="options-grid__button"
            >
              {num}
            </button>
          ))}
        </div>
        <div className="game__actions">
          <button
            className="btn btn--secondary"
            onClick={handlePlayAgain}
            aria-label="Почати знову"
          >
            Почати знову
          </button>
        </div>
      </div>
    );
  }

  // [Screen 4]
  if (gameState === "finished") {
    const correctAnswers = sequence.reduce((count, current, index) => {
      return current === playerInput[index] ? count + 1 : count;
    }, 0);
    const isPerfect = correctAnswers === sequence.length;

    return (
      <div className="results-screen">
        <h2 className="results-screen__title">
          {isPerfect ? "Молодець!" : "Майже..."}
        </h2>
        <p className="results-screen__info">
          Правильна послідовність: <strong>{sequence.join(" - ")}</strong>
        </p>
        {!isPerfect && (
          <p className="results-screen__info">
            Ваша відповідь: <strong>{playerInput.join(" - ")}</strong>
          </p>
        )}
        <p className="results-screen__stat">
          Час: {(time / 1000).toFixed(2)} сек
        </p>
        <p className="results-screen__stat">
          Точність: {correctAnswers} / {sequence.length}
        </p>
        <button onClick={handlePlayAgain} className="btn btn--primary">
          Спробувати ще
        </button>
      </div>
    );
  }

  return null;
};

export default InstantRecallGame;
