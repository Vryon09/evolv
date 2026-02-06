// import { useMood } from "@/contexts/useMood";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function handleGetMoods() {
  try {
    const res = await api.get(`/api/moods`);

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
  try {
    const newMood = {
      mood,
      sleep,
      stressLevel,
      physicalActivity,
      habits,
      habitsMoodImpact,
    };

    const res = await api.post(`/api/moods`, newMood);

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
    const res = await api.delete(`/api/moods/${id}`);

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
