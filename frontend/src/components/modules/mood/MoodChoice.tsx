import { cn } from "@/lib/utils";

function MoodChoice({
  emoji,
  label,
  selectedMood,
  handleSelectMood,
}: {
  emoji: string;
  label: string;
  selectedMood: string | undefined;
  handleSelectMood: (label: string) => void;
}) {
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center gap-2 rounded-2xl py-2 font-semibold select-none",
        selectedMood === label
          ? "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700"
          : "bg-neutral-200 text-black hover:bg-neutral-300 active:bg-neutral-900 active:text-white",
      )}
      onClick={() => handleSelectMood(label)}
    >
      <span className="text-4xl">{emoji}</span>
      <p className="capitalize">{label}</p>
    </div>
  );
}

export default MoodChoice;
