import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function getTags() {
  const res = await api.get(`/api/tags`);

  return res.data ?? [];
}

async function handleAddTag({ tag }: { tag: string }) {
  const res = await api.post(`/api/tags/`, { tag });

  console.log(res.data);
}

export function useAddTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleAddTag,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });
}
