import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { handleGetTransactionsStats } from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart } from "recharts";

const chartConfig = {
  income: {
    label: "Income",
    color: "#2563eb",
  },
  expense: {
    label: "Expense",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

function IncomeExpenseBarChart() {
  const { data: stats, isPending } = useQuery({
    queryFn: handleGetTransactionsStats,
    queryKey: ["transactionsStats"],
  });

  const chartData = {
    income: stats?.totalIncome,
    expense: stats?.totalExpense,
  };

  if (isPending) return <p>loading...</p>;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={[chartData]}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export default IncomeExpenseBarChart;
