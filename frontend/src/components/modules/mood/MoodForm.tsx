import { Card } from "@/components/ui/card";
import MoodChoice from "./MoodChoice";
import { useMood } from "@/contexts/useMood";
import { MOODS, type MoodKey } from "@/constants/moods";
import type { IMood } from "types/mood";

function MoodForm({
  isSubmittedToday,
  moodToday,
}: {
  isSubmittedToday: boolean;
  moodToday: IMood | undefined;
}) {
  const { mood: moodState, dispatch } = useMood();
  return (
    <Card className="w-full p-4 md:col-span-2 lg:col-span-3">
      <p className="text-2xl font-semibold select-none">
        What's your mood today?
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {Object.entries(MOODS).map(([key, mood]) => (
          <MoodChoice
            key={key}
            moodKey={key as MoodKey}
            mood={mood}
            selectedMood={isSubmittedToday ? moodToday?.mood : moodState}
            handleSelectMood={() => {
              if (isSubmittedToday) return;
              if (moodState === key) {
                dispatch({ type: "setSelectedMood", payload: undefined });
                return;
              }
              dispatch({ type: "setSelectedMood", payload: key as MoodKey });
            }}
          />
        ))}
      </div>
      <div>
        <p>
          {moodState ? MOODS[moodState].description : "Select your mood today."}
        </p>
      </div>
    </Card>
  );
}

export default MoodForm;
