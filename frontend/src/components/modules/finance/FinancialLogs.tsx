import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import type { Category, ITransaction } from "types/Transaction";

function FinancialLogs() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);

  const [formValue, setFormValue] = useState<{
    transactionType: "Expense" | "Income";
    category: Category;
    amount: string;
    description: string;
  }>({
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
            {/* {transaction.description !== "" && <p>{transaction.description}</p>} */}
          </div>
        ))}
      </div>

      <Dialog
        open={isEditing}
        onOpenChange={() => {
          if (selectedTransaction !== null) {
            setSelectedTransaction(null);
          }
          setIsEditing((prev) => !prev);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>Add new transaction</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Type</label>
              <Select
                value={formValue.transactionType}
                onValueChange={(value) =>
                  setFormValue((prev) => {
                    return {
                      ...prev,
                      transactionType: value as "Income" | "Expense",
                    };
                  })
                }
              >
                <SelectTrigger id="frequency" className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Expense">Expense</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Category</label>
              <Select
                value={formValue.category}
                onValueChange={(value) =>
                  setFormValue((prev) => {
                    return {
                      ...prev,
                      category: value as Expense | Income,
                    };
                  })
                }
              >
                <SelectTrigger id="frequency" className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories[formValue.transactionType].map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Amount($)</label>
              <Input
                type="text"
                placeholder="0.00"
                value={formValue.amount}
                onChange={(e) =>
                  setFormValue((prev) => {
                    return { ...prev, amount: e.target.value };
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Description (Optional)</label>
              <Input
                type="text"
                placeholder={`Add a note about this ${formValue.transactionType}`}
                value={formValue.description}
                onChange={(e) =>
                  setFormValue((prev) => {
                    return { ...prev, description: e.target.value };
                  })
                }
              />
            </div>
            <Button
              className="flex cursor-pointer"
              onClick={() => {
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
              }}
            >
              Edit {`${formValue.transactionType}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FinancialLogs;
