import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function handleGetMoods() {
  const token = localStorage.getItem("evolv_token");

  try {
    const res = await axios.get(`${API_BASE_URL}/api/moods`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data || [];
  } catch (error) {
    console.log(error);
  }
}

async function handleAddMood({
  mood,
  sleep,
  stressLevel,
}: {
  mood: string;
  sleep: { bedTime: string; wakeTime: string; quality: string };
  stressLevel: number;
}) {
  const token = localStorage.getItem("evolv_token");

  try {
    const newMood = { mood, sleep, stressLevel };
    const res = await axios.post(`${API_BASE_URL}/api/moods`, newMood, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

export function useAddMood() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleAddMood,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["moods"] }),
  });
}
