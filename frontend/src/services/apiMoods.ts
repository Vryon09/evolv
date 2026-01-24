// import { useMood } from "@/contexts/useMood";
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
  physicalActivity,
  habits,
  habitsMoodImpact,
}: {
  mood: string;
  sleep: { bedTime: string; wakeTime: string; quality: number };
  stressLevel: number;
  physicalActivity: number;
  habits: { habitId: string; isCompleted: boolean }[];
  habitsMoodImpact: { habitId: string; moodImpact: number; title: string }[];
}) {
  const token = localStorage.getItem("evolv_token");

  try {
    const newMood = {
      mood,
      sleep,
      stressLevel,
      physicalActivity,
      habits,
      habitsMoodImpact,
    };
    const res = await axios.post(`${API_BASE_URL}/api/moods`, newMood, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function useAddMood() {
  const queryClient = useQueryClient();
  // const { dispatch } = useMood();

  return useMutation({
    mutationFn: handleAddMood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moods"] });
      // dispatch({ type: "reset" });
    },
  });
}

async function handleDeleteMood({ id }: { id: string }) {
  try {
    const token = localStorage.getItem("evolv_token");

    const res = await axios.delete(`${API_BASE_URL}/api/moods/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data || [];
  } catch (error) {
    console.error(error);
  }
}

export function useDeleteMood() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDeleteMood,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["moods"] }),
  });
}
