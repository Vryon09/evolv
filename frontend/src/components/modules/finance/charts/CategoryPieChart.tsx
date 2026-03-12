import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Pie, PieChart } from "recharts";
import type { ITransaction } from "types/Transaction";

interface IChartData {
  category: string;
  amount: number;
}

function CategoryPieChart({
  chartConfig,
  transactions,
  categories,
}: {
  chartConfig: ChartConfig;
  transactions: ITransaction[];
  categories: string[];
}) {
  const chartData = useMemo(() => {
    const initialChartData: IChartData[] = categories.map((category) => {
      return {
        category,
        amount: 0,
        fill: chartConfig[category]?.color ?? "#ccc",
      };
    });

    return transactions.reduce((acc: IChartData[], curr: ITransaction) => {
      const categoryId = acc.findIndex((a) => a.category === curr.category);

      if (categoryId === -1) return acc;

      acc[categoryId].amount += curr.amount;

      return acc;
    }, initialChartData);
  }, [categories, chartConfig, transactions]);

  // const chartData = transactions
  //   ? transactions.reduce((acc: IChartData[], curr: ITransaction) => {
  //       const categoryId = acc.findIndex((a) => a.category === curr.category);

  //       if (categoryId === -1) return acc;

  //       acc[categoryId].amount += curr.amount;

  //       return acc;
  //     }, initialChartData)
  //   : initialChartData;

  return (
    <ChartContainer config={chartConfig} className="w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="amount" label nameKey="category" />
        <ChartLegend content={<ChartLegendContent nameKey="category" />} />
      </PieChart>
    </ChartContainer>
  );
}

export default CategoryPieChart;
