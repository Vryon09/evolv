import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMood } from "@/contexts/useMood";

const sleepQualityLevels = ["poor", "fair", "good", "great"];

function SleepForm() {
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
              value={sleep.bedTime}
              onChange={(e) =>
                dispatch({ type: "setBedTime", payload: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>What time did you wake up?</Label>
            <Input
              type="datetime-local"
              value={sleep.wakeTime}
              onChange={(e) =>
                dispatch({ type: "setWakeTime", payload: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div>
        <p className="mb-8 text-xl font-semibold">How is your sleep?</p>
        <RadioGroup
          value={sleep.quality}
          onValueChange={(value) =>
            dispatch({ type: "setSleepQuality", payload: value })
          }
          className="flex justify-between"
        >
          {sleepQualityLevels.map((level, i) => (
            <div key={i} className="flex gap-2">
              <RadioGroupItem
                value={level}
                className="cursor-pointer border-neutral-400"
              />
              <Label className="capitalize">{level}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </Card>
  );
}

export default SleepForm;
