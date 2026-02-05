import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { handleGetTransactions } from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid } from "recharts";
import type { ITransaction } from "types/Transaction";

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

function FinanceChart() {
  const { data: transactions = [], isLoading: isTransactionsLoading } =
    useQuery<ITransaction[]>({
      queryFn: () =>
        handleGetTransactions({ transactionType: "All", category: "All" }),
      queryKey: ["transactions"],
    });

  const chartData = transactions.reduce(
    (acc, curr) => {
      if (curr.transactionType === "Expense") {
        acc.expense += curr.amount;
      }

      if (curr.transactionType === "Income") {
        acc.income += curr.amount;
      }

      return acc;
    },

    { income: 0, expense: 0 },
  );

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

export default FinanceChart;
