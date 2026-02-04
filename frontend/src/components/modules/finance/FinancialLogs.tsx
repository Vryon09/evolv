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
import type {
  Category,
  IFinanceFormValue,
  ITransaction,
} from "types/Transaction";
import FinancialDialog from "./FinancialDialog";
import FinancialLogsFilter from "./FinancialLogsFilter";
import DeleteDialog from "@/components/DeleteDialog";

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

  const [selectedType, setSelectedType] = useState<
    "Income" | "Expense" | "All"
  >("All");

  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All",
  );

  const [transactionDeleteDialog, setTransactionDeleteDialog] =
    useState<ITransaction | null>(null);

  const { data: transactions = [] } = useQuery<ITransaction[]>({
    queryFn: () =>
      handleGetTransactions({
        transactionType: selectedType,
        category: selectedCategory,
      }),
    queryKey: ["transactions", selectedType, selectedCategory],
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
    <div className="mt-8 space-y-4">
      <FinancialLogsFilter
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="divide-y rounded-2xl border-1 border-neutral-300">
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
                {transaction.transactionType === "Income" ? "+" : "-"}₱
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
                onClick={() => {
                  setTransactionDeleteDialog(transaction);
                }}
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

      <DeleteDialog
        open={transactionDeleteDialog !== null}
        onOpenChange={() => {
          if (transactionDeleteDialog !== null) {
            setTransactionDeleteDialog(null);
          }
        }}
        handleDelete={() => {
          if (transactionDeleteDialog === null) return;
          handleDeleteTransaction(transactionDeleteDialog?._id);

          setTransactionDeleteDialog(null);
        }}
      >
        Are you sure you want to delete this transaction?
      </DeleteDialog>
    </div>
  );
}

export default FinancialLogs;
