import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IGetHabits {
  sortBy: string;
  page: number;
  limit: number;
}

export async function handleGetAllHabits(sortBy: string) {
  const res = await api.get(`/api/habits/all?sortBy=${sortBy}`);

  return res.data || [];
}

export async function handleGetHabits({ sortBy, page, limit }: IGetHabits) {
  const res = await api.get(
    `/api/habits?sortBy=${sortBy}&page=${page}&limit=${limit}`,
  );

  return res.data || [];
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
  const newHabit = { title, description, frequency, tags };

  const res = await api.post(`/api/habits`, newHabit);

  console.log(res.data);
}

export function useAddHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleAddHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["allHabits"] });
    },
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
  const updatedHabit = {
    title,
    description,
    frequency,
    tags,
    isArchived,
  };

  await api.patch(`/api/habits/${_id}`, updatedHabit);
}

export function useUpdateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleUpdateHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["allHabits"] });
    },
  });
}

async function handleDeleteHabit({ _id }: { _id: string }) {
  await api.delete(`/api/habits/${_id}`);
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleDeleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["allHabits"] });
    },
  });
}

async function handleCompleteHabit({ _id }: { _id: string }) {
  await api.patch(`/api/habits/${_id}/complete`, {});
}

export function useCompleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleCompleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["allHabits"] });
    },
  });
}
