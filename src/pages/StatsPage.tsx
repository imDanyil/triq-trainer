import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { type SchulteGameResult } from "../games/SchulteTable/types";
import "../styles/StatsPage.css";

const findBestResults = (history: SchulteGameResult[]): Set<string> => {
  const bests: { [key: number]: SchulteGameResult } = {};

  history.forEach((result) => {
    const size = result.boardSize;
    const currentBest = bests[size];

    // Якщо для цього розміру ще немає рекорду, або новий результат кращий
    if (
      !currentBest ||
      result.time < currentBest.time ||
      (result.time === currentBest.time &&
        result.mistakes < currentBest.mistakes)
    ) {
      bests[size] = result;
    }
  });

  // Повертаємо Set з ID найкращих результатів для швидкого доступу
  return new Set(Object.values(bests).map((r) => r.id));
};

const StatsPage: React.FC = () => {
  // Отримуємо історію ігор. Нам потрібна тільки функція читання, тому другий елемент масиву ігноруємо.
  const [gameHistory, setGameHistory] = useLocalStorage<SchulteGameResult[]>(
    "schulte-game-history",
    []
  );

  // Сортуємо результати так, щоб найновіші були зверху
  const sortedHistory = [...gameHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const bestResultIds = findBestResults(gameHistory);

  const handleClearHistory = () => {
    // Показуємо вікно підтвердження
    const isConfirmed = window.confirm(
      'Ви впевнені, що хочете видалити всю історію для "Таблиці Шульте"? Цю дію неможливо буде скасувати.'
    );

    // Якщо користувач натиснув "OK", то isConfirmed буде true
    if (isConfirmed) {
      setGameHistory([]); // <-- Це оновить стан і очистить localStorage!
      console.log("Історія очищена.");
    }
  };

  // Якщо історія порожня, показуємо відповідне повідомлення
  if (sortedHistory.length === 0) {
    return (
      <div className="stats-page-container">
        <h1>Моя статистика</h1>
        <p>Ви ще не зіграли жодної гри в "Таблицю Шульте".</p>
        <p>Зіграйте, щоб побачити тут свої результати!</p>
      </div>
    );
  }

  return (
    <div className="stats-page-container">
      <h1>Моя статистика</h1>

      <button onClick={handleClearHistory} className="btn clear-history-button">
        Очистити історію
      </button>

      <h2>Таблиця Шульте</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th></th>
            <th>Розмір</th>
            <th>Час (сек)</th>
            <th>Помилки</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((result) => (
            <tr
              key={result.id}
              className={bestResultIds.has(result.id) ? "best-result" : ""}
            >
              <td>{new Date(result.date).toLocaleString("uk-UA")}</td>
              <td>{bestResultIds.has(result.id) && "🏆"}</td>
              <td>
                {result.boardSize}x{result.boardSize}
              </td>
              <td>{(result.time / 1000).toFixed(2)}</td>
              <td>{result.mistakes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsPage;
