import type { IPomodoroSettings } from "@/components/modules/habit/PomodoroSettings";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function handleUpdatePomodoroSettings({
  pomodoro,
  short,
  long,
  autoPomodoro,
  autoBreak,
  longBreakInterval,
}: IPomodoroSettings) {
  try {
    const updatedSettings = {
      pomodoro,
      short,
      long,
      autoPomodoro,
      autoBreak,
      longBreakInterval,
    };

    await api.patch(`/api/pomodoro`, updatedSettings);
  } catch (error) {
    console.log(error);
  }
}

export function useUpdatePomodoroSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleUpdatePomodoroSettings,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }),
  });
}
