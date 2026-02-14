import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function handleGetJournals() {
  try {
    const res = await api.get("/api/journals?page=1&limit=5");

    return res.data || [];
  } catch (error) {
    console.error(error);
  }
}

async function handleAddJournal({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  try {
    const newJournal = { title, content };

    const res = await api.post("/api/journals", newJournal);

    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
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
  try {
    await api.delete(`/api/journals/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export function useDeleteJournal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleDeleteJournal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["journals"] }),
  });
}
