import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PHYSICALACTIVITIES } from "@/constants/physicalActivities";
import { useMood } from "@/contexts/useMood";
import type { IMood } from "types/mood";

function PhysicalActivityForm({
  isSubmittedToday,
  moodToday,
}: {
  isSubmittedToday: boolean;
  moodToday: IMood | undefined;
}) {
  const { physicalActivity, dispatch } = useMood();

  return (
    <Card className="h-fit p-4">
      <div>
        <p className="mb-4 text-xl font-semibold">Physical Activity</p>
        <RadioGroup
          value={
            isSubmittedToday
              ? `${moodToday?.physicalActivity}`
              : `${physicalActivity}`
          }
          onValueChange={(value) => {
            if (isSubmittedToday) return;
            dispatch({ type: "setPhysicalActivity", payload: +value });
          }}
          className="flex flex-col justify-between"
        >
          {Object.entries(PHYSICALACTIVITIES).map(([key, level]) => (
            <div key={key} className="flex gap-2">
              <RadioGroupItem
                value={`${key}`}
                className="cursor-pointer border-neutral-400"
              />
              <Label className="capitalize">{level.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </Card>
  );
}

export default PhysicalActivityForm;
