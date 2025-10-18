import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Check, Edit, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

function PomodoroTImer() {
  const [timeData, setTimeData] = useState([
    { type: "pomodoro", time: 25 },
    { type: "short", time: 5 },
    { type: "long", time: 15 },
  ]);
  const [timerType, setTimerType] = useState<number>(0);
  const [timerState, setTimerState] = useState<"idle" | "running">("idle");
  const [isPomodoroTimeEditing, setIsPomodoroTimeEditing] = useState(false);
  const [time, setTime] = useState(25 * 60);

  useEffect(() => {
    if (time === 0) {
      const nextIndex = timerType === timeData.length - 1 ? 0 : timerType + 1;
      setTimerType(nextIndex);
      console.log("Break Time!!");
      setTime(timeData[nextIndex].time * 60);
      setTimerState("idle");
    }

    if (timerState === "idle") return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, timerState, timeData, timerType]);

  function formatTime(seconds: number) {
    const date = new Date(seconds * 1000);

    return format(date, "mm:ss");
  }

  return (
    <Card className="mt-8 max-w-[500px] p-6">
      <div className="flex items-center justify-between">
        <h3>
          <span className="capitalize">{timeData[timerType].type}</span> Timer
        </h3>

        {timerState === "idle" && (
          <form className="flex gap-2">
            <Input
              disabled={!isPomodoroTimeEditing}
              className="w-16"
              type="number"
              value={timeData[timerType].time}
              onChange={(e) => {
                if (timeData[timerType].time <= 1) {
                  setTimeData((prev) => {
                    return prev.map((data, i) =>
                      i === timerType ? { ...data, time: 2 } : data,
                    );
                  });
                  return;
                }

                setTimeData((prev) => {
                  return prev.map((data, i) =>
                    i === timerType ? { ...data, time: +e.target.value } : data,
                  );
                });
              }}
            />
            <Button
              type="submit"
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();

                if (!isPomodoroTimeEditing) {
                  setIsPomodoroTimeEditing(true);
                  return;
                }

                if (timeData[timerType].time < 1) return;

                setTime(timeData[timerType].time * 60);
                setTimerState("idle");

                setIsPomodoroTimeEditing(false);
              }}
            >
              {isPomodoroTimeEditing ? <Check /> : <Edit />}
            </Button>
          </form>
        )}
      </div>
      <p>{formatTime(time)}</p>
      <div className="flex justify-between">
        <Button
          disabled={timerState === "running"}
          className="cursor-pointer"
          onClick={() => setTimerState("running")}
        >
          <Play />
        </Button>
        <Button
          disabled={timerState === "idle"}
          className="cursor-pointer"
          onClick={() => setTimerState("idle")}
        >
          <Pause />
        </Button>
        <Button
          disabled={timerState === "running"}
          className="cursor-pointer"
          onClick={() => setTime(timeData[timerType].time * 60)}
        >
          <RotateCcw />
        </Button>
      </div>
    </Card>
  );
}

export default PomodoroTImer;
