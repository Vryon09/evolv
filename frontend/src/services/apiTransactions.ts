import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Category } from "types/Transaction";

export async function handleGetTransactions({
  transactionType = "All",
  category = "All",
  limit = 10,
  page = 1,
}: {
  transactionType: "All" | "Income" | "Expense";
  category: Category | "All";
  limit: number;
  page: number;
}) {
  const res = await api.get(
    `/api/transactions?type=${transactionType}&category=${category}&limit=${limit}&page=${page}`,
  );

  return res.data ?? [];
}

export async function handleGetTransactionsStats() {
  const res = await api.get(`/api/transactions/stats`);

  return res.data;
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
  const newTransaction = { transactionType, category, amount, description };

  await api.post(`/api/transactions`, newTransaction);
}

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAddTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactionsStats"] });
      queryClient.invalidateQueries({ queryKey: ["chartStats"] });
    },
  });
}

async function handleDeleteTransaction(id: string) {
  await api.delete(`/api/transactions/${id}`);
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDeleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactionsStats"] });
      queryClient.invalidateQueries({ queryKey: ["chartStats"] });
    },
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
  const updatedTransaction = {
    transactionType,
    category,
    amount,
    description,
  };

  await api.patch(`/api/transactions/${_id}`, updatedTransaction);
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleUpdateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactionsStats"] });
      queryClient.invalidateQueries({ queryKey: ["chartStats"] });
    },
  });
}

async function handleResetTransactions() {
  const res = await api.delete("/api/transactions/reset");

  console.log(res.data);
}

export function useResetTransactions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleResetTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactionsStats"] });
      queryClient.invalidateQueries({ queryKey: ["chartStats"] });
    },
  });
}

async function handleSeedTransaction() {
  const res = await api.post(`/api/transactions/seed`);

  console.log(res.data);
}

export function useSeedTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleSeedTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactionsStats"] });
      queryClient.invalidateQueries({ queryKey: ["chartStats"] });
    },
  });
}

export async function handleGetTransactionsChartStats() {
  const res = await api.get("/api/transactions/stats/chart");

  return res.data || [];
}
