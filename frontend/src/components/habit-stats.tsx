import { TrendingUp, Flame, Target, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

interface HabitStatsProps {
  totalCompletions: number
  averageStreak: number
  longestStreak: number
  totalHabits: number
}

export function HabitStats({ totalCompletions, averageStreak, longestStreak, totalHabits }: HabitStatsProps) {
  const stats = [
    {
      label: "Total Completions",
      value: totalCompletions,
      icon: Target,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      label: "Average Streak",
      value: `${averageStreak} days`,
      icon: TrendingUp,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      label: "Longest Streak",
      value: `${longestStreak} days`,
      icon: Flame,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Active Habits",
      value: totalHabits,
      icon: Calendar,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ]

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`rounded-lg ${stat.bgColor} p-3`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
