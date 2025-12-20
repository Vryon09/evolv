import { useContext } from "react";
import { MoodContext } from "./MoodContext";

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined)
    throw new Error("MoodContext is used outside the ItemsProvider.");
  return context;
}
