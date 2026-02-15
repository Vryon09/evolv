import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function handleGetJournals({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const res = await api.get(`/api/journals?page=${page}&limit=${limit}`);

  return res.data || [];
}

async function handleAddJournal({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const newJournal = { title, content };

  const res = await api.post("/api/journals", newJournal);

  console.log(res.data);
}

export function useAddJournal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAddJournal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
    },
  });
}

async function handleDeleteJournal({ id }: { id: string }) {
  await api.delete(`/api/journals/${id}`);
}

export function useDeleteJournal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleDeleteJournal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["journals"] }),
  });
}
