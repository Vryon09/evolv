import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function handleGetTransactions() {
  const token = localStorage.getItem("evolv_token");

  try {
    const res = await axios.get(`${API_BASE_URL}/api/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data ?? [];
  } catch (error) {
    console.error(error);
  }
}

async function handleAddTransaction({
  transactionType,
  category,
  amount,
  description = "",
}: {
  transactionType: string;
  category: string;
  amount: number;
  description: string;
}) {
  const token = localStorage.getItem("evolv_token");

  try {
    const newTransaction = { transactionType, category, amount, description };

    const res = await axios.post(
      `${API_BASE_URL}/api/transactions`,
      newTransaction,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAddTransaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}
