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
    <div>
      {transactions.map((transaction) => (
        <div
          className={cn(
            transaction.transactionType === "Expense"
              ? "bg-red-400"
              : transaction.transactionType === "Income"
                ? "bg-green-400"
                : "",
            "flex justify-between",
          )}
        >
          <div className="flex gap-2">
            <p>{transaction.category}</p>
            <p>${transaction.amount}</p>
          </div>
          {transaction.description !== "" && <p>{transaction.description}</p>}
          <p>{dayjs(transaction.createdAt).format("DD MMM")}</p>
        </div>
      ))}
    </div>
  );
}

export default FinancialLogs;
