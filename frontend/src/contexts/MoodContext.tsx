import type { MoodKey } from "@/constants/moods";
import { createContext, useReducer } from "react";
import type { IHabit } from "types/habit";

//Add mood impact in Mood Schema

type MoodState = {
  mood: MoodKey | undefined;
  sleep: { bedTime: string; wakeTime: string; quality: number };
  stressLevel: number;
  physicalActivity: number;
  selectedHabits: (IHabit & { moodImpact: number })[] | [];
};

type MoodAction =
  | {
      type: "setSelectedMood";
      payload: MoodKey | undefined;
    }
  | { type: "setBedTime"; payload: string }
  | { type: "setWakeTime"; payload: string }
  | { type: "setSleepQuality"; payload: number }
  | { type: "setStressLevel"; payload: number }
  | { type: "setPhysicalActivity"; payload: number }
  | { type: "addSelectedHabit"; payload: IHabit & { moodImpact: number } }
  | { type: "deleteSelectedHabit"; payload: string }
  | {
      type: "setHabitMoodImpact";
      payload: { id: string; value: number };
    }
  | { type: "reset" };

type MoodContextType = MoodState & {
  dispatch: React.Dispatch<MoodAction>;
};

const MoodContext = createContext({} as MoodContextType);

const initialState: MoodState = {
  mood: undefined,
  sleep: { bedTime: "", wakeTime: "", quality: 1 },
  stressLevel: 1,
  physicalActivity: 1,
  selectedHabits: [],
};

function reducer(state: MoodState, action: MoodAction): MoodState {
  let updatedSelectedHabits = state.selectedHabits;

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
    case "setPhysicalActivity":
      return {
        ...state,
        physicalActivity: action.payload,
      };
    case "addSelectedHabit":
      return {
        ...state,
        selectedHabits: [...state.selectedHabits, action.payload],
      };
    case "deleteSelectedHabit":
      if (state.selectedHabits) {
        updatedSelectedHabits = state.selectedHabits.filter(
          (habit) => habit._id !== action.payload,
        );
      }
      return {
        ...state,
        selectedHabits: updatedSelectedHabits,
      };
    case "setHabitMoodImpact":
      updatedSelectedHabits = state.selectedHabits.map((habit) =>
        habit._id === action.payload.id
          ? { ...habit, moodImpact: action.payload.value }
          : habit,
      );
      return { ...state, selectedHabits: updatedSelectedHabits };
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
