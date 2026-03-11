import { handleGetTransactionsChartStats } from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import IncomeExpenseBarChart from "./charts/IncomeExpenseBarChart";
import type { ChartConfig } from "@/components/ui/chart";
import CategoryPieChart from "./charts/CategoryPieChart";
import { categories } from "@/constants/finance";

const expenseChartConfig = {
  Food: {
    label: "Food",
    color: "#22c55e", // green
  },
  Transport: {
    label: "Transport",
    color: "#3b82f6", // blue
  },
  Bills: {
    label: "Bills",
    color: "#ef4444", // red
  },
  Personal: {
    label: "Personal",
    color: "#a855f7", // purple
  },
  Leisure: {
    label: "Leisure",
    color: "#f59e0b", // amber
  },
  Savings: {
    label: "Savings",
    color: "#14b8a6", // teal
  },
  Misc: {
    label: "Misc",
    color: "#6b7280", // gray
  },
} satisfies ChartConfig;

const incomeChartConfig = {
  Primary: {
    label: "Primary",
    color: "#16a34a", // dark green
  },
  Side: {
    label: "Side",
    color: "#0ea5e9", // sky blue
  },
  Passive: {
    label: "Passive",
    color: "#8b5cf6", // violet
  },
  Other: {
    label: "Other",
    color: "#64748b", // slate
  },
} satisfies ChartConfig;

function FinanceChart() {
  const { data: chartStats, isPending: isChartStatsPending } = useQuery({
    queryFn: handleGetTransactionsChartStats,
    queryKey: ["chartStats"],
  });

  return (
    <div>
      <IncomeExpenseBarChart />
      <div className="flex flex-col">
        {!isChartStatsPending && (
          <>
            <CategoryPieChart
              chartConfig={expenseChartConfig}
              transactions={chartStats[0].categories}
              categories={categories.Expense}
            />
            <CategoryPieChart
              chartConfig={incomeChartConfig}
              transactions={chartStats[1].categories}
              categories={categories.Income}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default FinanceChart;
