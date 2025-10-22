// Описує один колір
export interface ColorOption {
  name: string; // Назва українською, напр. "Червоний"
  code: string; // HEX-код, напр. "#E74C3C"
}

// Описує одне завдання для гравця
export interface StroopChallenge {
  word: string; // Слово, яке буде показано (назва кольору)
  color: string; // Колір, яким буде написано слово (HEX-код)
  correctAnswer: string; // Правильна відповідь (назва кольору)
  options: string[]; // Варіанти відповідей для кнопок
}
