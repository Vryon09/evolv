import { cn } from "@/lib/utils";
import { handleGetTransactions } from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { ITransaction } from "types/Transaction";

function FinancialLogs() {
  const { data: transactions = [] } = useQuery<ITransaction[]>({
    queryFn: handleGetTransactions,
    queryKey: ["transactions"],
  });

  return (
    <div className="mt-4 divide-y rounded-2xl border-1 border-black">
      {transactions.map((transaction) => (
        <div className="flex items-center justify-between border-black p-2">
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
          {/* {transaction.description !== "" && <p>{transaction.description}</p>} */}
        </div>
      ))}
    </div>
  );
}

export default FinancialLogs;
