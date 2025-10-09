export interface Habit {
  id: string;
  title: string;
  frequency: "daily" | "weekly" | "monthly";
  description: string;
  streak: number;
  completedDates: string[];
  startDate: string;
  tags?: [];
}
