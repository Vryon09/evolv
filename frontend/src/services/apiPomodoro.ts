import type { IPomodoroSettings } from "@/components/modules/habit/PomodoroSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

async function handleUpdatePomodoroSettings({
  pomodoro,
  short,
  long,
  autoPomodoro,
  autoBreak,
}: IPomodoroSettings) {
  const token = localStorage.getItem("evolv_token");

  try {
    await axios.patch(
      `${API_BASE_URL}/api/pomodoro/`,
      {
        pomodoro,
        short,
        long,
        autoPomodoro,
        autoBreak,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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
