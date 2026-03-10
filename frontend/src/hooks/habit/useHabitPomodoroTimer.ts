import type { IUser } from "@/components/layout/OSLayout";
import type { IPomodoroSettings } from "@/components/modules/habit/PomodoroSettings";
import type { PomodoroTimerAction } from "@/contexts/PomodoroTimerContext";
import { useCallback, useEffect, type Dispatch } from "react";

interface useHabitPomodoroTimerProps {
  dispatch: Dispatch<PomodoroTimerAction>;
  user: IUser | undefined;
  timerType: "pomodoro" | "short" | "long";
  timerState: "idle" | "paused" | "running";
  time: number;
  pomodoroSettings: IPomodoroSettings;
  pomodoroCount: number;
}

export function useHabitPomodoroTimer({
  dispatch,
  user,
  timerType,
  timerState,
  time,
  pomodoroSettings,
  pomodoroCount,
}: useHabitPomodoroTimerProps) {
  useEffect(() => {
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

    dispatch({
      type: "setTime",
      payload:
        (user?.pomodoroSettings && user?.pomodoroSettings[timerType] * 60) ||
        25 * 60,
    });
  }, [user, timerType, dispatch]);

  useEffect(() => {
    if (timerState === "idle" || timerState === "paused") return;
    const interval = setInterval(() => {
      dispatch({ type: "setTime", payload: time - 1 });
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

      dispatch({ type: "setTime", payload: pomodoroSettings[timerType] * 60 });

      dispatch({
        type: "setPomodoroCount",
        payload: timerType === "pomodoro" ? pomodoroCount + 1 : pomodoroCount,
      });

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

  return { formatTime };
}
