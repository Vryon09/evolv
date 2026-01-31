import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  handleGetTransactions,
  useDeleteTransaction,
} from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Edit2, Trash } from "lucide-react";
import type { ITransaction } from "types/Transaction";

function FinancialLogs() {
  const { data: transactions = [] } = useQuery<ITransaction[]>({
    queryFn: handleGetTransactions,
    queryKey: ["transactions"],
  });

  const { mutate: handleDeleteTransaction } = useDeleteTransaction();

  return (
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
  );
}

export default FinancialLogs;
