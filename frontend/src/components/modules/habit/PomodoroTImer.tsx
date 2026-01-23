import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, SkipForward } from "lucide-react";
import PomodoroSettings from "./PomodoroSettings";
import { useCallback, useEffect } from "react";
import { useOutletContext } from "react-router";
import type { IUser } from "@/components/layout/OSLayout";
import { cn } from "@/lib/utils";
import { usePomodoroTimer } from "@/contexts/usePomodoroTimer";

function PomodoroTimer() {
  const {
    dispatch,
    timerType,
    timerState,
    time,
    pomodoroSettings,
    pomodoroCount,
    isPomodoroSettingsOpen,
  } = usePomodoroTimer();
  const { user }: { user?: IUser } = useOutletContext();

  useEffect(() => {
    // dispatch({ type: "setTimerState", payload: "idle" });

    dispatch({
      type: "setPomodoroSettings",
      payload: user?.pomodoroSettings || {
        pomodoro: 0,
        short: 0,
        long: 0,
        autoPomodoro: false,
        autoBreak: false,
        longBreakInterval: 0,
      },
    });
    // setPomodoroSettings(
    //   user?.pomodoroSettings || {
    //     pomodoro: 0,
    //     short: 0,
    //     long: 0,
    //     autoPomodoro: false,
    //     autoBreak: false,
    //     longBreakInterval: 0,
    //   },
    // );

    dispatch({
      type: "setTime",
      payload:
        (user?.pomodoroSettings && user?.pomodoroSettings[timerType] * 60) ||
        25 * 60,
    });

    // setTime(
    //   (user?.pomodoroSettings && user?.pomodoroSettings[timerType] * 60) ||
    //     25 * 60,
    // );
  }, [user, timerType, dispatch]);

  useEffect(() => {
    if (timerState === "idle" || timerState === "paused") return;
    const interval = setInterval(() => {
      dispatch({ type: "setTime", payload: time - 1 });
      // setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerState, dispatch, time]);

  const showNotification = useCallback(() => {
    if (Notification.permission === "granted") {
      if (timerType === "pomodoro") {
        new Notification(`Hello ${user?.name}!`, {
          body: "Time to take a break.",
        });
      } else {
        new Notification(`Hello ${user?.name}!`, {
          body: "Time to focus!.",
        });
      }
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, [timerType, user?.name]);

  useEffect(() => {
    if (time === 0) {
      dispatch({
        type: "setTimerState",
        payload:
          (timerType === "pomodoro" && pomodoroSettings.autoBreak) ||
          (timerType === "short" && pomodoroSettings.autoPomodoro) ||
          (timerType === "long" && pomodoroSettings.autoPomodoro)
            ? "running"
            : "idle",
      });

      // setTimerState(
      //   (timerType === "pomodoro" && pomodoroSettings.autoBreak) ||
      //     (timerType === "short" && pomodoroSettings.autoPomodoro) ||
      //     (timerType === "long" && pomodoroSettings.autoPomodoro)
      //     ? "running"
      //     : "idle",
      // );

      dispatch({ type: "setTime", payload: pomodoroSettings[timerType] * 60 });

      // setTime(pomodoroSettings[timerType] * 60);

      dispatch({
        type: "setPomodoroCount",
        payload: timerType === "pomodoro" ? pomodoroCount + 1 : pomodoroCount,
      });

      // setPomodoroCount((prev) => (timerType === "pomodoro" ? prev + 1 : prev));

      dispatch({
        type: "setTimerType",
        payload:
          timerType === "pomodoro" &&
          pomodoroCount % pomodoroSettings.longBreakInterval === 0
            ? "long"
            : timerType === "pomodoro" &&
                pomodoroCount % pomodoroSettings.longBreakInterval !== 0
              ? "short"
              : "pomodoro",
      });

      // setTimerType((prev) =>
      //   prev === "pomodoro" &&
      //   pomodoroCount % pomodoroSettings.longBreakInterval === 0
      //     ? "long"
      //     : prev === "pomodoro" &&
      //         pomodoroCount % pomodoroSettings.longBreakInterval !== 0
      //       ? "short"
      //       : "pomodoro",
      // );

      showNotification();

      const alarm = new Audio("/alarm.mp3");
      alarm.currentTime = 0;
      alarm.volume = 0.1;
      alarm.play();

      setTimeout(() => {
        alarm.pause();
        alarm.currentTime = 0;
      }, 5000);
    }
  }, [
    dispatch,
    time,
    pomodoroSettings,
    timerType,
    pomodoroCount,
    showNotification,
  ]);

  function formatTime() {
    const mins = String(Math.floor(time / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");

    return `${mins}:${secs}`;
  }

  return (
    <div className="w-full">
      <Card className="h-full px-4 py-2">
        <header className="flex flex-col">
          <div className="flex w-full justify-end">
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() =>
                dispatch({ type: "setIsPomodoroSettingsOpen", payload: true })
              }
            >
              <Settings />
            </Button>
          </div>
          <div className="mx-6 flex justify-between p-2">
            <Button
              onClick={() => {
                if (timerType === "pomodoro") return;
                dispatch({ type: "setTimerType", payload: "pomodoro" });
                dispatch({ type: "setTimerState", payload: "idle" });
                // setTimerType("pomodoro");
                // setTimerState("idle");
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
                dispatch({ type: "setTimerType", payload: "short" });
                dispatch({ type: "setTimerState", payload: "idle" });
                // setTimerType("short");
                // setTimerState("idle");
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
                dispatch({ type: "setTimerType", payload: "long" });
                dispatch({ type: "setTimerState", payload: "idle" });
                // setTimerType("long");
                // setTimerState("idle");
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
        <div className="flex gap-2">
          <Button
            className="flex-1 cursor-pointer"
            onClick={() => {
              if (timerState === "running") {
                dispatch({ type: "setTimerState", payload: "paused" });
                // setTimerState("paused");
                return;
              }

              if (Notification.permission === "default") {
                alert("Turn on notification permission to alarm.");

                Notification.requestPermission();
              }

              dispatch({ type: "setTimerState", payload: "running" });
              // setTimerState("running");
            }}
          >
            {timerState === "idle" || timerState === "paused"
              ? "Start"
              : "Pause"}
          </Button>
          <Button
            disabled={timerState === "idle"}
            className="w-20 cursor-pointer"
            onClick={() => dispatch({ type: "setTime", payload: 0 })}
          >
            <SkipForward />
          </Button>
        </div>

        <p className="mx-auto text-lg">#{pomodoroCount}</p>
      </Card>

      <PomodoroSettings
        open={isPomodoroSettingsOpen}
        onOpenChange={(open) =>
          dispatch({ type: "setIsPomodoroSettingsOpen", payload: open })
        }
        pomodoroSettings={pomodoroSettings}
      />
    </div>
  );
}

export default PomodoroTimer;
