import { Button } from "@/components/ui/button";
import { categories, type Expense, type Income } from "@/constants/finance";
import { cn } from "@/lib/utils";
import {
  handleGetTransactions,
  useDeleteTransaction,
  useUpdateTransaction,
} from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Edit2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import type { IFinanceFormValue, ITransaction } from "types/Transaction";
import FinancialDialog from "./FinancialDialog";

function FinancialLogs() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);

  const [formValue, setFormValue] = useState<IFinanceFormValue>({
    transactionType: "Expense",
    category: "Food",
    amount: "",
    description: "",
  });

  const { data: transactions = [] } = useQuery<ITransaction[]>({
    queryFn: handleGetTransactions,
    queryKey: ["transactions"],
  });

  const { mutate: handleDeleteTransaction } = useDeleteTransaction();
  const { mutate: handleUpdateTransaction } = useUpdateTransaction();

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

  function handleOpenChange() {
    if (selectedTransaction !== null) {
      setSelectedTransaction(null);
    }
    setIsEditing((prev) => !prev);
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

  return (
    <>
      <div className="mt-4 divide-y rounded-2xl border-1 border-neutral-300">
        {transactions.map((transaction) => (
          <div className="flex items-center justify-between border-neutral-300 p-2">
            <div className="flex flex-col gap-1">
              <div
                className={cn(
                  transaction.transactionType === "Income"
                    ? "bg-green-600/20"
                    : "bg-red-600/20",
                  "flex justify-center rounded-3xl px-3 py-1 text-xs",
                )}
              >
                <p
                  className={cn(
                    transaction.transactionType === "Income"
                      ? "text-green-700"
                      : "text-red-700",
                    "font-semibold",
                  )}
                >
                  {transaction.category}
                </p>
              </div>
              <p className="text-xs">
                {dayjs(transaction.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p
                className={cn(
                  transaction.transactionType === "Income"
                    ? "text-green-600"
                    : "text-red-600",
                )}
              >
                {transaction.transactionType === "Income" ? "+" : "-"}$
                {transaction.amount}
              </p>

              <Button
                variant="ghost"
                size="icon-lg"
                className="cursor-pointer rounded-full"
                onClick={() => {
                  setSelectedTransaction(transaction);
                  setIsEditing(true);
                }}
              >
                <Edit2 />
              </Button>

              <Button
                variant="ghost"
                size="icon-lg"
                className="cursor-pointer rounded-full"
                onClick={() => handleDeleteTransaction(transaction._id)}
              >
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <FinancialDialog
        open={isEditing}
        onOpenChange={handleOpenChange}
        formValue={formValue}
        setFormValue={setFormValue}
        handleSubmit={handleEdit}
        action="Edit"
      />
    </>
  );
}

export default FinancialLogs;
