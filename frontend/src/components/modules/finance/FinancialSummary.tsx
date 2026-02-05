import { Card } from "@/components/ui/card";
import { handleGetTransactions } from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import type { ITransaction } from "types/Transaction";

function FinancialSummary() {
  const { data: transactions = [], isLoading: isTransactionsLoading } =
    useQuery<ITransaction[]>({
      queryFn: () =>
        handleGetTransactions({ transactionType: "All", category: "All" }),
      queryKey: ["transactions"],
    });

  const { incomeTotal, expenseTotal } = transactions.reduce(
    (acc, curr) => {
      if (curr.transactionType === "Expense") {
        acc.expenseTotal += curr.amount;
      }

      if (curr.transactionType === "Income") {
        acc.incomeTotal += curr.amount;
      }

      return acc;
    },

    { incomeTotal: 0, expenseTotal: 0 },
  );

  const summaries = [
    { label: "Income", value: incomeTotal },
    { label: "Expense", value: expenseTotal },
    { label: "Balance", value: incomeTotal - expenseTotal },
  ];

  return (
    <div className="mt-4 flex justify-between gap-2">
      {summaries.map((summary) => (
        <Card className="w-full p-4" key={summary.label}>
          <p className="font-semibold">{summary.label}</p>
          <p className="text-4xl font-bold">
            {isTransactionsLoading
              ? "Loading..."
              : `${summary.value < 0 ? "-" : ""}₱${new Intl.NumberFormat().format(Math.abs(summary.value))}`}
          </p>
        </Card>
      ))}
    </div>
  );
}

export default FinancialSummary;
