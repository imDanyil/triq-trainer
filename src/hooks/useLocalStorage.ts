import { useState } from "react";

// Наш хук буде універсальним (generic), щоб працювати з будь-яким типом даних
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Функція для читання значення з localStorage
  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      // Якщо щось є - парсимо JSON, якщо ні - повертаємо початкове значення
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  // Використовуємо useState, щоб зберігати поточне значення в стані компонента
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Функція для оновлення значення. Вона буде нашим новим "setValue"
  const setValue = (value: T) => {
    try {
      // Зберігаємо нове значення в localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
      // Оновлюємо стан React, щоб UI оновився
      setStoredValue(value);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue];
}
