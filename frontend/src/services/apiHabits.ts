import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function handleGetHabits(sortBy: string) {
  try {
    const res = await api.get(`/api/habits?sortBy=${sortBy}&page=1&limit=3`);

    return res.data || [];
  } catch (error) {
    console.log(error);
  }
}

async function handleAddHabit({
  title,
  description = "",
  frequency,
  tags = [],
}: {
  title: string;
  description?: string;
  frequency: "daily" | "weekly" | "monthly";
  tags?: string[];
}) {
  try {
    const newHabit = { title, description, frequency, tags };

    const res = await api.post(`/api/habits`, newHabit);

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

export function useAddHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleAddHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });
}

async function handleUpdateHabit({
  _id,
  title,
  description,
  frequency,
  tags,
  isArchived,
}: {
  _id: string;
  title?: string;
  description?: string;
  frequency?: "daily" | "weekly" | "monthly";
  tags?: string[];
  isArchived?: boolean;
}) {
  try {
    const updatedHabit = {
      title,
      description,
      frequency,
      tags,
      isArchived,
    };

    await api.patch(`/api/habits/${_id}`, updatedHabit);
  } catch (error) {
    console.log(error);
  }
}

export function useUpdateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleUpdateHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });
}

async function handleDeleteHabit({ _id }: { _id: string }) {
  try {
    await api.delete(`/api/habits/${_id}`);
  } catch (error) {
    console.log(error);
  }
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleDeleteHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });
}

async function handleCompleteHabit({ _id }: { _id: string }) {
  try {
    await api.patch(`/api/habits/${_id}/complete`, {});
  } catch (error) {
    console.log(error);
  }
}

export function useCompleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleCompleteHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });
}
