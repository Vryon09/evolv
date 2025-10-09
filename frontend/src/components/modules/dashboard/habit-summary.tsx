"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
}

// Mock data for demonstration
const INITIAL_HABITS: Habit[] = [
  { id: "1", name: "Morning Meditation", streak: 12, completedToday: true },
  { id: "2", name: "Read 30 Minutes", streak: 8, completedToday: true },
  { id: "3", name: "Exercise", streak: 5, completedToday: false },
  { id: "4", name: "Journal", streak: 15, completedToday: true },
  {
    id: "5",
    name: "Drink 8 Glasses of Water",
    streak: 3,
    completedToday: false,
  },
];

export function HabitSummary() {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? { ...habit, completedToday: !habit.completedToday }
          : habit,
      ),
    );
  };

  const completedCount = habits.filter((h) => h.completedToday).length;
  const totalCount = habits.length;
  const completionPercentage = (completedCount / totalCount) * 100;

  const getMotivationalText = () => {
    if (completionPercentage === 100)
      return "Perfect day! All habits completed! 🎉";
    if (completionPercentage >= 80) return "Almost there! Keep it up! 💪";
    if (completionPercentage >= 50)
      return `${completedCount}/${totalCount} habits done — great progress!`;
    if (completionPercentage > 0)
      return "Good start! Keep building momentum 🚀";
    return "Start your day strong — check off your first habit!";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">Habits Overview</CardTitle>
            <CardDescription>
              Track your daily habits and build streaks
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link to="/app/habit">
              View All Habits
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Section */}
        <div className="bg-muted/50 space-y-3 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">
              Today's Progress
            </span>
            <span className="text-muted-foreground">
              {completedCount}/{totalCount} completed
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <p className="text-muted-foreground text-sm">
            {getMotivationalText()}
          </p>
        </div>

        {/* Habits List */}
        <div className="space-y-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={cn(
                "group bg-card hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-all",
                habit.completedToday && "border-primary/20 bg-primary/5",
              )}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  id={habit.id}
                  checked={habit.completedToday}
                  onCheckedChange={() => toggleHabit(habit.id)}
                  className={cn(
                    "h-5 w-5 transition-all",
                    habit.completedToday && "animate-scale-in",
                  )}
                />
                <label
                  htmlFor={habit.id}
                  className={cn(
                    "cursor-pointer text-sm font-medium transition-all",
                    habit.completedToday &&
                      "text-muted-foreground line-through",
                  )}
                >
                  {habit.name}
                </label>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-flame/10 text-flame dark:text-flame flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold">
                  <Flame className="h-3 w-3" />
                  <span>{habit.streak}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
