import type { MoodKey } from "@/constants/moods";
import { createContext, useReducer } from "react";

export type Mood = MoodKey | undefined;

type MoodState = {
  mood: Mood;
  sleep: { bedTime: string; wakeTime: string; quality: number };
  stressLevel: number;
};

type MoodAction =
  | {
      type: "setSelectedMood";
      payload: Mood;
    }
  | { type: "setBedTime"; payload: string }
  | { type: "setWakeTime"; payload: string }
  | { type: "setSleepQuality"; payload: number }
  | { type: "setStressLevel"; payload: number }
  | { type: "reset" };

type MoodContextType = MoodState & {
  dispatch: React.Dispatch<MoodAction>;
};

const MoodContext = createContext({} as MoodContextType);

const initialState: MoodState = {
  mood: undefined,
  sleep: { bedTime: "", wakeTime: "", quality: 1 },
  stressLevel: 1,
};

function reducer(state: MoodState, action: MoodAction): MoodState {
  switch (action.type) {
    case "setSelectedMood":
      return { ...state, mood: action.payload };
    case "setBedTime":
      return {
        ...state,
        sleep: { ...state.sleep, bedTime: action.payload },
      };
    case "setWakeTime":
      return {
        ...state,
        sleep: { ...state.sleep, wakeTime: action.payload },
      };
    case "setSleepQuality":
      return {
        ...state,
        sleep: { ...state.sleep, quality: action.payload },
      };
    case "setStressLevel":
      return {
        ...state,
        stressLevel: action.payload,
      };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown Type.");
  }
}

function MoodProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MoodContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MoodContext.Provider>
  );
}

export { MoodProvider, MoodContext };
