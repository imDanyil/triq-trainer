/**
 * Генерує випадкову послідовність унікальних цифр.
 * @param length - Довжина послідовності.
 * @returns Масив з випадковими цифрами.
 */
export const generateNumberSequence = (length: number): number[] => {
  const allNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Перемішуємо масив всіх можливих цифр
  for (let i = allNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
  }

  // Повертаємо перші 'length' елементів з перемішаного масиву
  return allNumbers.slice(0, length);
};
