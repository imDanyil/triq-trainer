import { shuffleArray } from "../../utils/array";

/**
 * Генерує дошку для гри в Таблицю Шульте.
 * @param size - Розмір сторони квадрата (напр., 5 для таблиці 5x5).
 * @returns Перемішаний масив чисел від 1 до size*size.
 */
export const generateSchulteBoard = (size: number): number[] => {
  const totalCells = size * size;
  const initialBoard = Array.from({ length: totalCells }, (_, i) => i + 1);
  return shuffleArray(initialBoard);
};
