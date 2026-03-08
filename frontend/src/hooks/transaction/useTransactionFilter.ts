import { useState } from "react";
import type { Category } from "types/Transaction";

export function useTransactionFilter() {
  const [selectedType, setSelectedType] = useState<
    "Income" | "Expense" | "All"
  >("All");

  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All",
  );

  return {
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
  };
}
