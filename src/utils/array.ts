// Алгоритм перемішування Фішера-Єйтса
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array]; // Створюємо копію, щоб не змінювати оригінальний масив
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Міняємо елементи місцями
  }
  return newArray;
};
