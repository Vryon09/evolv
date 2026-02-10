import z from "zod";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../const/financeConstants.ts";

export const createTransactionSchema = z.object({
  transactionType: z.enum(["Expense", "Income"]),
  category: z.enum([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]),
  amount: z.number().min(0.01).max(1_000_000_000),
  description: z.string().max(200).default(""),
  tags: z.array(z.string()).default([]),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
