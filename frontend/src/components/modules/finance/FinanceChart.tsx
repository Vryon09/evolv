import { handleGetTransactions } from "@/services/apiTransactions";
import { useQuery } from "@tanstack/react-query";
import type { ITransaction } from "types/Transaction";
import IncomeExpenseBarChart from "./charts/IncomeExpenseBarChart";
import type { ChartConfig } from "@/components/ui/chart";
import CategoryPieChart from "./charts/CategoryPieChart";
import { categories } from "@/constants/finance";
import type { PaginatedResponse } from "types/pagination";

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
  const {
    data: { data: transactions },
  } = useQuery<PaginatedResponse<ITransaction>>({
    queryFn: () =>
      handleGetTransactions({
        transactionType: "All",
        category: "All",
        limit: 0,
        page: 0,
      }),
    queryKey: ["transactions"],
    initialData: {
      success: true,
      data: [],
      pagination: { limit: 0, page: 1, pages: 0, total: 0 },
    },
  });

  const { incomes, expenses } = transactions.reduce(
    (
      acc: {
        incomes: ITransaction[];
        expenses: ITransaction[];
      },
      curr,
    ) => {
      if (curr.transactionType === "Expense") {
        acc.expenses.push(curr);
      }
      if (curr.transactionType === "Income") {
        acc.incomes.push(curr);
      }

      return acc;
    },
    {
      incomes: [],
      expenses: [],
    },
  );

  return (
    <div>
      <IncomeExpenseBarChart />
      <div className="flex flex-col">
        <CategoryPieChart
          chartConfig={expenseChartConfig}
          transactions={expenses}
          categories={categories.Expense}
        />
        <CategoryPieChart
          chartConfig={incomeChartConfig}
          transactions={incomes}
          categories={categories.Income}
        />
      </div>
    </div>
  );
}

export default FinanceChart;
