import type { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import type { ITransaction } from "types/Transaction";

export function useTransactionDelete(
  handleDeleteTransaction: UseMutateFunction<void, Error, string, unknown>,
) {
  const [transactionDeleteDialog, setTransactionDeleteDialog] =
    useState<ITransaction | null>(null);

  function handleDeleteOpenChange() {
    if (transactionDeleteDialog !== null) {
      setTransactionDeleteDialog(null);
    }
  }

  function handleDelete() {
    if (transactionDeleteDialog === null) return;
    handleDeleteTransaction(transactionDeleteDialog?._id);

    setTransactionDeleteDialog(null);
  }

  return {
    transactionDeleteDialog,
    setTransactionDeleteDialog,
    handleDeleteOpenChange,
    handleDelete,
  };
}
