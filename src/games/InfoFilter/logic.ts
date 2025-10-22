import { SCORE_CONFIG } from "./data";

interface ScoreCalculationResult {
  points: number;
  speedBonusName: string;
}

export const calculateAnswerScore = (
  responseTime: number,
  isCorrect: boolean
): ScoreCalculationResult => {
  if (!isCorrect) {
    return {
      points: SCORE_CONFIG.PENALTY_POINTS_INCORRECT,
      speedBonusName: "Неточність",
    };
  }

  let speedBonus = 0;
  let speedBonusName = "Не поспішай!";

  if (responseTime <= SCORE_CONFIG.TIME_VERY_FAST_MS) {
    speedBonus = 50;
    speedBonusName = "Блискавична Швидкість!";
  } else if (responseTime <= SCORE_CONFIG.TIME_FAST_MS) {
    speedBonus = 20;
    speedBonusName = "Турбо-Швидкість!";
  } else if (responseTime <= SCORE_CONFIG.TIME_NORMAL_MS) {
    speedBonus = 10;
    speedBonusName = "Хороша Швидкість!";
  }

  return {
    points: SCORE_CONFIG.BASE_POINTS_CORRECT + speedBonus,
    speedBonusName: speedBonusName,
  };
};
