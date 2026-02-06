import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function getTags() {
  try {
    const res = await api.get(`/api/tags`);

    return res.data ?? [];
  } catch (error) {
    console.log(error);
  }
}

async function handleAddTag({ tag }: { tag: string }) {
  try {
    const res = await api.post(`/api/tags/`, { tag });

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
