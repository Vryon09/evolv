import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Edit2, Trash } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { ITransaction } from "types/Transaction";

interface TransactionRowProps {
  transaction: ITransaction;
  setSelectedTransaction: Dispatch<SetStateAction<ITransaction | null>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setTransactionDeleteDialog: Dispatch<SetStateAction<ITransaction | null>>;
}

function TransactionRow({
  transaction,
  setSelectedTransaction,
  setIsEditing,
  setTransactionDeleteDialog,
}: TransactionRowProps) {
  return (
    <div
      className="flex items-center justify-between border-neutral-300 p-2"
      key={transaction._id}
    >
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
  );
}

export default TransactionRow;
