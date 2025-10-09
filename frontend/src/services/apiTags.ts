import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("evolv_token");

export async function getTags() {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data || [];
  } catch (error) {
    console.log(error);
  }
}

async function handleAddTag({ tag }: { tag: string }) {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/tags/`,
      { tag },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

export function useAddTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleAddTag,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });
}
