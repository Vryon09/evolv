import { createContext, useReducer } from "react";

type Mood =
  | {
      label:
        | "miserable"
        | "bad"
        | "displeased"
        | "okay"
        | "good"
        | "happy"
        | "joyful"
        | undefined;
      emoji: string;
      description: string;
    }
  | undefined;

type MoodState = {
  selectedMood: Mood;
};

type MoodAction = {
  type: "setSelectedMood";
  payload: Mood;
};

type MoodContextType = MoodState & {
  dispatch: React.Dispatch<MoodAction>;
};

const MoodContext = createContext({} as MoodContextType);

const initialState: MoodState = {
  selectedMood: undefined,
};

function reducer(state: MoodState, action: MoodAction): MoodState {
  switch (action.type) {
    case "setSelectedMood":
      return { ...state, selectedMood: action.payload };
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
