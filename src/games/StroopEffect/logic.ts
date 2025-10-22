import { shuffleArray } from "../../utils/array";
import { type ColorOption, type StroopChallenge } from "./types";

// Наш набір кольорів. Можна розширювати.
export const COLORS: ColorOption[] = [
  { name: "Червоний", code: "#dc3545" },
  { name: "Зелений", code: "#28a745" },
  { name: "Синій", code: "#2c75ff" },
  { name: "Жовтий", code: "#F1C40F" },
  { name: "Фіолетовий", code: "#9B59B6" },
];

// Функція для генерації одного раунду гри
export const generateStroopChallenge = (): StroopChallenge => {
  // Вибираємо два випадкових, але РІЗНИХ кольори
  const [wordColor, textColor] = shuffleArray(COLORS).slice(0, 2);

  // Створюємо варіанти відповідей: правильний + 2 неправильних
  const correctAnswer = textColor.name;
  const wrongAnswers = COLORS.filter((c) => c.name !== correctAnswer) // Беремо всі, крім правильного
    .slice(0, 2) // Вибираємо два з них
    .map((c) => c.name); // Нам потрібні тільки імена

  const options = shuffleArray([correctAnswer, ...wrongAnswers]);

  return {
    word: wordColor.name, // Слово - це назва одного кольору
    color: textColor.code, // А колір тексту - іншого
    correctAnswer: correctAnswer,
    options: options,
  };
};
