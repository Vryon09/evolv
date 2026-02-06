import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Category } from "types/Transaction";

export async function handleGetTransactions({
  transactionType = "All",
  category = "All",
}: {
  transactionType: "All" | "Income" | "Expense";
  category: Category | "All";
}) {
  try {
    const res = await api.get(
      `/api/transactions?type=${transactionType}&category=${category}`,
    );

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
  try {
    const newTransaction = { transactionType, category, amount, description };

    const res = await api.post(`/api/transactions`, newTransaction);

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

async function handleDeleteTransaction(id: string) {
  try {
    await api.delete(`/api/transactions/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDeleteTransaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

async function handleUpdateTransaction({
  _id,
  transactionType,
  category,
  amount,
  description,
}: {
  _id: string;
  transactionType: "Expense" | "Income";
  category: Category;
  amount: number;
  description: string;
}) {
  try {
    const updatedTransaction = {
      transactionType,
      category,
      amount,
      description,
    };

    await api.patch(`/api/transactions/${_id}`, updatedTransaction);
  } catch (error) {
    console.error(error);
  }
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleUpdateTransaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}
