import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Check, Edit, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

function PomodoroTImer() {
  const [timerState, setTimerState] = useState<"idle" | "running">("idle");
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [isPomodoroTimeEditing, setIsPomodoroTimeEditing] = useState(false);
  const [time, setTime] = useState(25 * 60);

  useEffect(() => {
    if (time === 0) {
      console.log("Break Time!!");
      setTime(pomodoroTime * 60);
      setTimerState("idle");
    }

    if (timerState === "idle") return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, timerState, pomodoroTime]);

  function formatTime(seconds: number) {
    const date = new Date(seconds * 1000);

    return format(date, "mm:ss");
  }

  return (
    <Card className="mt-8 max-w-[500px] p-6">
      <div className="flex items-center justify-between">
        <h3>Pomodoro Timer</h3>

        {timerState === "idle" && (
          <form className="flex gap-2">
            <Input
              disabled={!isPomodoroTimeEditing}
              className="w-16"
              type="number"
              value={pomodoroTime}
              onChange={(e) => {
                if (pomodoroTime <= 1) {
                  setPomodoroTime(2);
                  return;
                }
                setPomodoroTime(+e.target.value);
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

                if (pomodoroTime < 1) return;

                setTime(pomodoroTime * 60);
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
          onClick={() => setTime(pomodoroTime * 60)}
        >
          <RotateCcw />
        </Button>
      </div>
    </Card>
  );
}

export default PomodoroTImer;
