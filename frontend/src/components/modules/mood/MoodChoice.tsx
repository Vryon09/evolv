import type { MoodKey } from "@/constants/moods";
import { cn } from "@/lib/utils";

export interface MoodType {
  emoji: string;
  label: string;
  description: string;
}

function MoodChoice({
  moodKey,
  mood,
  selectedMood,
  handleSelectMood,
}: {
  moodKey: MoodKey;
  mood: MoodType;
  selectedMood: MoodKey | undefined;
  handleSelectMood: () => void;
}) {
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center gap-2 rounded-2xl py-2 font-semibold select-none",
        selectedMood === moodKey
          ? "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700"
          : "bg-neutral-200 text-black hover:bg-neutral-300 active:bg-neutral-900 active:text-white",
      )}
      onClick={handleSelectMood}
    >
      <span className="text-4xl">{mood.emoji}</span>
      <p className="capitalize">{mood.label}</p>
    </div>
  );
}

export default MoodChoice;
