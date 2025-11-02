import type { IPomodoroSettings } from "@/components/modules/habit/PomodoroSettings";
import { createContext, useReducer } from "react";

type PomodoroTimerState = {
  timerType: "pomodoro" | "short" | "long";
  time: number;
  timerState: "idle" | "paused" | "running";
  pomodoroSettings: IPomodoroSettings;
  isPomodoroSettingsOpen: boolean;
  pomodoroCount: number;
};

type PomodoroTimerAction =
  | {
      type: "setPomodoroSettings";
      payload: IPomodoroSettings;
    }
  | { type: "setTime"; payload: number }
  | { type: "setTimerState"; payload: "idle" | "paused" | "running" }
  | { type: "setPomodoroCount"; payload: number }
  | { type: "setTimerType"; payload: "pomodoro" | "short" | "long" }
  | { type: "setIsPomodoroSettingsOpen"; payload: boolean };

type PomodoroTimerContextType = PomodoroTimerState & {
  dispatch: React.Dispatch<PomodoroTimerAction>;
};

const PomodoroTimerContext = createContext({} as PomodoroTimerContextType);

const initialState: PomodoroTimerState = {
  timerType: "pomodoro",
  time: 25 * 60,
  timerState: "idle",
  pomodoroSettings: {
    pomodoro: 0,
    short: 0,
    long: 0,
    autoPomodoro: false,
    autoBreak: false,
    longBreakInterval: 0,
  },
  isPomodoroSettingsOpen: false,
  pomodoroCount: 1,
};

function reducer(
  state: PomodoroTimerState,
  action: PomodoroTimerAction,
): PomodoroTimerState {
  switch (action.type) {
    case "setPomodoroSettings":
      return { ...state, pomodoroSettings: action.payload };
    case "setTime":
      return { ...state, time: action.payload };
    case "setTimerState":
      return { ...state, timerState: action.payload };
    case "setPomodoroCount":
      return { ...state, pomodoroCount: action.payload };
    case "setTimerType":
      return { ...state, timerType: action.payload };
    case "setIsPomodoroSettingsOpen":
      return { ...state, isPomodoroSettingsOpen: action.payload };
    default:
      throw new Error("Unknown Type.");
  }
}

function PomodoroTimerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PomodoroTimerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PomodoroTimerContext.Provider>
  );
}

export { PomodoroTimerProvider, PomodoroTimerContext };
