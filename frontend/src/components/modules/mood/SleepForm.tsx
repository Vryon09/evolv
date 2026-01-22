import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SLEEPQUALITIES } from "@/constants/sleepQualities";
import { useMood } from "@/contexts/useMood";
import dayjs from "dayjs";
import type { IMood } from "types/mood";

function SleepForm({
  isSubmittedToday,
  moodToday,
}: {
  isSubmittedToday: boolean;
  moodToday: IMood | undefined;
}) {
  const { sleep, dispatch } = useMood();

  return (
    <Card className="p-4 md:col-span-2 lg:col-span-1 lg:flex">
      <div>
        <p className="mb-8 text-xl font-semibold">How long did you sleep?</p>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>What time did you sleep?</Label>
            <Input
              type="datetime-local"
              value={
                isSubmittedToday
                  ? dayjs(moodToday?.sleep.bedTime).format("YYYY-MM-DDTHH:mm")
                  : sleep.bedTime
              }
              onChange={(e) => {
                if (isSubmittedToday) return;
                dispatch({ type: "setBedTime", payload: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>What time did you wake up?</Label>
            <Input
              type="datetime-local"
              value={
                isSubmittedToday
                  ? dayjs(moodToday?.sleep.wakeTime).format("YYYY-MM-DDTHH:mm")
                  : sleep.wakeTime
              }
              onChange={(e) => {
                if (isSubmittedToday) return;
                dispatch({ type: "setWakeTime", payload: e.target.value });
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="mb-8 text-xl font-semibold">How is your sleep?</p>
        <RadioGroup
          value={
            isSubmittedToday
              ? `${moodToday?.sleep.quality}`
              : `${sleep.quality}`
          }
          onValueChange={(value) => {
            if (isSubmittedToday) return;
            dispatch({ type: "setSleepQuality", payload: +value });
          }}
          className="flex justify-between"
        >
          {Object.entries(SLEEPQUALITIES).map(([key, level]) => (
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

export default SleepForm;
