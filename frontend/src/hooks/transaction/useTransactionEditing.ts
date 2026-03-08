import { categories, type Expense, type Income } from "@/constants/finance";
import type { UseMutateFunction } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type {
  Category,
  IFinanceFormValue,
  ITransaction,
} from "types/Transaction";

export function useTransactionEditing(
  handleUpdateTransaction: UseMutateFunction<
    void,
    Error,
    {
      _id: string;
      transactionType: "Expense" | "Income";
      category: Category;
      amount: number;
      description: string;
    },
    unknown
  >,
) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);

  const [formValue, setFormValue] = useState<IFinanceFormValue>({
    transactionType: "Expense",
    category: "Food",
    amount: "",
    description: "",
  });

  function handleOpenChange() {
    if (selectedTransaction !== null) {
      setSelectedTransaction(null);
    }
    setIsEditing((prev) => !prev);
  }

  function handleEdit() {
    if (!selectedTransaction) return;

    handleUpdateTransaction({
      _id: selectedTransaction._id,
      transactionType: formValue.transactionType,
      category: formValue.category,
      amount: +formValue.amount,
      description: formValue.description,
    });

    setIsEditing(false);
    setSelectedTransaction(null);
  }

  useEffect(() => {
    if (selectedTransaction !== null) {
      setFormValue({
        transactionType: selectedTransaction.transactionType,
        category: selectedTransaction.category,
        amount: selectedTransaction.amount.toString(),
        description: selectedTransaction.description,
      });
    }

    if (!selectedTransaction) {
      setFormValue({
        transactionType: "Expense",
        category: "Food",
        amount: "",
        description: "",
      });
    }
  }, [selectedTransaction]);

  useEffect(() => {
    if (formValue.transactionType === "Expense") {
      setFormValue((prev) => {
        return { ...prev, category: categories.Expense[0] as Expense };
      });
    }

    if (formValue.transactionType === "Income") {
      setFormValue((prev) => {
        return { ...prev, category: categories.Income[0] as Income };
      });
    }
  }, [formValue.transactionType]);

  return {
    isEditing,
    setIsEditing,
    formValue,
    setFormValue,
    selectedTransaction,
    setSelectedTransaction,
    handleOpenChange,
    handleEdit,
  };
}
