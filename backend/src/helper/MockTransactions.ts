import type { CreateTransactionInput } from "../schemas/transactionSchema.ts";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../const/financeConstants.ts";

type TransactionType = "Expense" | "Income";

const MOCK_DESCRIPTIONS: Record<TransactionType, string[]> = {
  Expense: [
    "Grocery run",
    "Netflix subscription",
    "Electric bill",
    "Gym membership",
    "Coffee shop",
    "Uber ride",
    "Online shopping",
    "Restaurant dinner",
    "",
  ],
  Income: [
    "Monthly salary",
    "Freelance project",
    "Dividend payout",
    "Part-time gig",
    "Rental income",
    "Bonus",
    "",
  ],
};

const MOCK_TAGS: string[] = [
  "recurring",
  "one-time",
  "urgent",
  "planned",
  "unexpected",
  "online",
  "cash",
];

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function randomTags(): string[] {
  const count = Math.floor(Math.random() * 3); // 0–2 tags
  const shuffled = [...MOCK_TAGS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateMockTransaction(): CreateTransactionInput {
  const transactionType = randomItem<TransactionType>(["Expense", "Income"]);

  const category =
    transactionType === "Expense"
      ? randomItem(EXPENSE_CATEGORIES)
      : randomItem(INCOME_CATEGORIES);

  const amount =
    transactionType === "Expense"
      ? randomAmount(1, 500)
      : randomAmount(500, 10_000);

  const description = randomItem(MOCK_DESCRIPTIONS[transactionType]);
  const tags = randomTags();

  return { transactionType, category, amount, description, tags };
}
