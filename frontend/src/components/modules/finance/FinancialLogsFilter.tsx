import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  categories as allCategories,
  type Expense,
  type Income,
} from "@/constants/finance";
import { Funnel, ListFilterPlus } from "lucide-react";
import { useEffect, useState } from "react";
import type { Category } from "types/Transaction";

const transactionTypes = ["All", "Expense", "Income"] as const;

function FinancialLogsFilter() {
  const [selectedType, setSelectedType] = useState<
    "Income" | "Expense" | "All"
  >("All");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All",
  );

  const categories =
    selectedType === "Expense"
      ? (allCategories.Expense as Expense[])
      : selectedType === "Income"
        ? (allCategories.Income as Income[])
        : ([...allCategories.Expense, ...allCategories.Income] as Category[]);

  useEffect(() => {
    setSelectedCategory("All");
  }, [selectedType]);

  return (
    <div className="flex justify-end">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer gap-2 bg-transparent"
            >
              <ListFilterPlus size={24} />
              Type: {selectedType}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {transactionTypes.map((type) => (
              <DropdownMenuItem onClick={() => setSelectedType(type)}>
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer gap-2 bg-transparent"
            >
              <Funnel size={24} />
              Category: {selectedCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedCategory("All")}>
              All
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem onClick={() => setSelectedCategory(category)}>
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default FinancialLogsFilter;
