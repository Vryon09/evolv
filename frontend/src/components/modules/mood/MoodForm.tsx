import { Card } from "@/components/ui/card";
import { useState } from "react";
import MoodChoice from "./MoodChoice";
import { Button } from "@/components/ui/button";

const moods = [
  { emoji: "😭", label: "miserable" },
  { emoji: "😞", label: "bad" },
  { emoji: "😕", label: "displeased" },
  { emoji: "😐", label: "okay" },
  { emoji: "😀", label: "good" },
  { emoji: "😁", label: "happy" },
  { emoji: "😆", label: "joyful" },
];

type IMood = (typeof moods)[number]["label"];

function MoodForm() {
  const [selectedMood, setSelectedMood] = useState<IMood | undefined>(
    undefined,
  );

  return (
    <Card className="w-full p-4">
      <p className="text-2xl font-semibold">What's your mood today?</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {moods.map((mood, i) => (
          <MoodChoice
            emoji={mood.emoji}
            label={mood.label}
            selectedMood={selectedMood}
            handleSelectMood={(label) => {
              if (label === selectedMood) {
                setSelectedMood(undefined);
                return;
              }
              setSelectedMood(label);
            }}
            key={i}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          disabled={selectedMood === undefined}
          className="cursor-pointer px-8 py-4 text-lg"
        >
          Submit
        </Button>
      </div>
    </Card>
  );
}

export default MoodForm;
