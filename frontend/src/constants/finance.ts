export type Expense =
  | "Food"
  | "Transport"
  | "Bills"
  | "Personal"
  | "Leisure"
  | "Savings"
  | "Misc";

export type Income = "Primary" | "Side" | "Passive" | "Other";

export const categories = {
  Expense: [
    "Food",
    "Transport",
    "Bills",
    "Personal",
    "Leisure",
    "Savings",
    "Misc",
  ],
  Income: ["Primary", "Side", "Passive", "Other"],
};
