import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function handleGetJournals() {
  const token = localStorage.getItem("evolv_token");

  try {
    const res = await axios.get(`${API_BASE_URL}/api/journals`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
  const token = localStorage.getItem("evolv_token");

  try {
    const newJournal = { title, content };
    const res = await axios.post(`${API_BASE_URL}/api/journals`, newJournal, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
