import { Flame, Calendar, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { handleGetHabitsStats } from "@/services/apiHabits";

export function HabitStats() {
  const { data: rawStats, isPending } = useQuery({
    queryFn: handleGetHabitsStats,
    queryKey: ["habits", "stats"],
  });

  if (isPending) return <p>Loading...</p>;

  const stats = [
    {
      label: "Today's Completion",
      value: `${rawStats[0].completionPercentage}%`,
      icon: Check,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      label: "Longest Streak",
      value: rawStats[0].longestStreak,
      icon: Flame,
      color: "text-flame",
      bgColor: "bg-flame/20",
    },
    {
      label: "Active Habits",
      value: rawStats[0].totalHabits,
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
