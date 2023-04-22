// TimerContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface TimerContextProps {
  time: number;
  timeEnd: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

interface TimerProviderProps {
  initialTime: number;
  children: React.ReactNode;
}

export const TimerProvider = ({
  initialTime,
  children,
}: TimerProviderProps) => {
  const [time, setTime] = useState<number>(initialTime);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timeEnd, setTimeEnd] = useState(false);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTime(initialTime);
    setTimeEnd(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (timerRunning && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (timerRunning && time === 0) {
      setTimerRunning(false);
      setTimeEnd(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [time, timerRunning]);

  return (
    <TimerContext.Provider
      value={{ time, timeEnd, startTimer, pauseTimer, resetTimer }}
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
