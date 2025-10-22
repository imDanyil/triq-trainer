export type GameLevel = "easy" | "medium" | "hard";
export type ElementType = "numbers"; // Поки що тільки цифри

// Описує налаштування для кожного рівня складності
export type LevelConfig = {
  length: number; // Кількість елементів у послідовності
  displayTime: number; // Час показу в мілісекундах
};

export const LEVEL_CONFIGS: Record<GameLevel, LevelConfig> = {
  easy: { length: 6, displayTime: 4000 },
  medium: { length: 6, displayTime: 3000 },
  hard: { length: 8, displayTime: 3000 },
};
