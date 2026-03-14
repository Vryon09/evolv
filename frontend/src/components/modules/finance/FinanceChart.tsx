import { handleGetTransactionsChartStats } from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import IncomeExpenseBarChart from "./charts/IncomeExpenseBarChart";
import CategoryPieChart from "./charts/CategoryPieChart";

function FinanceChart() {
  const { data: chartStats, isPending: isChartStatsPending } = useQuery({
    queryFn: handleGetTransactionsChartStats,
    queryKey: ["chartStats"],
  });

  if (isChartStatsPending) return <p>loading...</p>;

  console.log(chartStats);

  return (
    <div>
      <IncomeExpenseBarChart />
      <div className="flex flex-col">
        <CategoryPieChart
          transactions={chartStats[0]?.categories ?? []}
          chartType={chartStats[0]?.transactionType ?? "Expense"}
        />
        <CategoryPieChart
          transactions={chartStats[1]?.categories ?? []}
          chartType={chartStats[1]?.transactionType ?? "Income"}
        />
      </div>
    </div>
  );
}

export default FinanceChart;
