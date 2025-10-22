export type AnswerOption = "FACT" | "FAKE";

export interface Question {
  id: number;
  text: string;
  correctAnswer: AnswerOption;
}

// Результат відповіді на одне запитання
export interface AnswerResult {
  questionId: number;
  isCorrect: boolean;
  responseTime: number; // в мілісекундах
  points: number;
  speedBonusName: string;
}
