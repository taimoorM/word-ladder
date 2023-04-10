// TimerContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface TimerContextProps {
  time: number;
  timerRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

interface TimerProviderProps {
  initialTime: number;
  onTimeEnd: () => void;
  children: React.ReactNode;
}

export const TimerProvider = ({
  initialTime,
  onTimeEnd,
  children,
}: TimerProviderProps) => {
  const [time, setTime] = useState<number>(initialTime);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTime(initialTime);
  };

  useEffect(() => {
    let timer: number;
    if (timerRunning && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (timerRunning && time === 0) {
      setTimerRunning(false);
      if (onTimeEnd) onTimeEnd();
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [time, timerRunning, onTimeEnd]);

  return (
    <TimerContext.Provider
      value={{ time, timerRunning, startTimer, pauseTimer, resetTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextProps => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
