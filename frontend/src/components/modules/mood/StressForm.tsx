import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useMood } from "@/contexts/useMood";
import type { IMood } from "types/mood";

function StressForm({
  isSubmittedToday,
  moodToday,
}: {
  isSubmittedToday: boolean;
  moodToday: IMood | undefined;
}) {
  const { stressLevel, dispatch } = useMood();

  return (
    <Card className="h-fit p-4">
      <div className="space-y-8">
        <p className="text-xl font-semibold">
          {isSubmittedToday
            ? "This is how stress are you!"
            : "How stress are you?"}
        </p>
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Slider
              value={
                isSubmittedToday
                  ? [moodToday?.stressLevel ? moodToday?.stressLevel : 1]
                  : [stressLevel]
              }
              max={5}
              min={1}
              onValueChange={(value) => {
                if (isSubmittedToday) return;
                dispatch({ type: "setStressLevel", payload: value[0] });
              }}
            />
            <div className="flex justify-between">
              <p>Low</p>
              <p className="font-semibold">
                {isSubmittedToday ? moodToday?.stressLevel : stressLevel}
              </p>
              <p>High</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default StressForm;
