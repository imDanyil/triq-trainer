import { useState, useRef, useCallback } from "react";

export const useTimer = () => {
  const [time, setTime] = useState(0); // Час у мілісекундах
  const [isRunning, setIsRunning] = useState(false);

  // useRef використовується для зберігання ID інтервалу.
  // На відміну від useState, зміна useRef не викликає перерендер компонента.
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (isRunning) return; // Якщо вже запущено, нічого не робити

    setIsRunning(true);
    const startTime = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 10); // Оновлюємо кожні 10 мс для плавності
  }, [isRunning, time]);

  const stop = useCallback(() => {
    if (!isRunning) return; // Якщо вже зупинено, нічого не робити

    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  return { time, isRunning, start, stop, reset };
};
