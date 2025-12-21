import { createContext, useReducer } from "react";

type Mood =
  | {
      label: string;
      emoji: string;
      description: string;
    }
  | undefined;

type MoodState = {
  selectedMood: Mood;
  sleep: { bedTime: string; wakeTime: string; quality: string };
  stressLevel: number;
};

type MoodAction =
  | {
      type: "setSelectedMood";
      payload: Mood;
    }
  | { type: "setBedTime"; payload: string }
  | { type: "setWakeTime"; payload: string }
  | { type: "setSleepQuality"; payload: string }
  | { type: "setStressLevel"; payload: number };

type MoodContextType = MoodState & {
  dispatch: React.Dispatch<MoodAction>;
};

const MoodContext = createContext({} as MoodContextType);

const initialState: MoodState = {
  selectedMood: undefined,
  sleep: { bedTime: "", wakeTime: "", quality: "poor" },
  stressLevel: 1,
};

function reducer(state: MoodState, action: MoodAction): MoodState {
  switch (action.type) {
    case "setSelectedMood":
      return { ...state, selectedMood: action.payload };
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
