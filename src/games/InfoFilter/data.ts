import type { Question } from "./types";

// Налаштування системи оцінювання
export const SCORE_CONFIG = {
  BASE_POINTS_CORRECT: 100,
  PENALTY_POINTS_INCORRECT: -50,
  PRECISION_BONUS: 150,
  TIME_VERY_FAST_MS: 1000, // Змінив на 1с для більшої реалістичності
  TIME_FAST_MS: 2000, // 2с
  TIME_NORMAL_MS: 3500, // 3.5с
};

export const DIFFICULTY_CONFIGS = {
  easy: {
    rounds: 3,
    duration: 5000, // 5 секунд на відповідь
  },
  medium: {
    rounds: 5,
    duration: 4000, // 3.5 секунди
  },
  hard: {
    rounds: 7,
    duration: 3500, // 2.5 секунди
  },
};

export const QUESTIONS_DATA: Question[] = [
  {
    id: 1,
    text: "Лікарі в шоці! Ця лимонна вода лікує ВСІ хвороби за один день! Дізнайся секрет!",
    correctAnswer: "FAKE",
  },
  {
    id: 2,
    text: "УВАГА! В міському парку помітили АГРЕСИВНИХ вовків! Влада приховує правду!",
    correctAnswer: "FAKE",
  },
  {
    id: 3,
    text: "Терміново! Зароби 10 000 грн за годину, просто інвестуючи в нову супер-криптовалюту! Пропозиція діє лише 60 хвилин!",
    correctAnswer: "FAKE",
  },
  {
    id: 4,
    text: "Дослідження показали: щоденна 15-хвилинна прогулянка на свіжому повітрі покращує настрій та пам'ять.",
    correctAnswer: "FACT",
  },
  {
    id: 5,
    text: "Цей йогурт містить унікальні бактерії, які подовжують життя на 5 років! Завтра дорожче!",
    correctAnswer: "FAKE",
  },
  {
    id: 6,
    text: "Ця диво-олія вилікувала мою бабусю від усіх хвороб за один день! Купуйте зараз, кількість обмежена!",
    correctAnswer: "FAKE",
  },
  {
    id: 7,
    text: "Доведено: регулярні тренування мозку, такі як розв'язування головоломок, можуть уповільнити розумове старіння.",
    correctAnswer: "FACT",
  },
  {
    id: 8,
    text: "Згідно з останніми даними, понад 5 мільярдів людей у світі користуються Інтернетом.",
    correctAnswer: "FACT",
  },
];
