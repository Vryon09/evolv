import { useContext } from "react";
import { PomodoroTimerContext } from "./PomodoroTimerContext";

export function usePomodoroTimer() {
  const context = useContext(PomodoroTimerContext);
  if (context === undefined)
    throw new Error("PomodoroTimerContext is used outside the ItemsProvider.");
  return context;
}
