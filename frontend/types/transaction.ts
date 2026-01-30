export interface ITransaction {
  _id: string;
  user: string;
  transactionType: "Expense" | "Income";
  category: string;
  amount: number;
  description: string;
  tags: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
