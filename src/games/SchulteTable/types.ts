export interface SchulteGameResult {
  id: string;
  date: string; // (new Date().toISOString())
  time: number;
  mistakes: number;
  boardSize: number;
}
