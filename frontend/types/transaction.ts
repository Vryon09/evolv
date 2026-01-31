export type Category =
  | "Food"
  | "Transport"
  | "Bills"
  | "Personal"
  | "Leisure"
  | "Savings"
  | "Misc"
  | "Primary"
  | "Side"
  | "Passive"
  | "Other";

export interface ITransaction {
  _id: string;
  user: string;
  transactionType: "Expense" | "Income";
  category: Category;
  amount: number;
  description: string;
  tags: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
