import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import PomodoroSettings from "./PomodoroSettings";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import type { IUser } from "@/components/layout/OSLayout";
import { cn } from "@/lib/utils";

function PomodoroTimer() {
  const [timerType, setTimerType] = useState<"pomodoro" | "short" | "long">(
    "pomodoro",
  );
  const [time, setTime] = useState(25 * 60);
  const [timerState, setTimerState] = useState<"idle" | "paused" | "running">(
    "idle",
  );
  const [pomodoroSettings, setPomodoroSettings] = useState({
    pomodoro: 0,
    short: 0,
    long: 0,
    autoPomodoro: false,
    autoBreak: false,
  });
  const [isPomodoroSettingsOpen, setIsPomodoroSettingsOpen] = useState(false);

  const { user }: { user?: IUser } = useOutletContext();

  useEffect(() => {
    setPomodoroSettings(
      user?.pomodoroSettings || {
        pomodoro: 0,
        short: 0,
        long: 0,
        autoPomodoro: false,
        autoBreak: false,
      },
    );

    setTime(
      (user?.pomodoroSettings && user?.pomodoroSettings[timerType] * 60) ||
        25 * 60,
    );
  }, [user, timerType]);

  useEffect(() => {
    if (timerState === "idle" || timerState === "paused") return;
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerState]);

  useEffect(() => {
    if (time === 0) {
      setTimerState("idle");
      setTime(pomodoroSettings[timerType] * 60);
    }
  }, [time, pomodoroSettings, timerType]);

  //create the logic for switching timer type with long break interval
  // useEffect(() => {
  //   if(time === 0){
  //     if(timerType === "pomodoro"){
  //       if(pomodoroSettings.autoBreak)
  //     }
  //   }
  // }, [time])

  function formatTime() {
    const mins = String(Math.floor(time / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");

    return `${mins}:${secs}`;
  }

  return (
    <div>
      <Card className="mt-8 max-w-[500px] p-6">
        <header className="flex flex-col">
          <div className="flex w-full justify-end">
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => setIsPomodoroSettingsOpen(true)}
            >
              <Settings />
            </Button>
          </div>
          <div className="mx-6 flex justify-between p-2">
            <Button
              onClick={() => {
                if (timerType === "pomodoro") return;
                setTimerType("pomodoro");
                setTimerState("idle");
              }}
              className={cn(
                "cursor-pointer",
                timerType === "pomodoro"
                  ? "bg-neutral-950"
                  : "bg-neutral-50 text-neutral-950 hover:bg-neutral-950 hover:text-neutral-50",
              )}
            >
              Pomodoro
            </Button>
            <Button
              onClick={() => {
                if (timerType === "short") return;
                setTimerType("short");
                setTimerState("idle");
              }}
              className={cn(
                "cursor-pointer",
                timerType === "short"
                  ? "bg-neutral-950"
                  : "bg-neutral-50 text-neutral-950 hover:bg-neutral-950 hover:text-neutral-50",
              )}
            >
              Short Break
            </Button>
            <Button
              onClick={() => {
                if (timerType === "long") return;
                setTimerType("long");
                setTimerState("idle");
              }}
              className={cn(
                "cursor-pointer",
                timerType === "long"
                  ? "bg-neutral-950"
                  : "bg-neutral-50 text-neutral-950 hover:bg-neutral-950 hover:text-neutral-50",
              )}
            >
              Long Break
            </Button>
          </div>
        </header>
        <div className="flex items-center justify-center">
          <p className="text-6xl">{formatTime()}</p>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => {
            if (timerState === "running") {
              setTimerState("paused");
              return;
            }
            setTimerState("running");
          }}
        >
          {timerState === "idle" || timerState === "paused" ? "Start" : "Pause"}
        </Button>
      </Card>

      <PomodoroSettings
        open={isPomodoroSettingsOpen}
        onOpenChange={(open) => setIsPomodoroSettingsOpen(open)}
        pomodoroSettings={pomodoroSettings}
        setPomodoroSettings={setPomodoroSettings}
      />
    </div>
  );
}

export default PomodoroTimer;
