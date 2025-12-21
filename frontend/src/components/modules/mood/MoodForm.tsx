import { Card } from "@/components/ui/card";
// import { useState } from "react";
import MoodChoice from "./MoodChoice";
import { useMood } from "@/contexts/useMood";

const moods = [
  {
    emoji: "😭",
    label: "miserable",
    description: "Feeling awful, very sad, stressed, hopeless",
  },
  {
    emoji: "😞",
    label: "bad",
    description: "Feeling down, frustrated, annoyed",
  },
  {
    emoji: "😕",
    label: "displeased",
    description: "Slightly off, a bit irritable or tired",
  },
  {
    emoji: "😐",
    label: "okay",
    description: "Neither good nor bad, just normal",
  },
  {
    emoji: "😀",
    label: "good",
    description: "Mildly happy, content, satisfied",
  },
  { emoji: "😁", label: "happy", description: "Cheerful, positive, motivated" },
  {
    emoji: "😆",
    label: "joyful",
    description: "Excited, joyful, energetic, very satisfied",
  },
];

function MoodForm() {
  const { mood: moodState, dispatch } = useMood();
  return (
    <Card className="w-full p-4 md:col-span-2 lg:col-span-3">
      <p className="text-2xl font-semibold select-none">
        What's your mood today?
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {moods.map((mood, i) => (
          <MoodChoice
            mood={mood}
            selectedMood={moodState}
            handleSelectMood={(selMood) => {
              if (selMood.label === moodState?.label) {
                dispatch({ type: "setSelectedMood", payload: undefined });
                return;
              }
              dispatch({ type: "setSelectedMood", payload: selMood });
            }}
            key={i}
          />
        ))}
      </div>
      <div>
        <p>{moodState ? moodState.description : "Select your mood today."}</p>
        {/* <Button
          disabled={selectedMood === undefined}
          className="cursor-pointer px-8 py-4 text-lg"
        >
          Submit
        </Button> */}
      </div>
    </Card>
  );
}

export default MoodForm;
