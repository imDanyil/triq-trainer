import React from "react";
import { buildTrainerPath } from "../utils/pathBuilder";
import SchulteTableGame from "../games/SchulteTable/SchulteTableGame";
import StroopEffectGame from "../games/StroopEffect/StroopEffectGame";
import InstantRecallGame from "../games/InstantRecall/InstantRecallGame";
import ViralPuzzleGame from "../games/ViralPuzzle/ViralPuzzleGame";
import InfoFilterGame from "../games/InfoFilter/InfoFilterGame";

export interface TrainerConfig {
  id: string; // Унікальний ідентифікатор, будемо використовувати в URL
  path: string; //  Шлях для роутера
  name: string; // Назва для меню/посилань
  title: string; // Заголовок H1 на сторінці
  description: string; // Опис <p> на сторінці
  Component: React.FC; // Сам компонент тренажера
}

const trainerData = [
  {
    id: "eye-scan",
    // path: "/trainer/eye-scan",
    name: "Сканування Поглядом",
    title: "Тренажер: Сканування Поглядом",
    description: "Знайдіть та натисніть на числа по порядку від 1 до N.",
    Component: SchulteTableGame,
  },
  {
    id: "color-clash",
    // path: "/trainer/color-clash",
    name: "Кольоровий Конфлікт",
    title: "Тренажер: Кольоровий Конфлікт",
    description: "Назвіть колір, яким написано слово, а не саме слово.",
    Component: StroopEffectGame,
  },
  {
    id: "instant-recall",
    // path: "/trainer/instant-recall",
    name: "Миттєвий Спогад",
    title: "Тренажер: Миттєвий Спогад",
    description: "Запам'ятайте та відтворіть положення клітинок.",
    Component: InstantRecallGame,
  },
  {
    id: "viral-puzzle",
    // path: "/trainer/instant-recall",
    name: "Вірусна Головоломка",
    title: "Тренажер: Вірусна Головоломка",
    description:
      "Навчіться відрізняти факти від маніпуляцій у потоці інформації.",
    Component: ViralPuzzleGame,
  },
  {
    id: "info-filter",
    // path: "/trainer/instant-recall",
    name: "Інфо-фільтр",
    title: "Тренажер: Інфо-фільтр",
    description:
      "Тренуйте критичне мислення та вчіться розпізнавати маніпуляції.",
    Component: InfoFilterGame,
  },
];

export const trainers: TrainerConfig[] = trainerData.map((trainer) => ({
  ...trainer,
  path: buildTrainerPath(trainer.id), // <-- Ось магія!
}));

export const trainersMap: Record<string, TrainerConfig> = trainers.reduce(
  (acc, trainer) => {
    acc[trainer.id] = trainer;
    return acc;
  },
  {} as Record<string, TrainerConfig>
);
