export interface IHabit {
  _id: string;
  user: string;
  title: string;
  description?: string;
  frequency: "daily" | "weekly" | "monthly";
  streak: number;
  bestStreak: number;
  startDate: string;
  completedDates: string[];
  tags: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
