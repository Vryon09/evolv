import { Card } from "@/components/ui/card";
import { useState } from "react";
import MoodChoice from "./MoodChoice";

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

export interface IMood {
  emoji: string;
  label: string;
  description: string;
}

function MoodForm() {
  const [selectedMood, setSelectedMood] = useState<IMood | undefined>(
    undefined,
  );

  return (
    <Card className="w-full p-4 md:col-span-2 lg:col-span-3">
      <p className="text-2xl font-semibold select-none">
        What's your mood today?
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {moods.map((mood, i) => (
          <MoodChoice
            mood={mood}
            selectedMood={selectedMood}
            handleSelectMood={(selMood) => {
              if (selMood.label === selectedMood?.label) {
                setSelectedMood(undefined);
                return;
              }
              setSelectedMood(selMood);
            }}
            key={i}
          />
        ))}
      </div>
      <div>
        <p>
          {selectedMood ? selectedMood.description : "Select your mood today."}
        </p>
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
