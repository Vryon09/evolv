import { Card } from "@/components/ui/card";
import { handleGetTransactionsStats } from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";

function FinancialSummary() {
  const { data: stats, isPending: isStatsLoading } = useQuery({
    queryFn: handleGetTransactionsStats,
    queryKey: ["transactionsStats"],
  });

  const summaries = [
    { label: "Income", value: stats?.totalIncome },
    { label: "Expense", value: stats?.totalExpense },
    { label: "Balance", value: stats?.balance },
  ];

  if (isStatsLoading) return <p>Loading...</p>;

  return (
    <div className="mt-4 flex justify-between gap-2">
      {summaries.map((summary) => (
        <Card className="w-full p-4" key={summary.label}>
          <p className="font-semibold">{summary.label}</p>
          <p className="text-4xl font-bold">
            {summary.value < 0 ? "-" : ""}₱
            {new Intl.NumberFormat().format(Math.abs(summary.value))}
          </p>
        </Card>
      ))}
    </div>
  );
}

export default FinancialSummary;
