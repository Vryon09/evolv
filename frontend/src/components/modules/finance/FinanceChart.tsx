import { handleGetTransactionsChartStats } from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import IncomeExpenseBarChart from "./charts/IncomeExpenseBarChart";
import CategoryPieChart from "./charts/CategoryPieChart";
import type { ICategory, IChartStats } from "types/Transaction";

function FinanceChart() {
  const { data: chartStats, isPending: isChartStatsPending } = useQuery<
    IChartStats<ICategory>[]
  >({
    queryFn: handleGetTransactionsChartStats,
    queryKey: ["chartStats"],
  });

  if (isChartStatsPending) return <p>loading...</p>;

  const expenseStats = chartStats?.find(
    (stat) => stat.transactionType === "Expense",
  );

  const incomeStats = chartStats?.find(
    (stat) => stat.transactionType === "Income",
  );

  return (
    <div>
      <IncomeExpenseBarChart />
      <div className="mt-10 flex flex-row">
        <CategoryPieChart
          transactions={expenseStats?.categories ?? []}
          chartType={expenseStats?.transactionType ?? "Expense"}
        />
        <CategoryPieChart
          transactions={incomeStats?.categories ?? []}
          chartType={incomeStats?.transactionType ?? "Income"}
        />
      </div>
    </div>
  );
}

export default FinanceChart;
