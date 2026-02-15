import { Flame, Calendar, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { IHabit } from "types/habit";
import { useQuery } from "@tanstack/react-query";
import { handleGetAllHabits } from "@/services/apiHabits";
import isCompletedToday from "@/helper/isCompletedToday";

export function HabitStats() {
  const { data: habits = [] } = useQuery<IHabit[]>({
    queryFn: () => handleGetAllHabits("default"),
    queryKey: ["allHabits"],
  });

  const todaysCompletion = habits.reduce((acc, habit) => {
    if (habit.completedDates.length === 0) return acc;

    if (isCompletedToday(habit)) acc++;

    return acc;
  }, 0);

  const longestStreak = [...habits].sort(
    (a, b) => b.bestStreak - a.bestStreak,
  )[0];

  const stats = [
    {
      label: "Today's Completion",
      value: `${!todaysCompletion ? "0%" : `${((todaysCompletion / habits.length) * 100).toFixed(0)}%`}`,
      icon: Check,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      label: "Longest Streak",
      value: `${!longestStreak ? "0" : `${longestStreak.bestStreak} ${longestStreak.frequency === "daily" ? "day" : longestStreak.frequency === "weekly" ? "week" : "month"}${longestStreak.bestStreak > 1 ? "s" : ""}`}`,
      icon: Flame,
      color: "text-flame",
      bgColor: "bg-flame/20",
    },
    {
      label: "Active Habits",
      value: habits.length,
      icon: Calendar,
      color: "text-chart-4",
      bgColor: "bg-chart-4/20",
    },
  ];

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`rounded-lg ${stat.bgColor} p-3`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-foreground text-2xl font-bold">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
