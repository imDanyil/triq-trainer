import React from "react";
import "../../styles/TimerBar.css";

interface TimerBarProps {
  progress: number; // Прогрес від 1 (100%) до 0 (0%)
}

const TimerBar: React.FC<TimerBarProps> = ({ progress }) => {
  // Переконуємось, що прогрес в межах 0-1
  const safeProgress = Math.max(0, Math.min(1, progress));

  return (
    <div className="timer-bar">
      <div
        className="timer-bar__progress"
        style={{ transform: `scaleX(${safeProgress})` }}
      ></div>
    </div>
  );
};

export default TimerBar;
