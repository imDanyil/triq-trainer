export interface Puzzle {
  id: number;
  scenario: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}
