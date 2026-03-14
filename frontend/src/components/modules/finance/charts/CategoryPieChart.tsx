import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import type { ICategory } from "types/Transaction";

function CategoryPieChart({
  transactions,
  chartType,
}: {
  transactions: ICategory[];
  chartType: "Income" | "Expense";
}) {
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

  const chartConfig =
    chartType === "Income" ? incomeChartConfig : expenseChartConfig;

  return (
    <div className="w-full">
      <p className="text-2xl font-semibold">{chartType}</p>
      <ChartContainer config={chartConfig} className="w-full">
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value) => `₱${Number(value).toLocaleString()}`}
              />
            }
          />
          <Pie
            data={transactions}
            dataKey="amount"
            label={({ value }) => `₱${Number(value).toLocaleString()}`}
            nameKey="category"
          >
            {transactions?.map((entry, id) => (
              <Cell
                key={`${entry.category}-${id}`}
                fill={
                  (chartConfig as Record<string, { color: string }>)[
                    entry.category
                  ]?.color ?? "#8884d8"
                }
              />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="category" />} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export default CategoryPieChart;
