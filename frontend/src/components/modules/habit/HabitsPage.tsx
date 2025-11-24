"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HabitDialog } from "@/components/habit-dialog";
import { useQuery } from "@tanstack/react-query";
import { handleGetHabits } from "@/services/apiHabits";
import type { IHabit } from "types/habit";
import { HabitStats } from "@/components/habit-stats";
import HabitsSort from "./HabitsSort";
import Habits from "./Habits";
import NoHabits from "./NoHabits";
import HabitsInsight from "./HabitsInsight";
import PomodoroTimer from "./PomodoroTimer";
import { Card } from "@/components/ui/card";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export default function HabitsPage() {
  const [editingHabit, setEditingHabit] = useState<IHabit | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"streak" | "recent" | "default">(
    "default",
  );

  const { data: habits = [], isPending: isHabitsLoading } = useQuery<IHabit[]>({
    queryFn: () => handleGetHabits(sortBy),
    queryKey: ["habits", sortBy],
  });

  if (isHabitsLoading) return <p>Loading...</p>;

  const totalCompletions =
    habits.length === 0
      ? 0
      : habits.reduce((acc, curr) => {
          return (acc += curr.completedDates.length);
        }, 0);

  const todaysCompletion = habits.reduce((acc, habit) => {
    const last = dayjs(
      Math.max(...habit.completedDates.map((date) => new Date(date).getTime())),
    );
    const isCompletedToday = last.isSame(dayjs(), "day");
    const isCompletedThisWeek = last.isSame(dayjs(), "isoWeek");
    const isCompletedThisMonth = last.isSame(dayjs(), "month");

    switch (habit.frequency) {
      case "daily":
        if (isCompletedToday) acc++;
        break;
      case "weekly":
        if (isCompletedThisWeek) acc++;
        break;
      case "monthly":
        if (isCompletedThisMonth) acc++;
        break;
      default:
        break;
    }

    return acc;
  }, 0);
  // const todaysCompletion = habits.reduce((acc, habit) => {
  //   const isCompletedToday = habit.completedDates.some(
  //     (date) => date.split("T")[0] === new Date().toISOString().split("T")[0],
  //   );

  //   if (isCompletedToday) {
  //     return acc + 1;
  //   }
  //   return acc;
  // }, 0);

  const longestStreak =
    habits.length === 0
      ? 0
      : [...habits].sort((a, b) => b.bestStreak - a.bestStreak)[0].bestStreak;

  return (
    <div className="bg-background overflow-scroll overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <HabitStats
          todaysCompletion={todaysCompletion}
          longestStreak={longestStreak}
          totalHabits={habits.length}
        />
        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <HabitsSort
            sortBy={sortBy}
            setSortBy={(sortBy) => setSortBy(sortBy)}
          />

          <Button
            onClick={() => {
              setEditingHabit(null);
              setIsDialogOpen(true);
            }}
            className="cursor-pointer gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Habit
          </Button>
        </div>

        {/* Habits Grid */}
        {habits.length === 0 ? (
          <NoHabits setIsDialogOpen={setIsDialogOpen} />
        ) : (
          <Habits
            habits={habits}
            setEditingHabit={setEditingHabit}
            setIsDialogOpen={setIsDialogOpen}
          />
        )}

        <div className="mt-8 flex flex-col gap-4 lg:flex-row">
          <PomodoroTimer />
          <Card className="px-4 py-2 md:w-full">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/jfKfPfyJRdk?si=1zT5I0y41ml6zdp2"
                title="Lofi hip-hop girl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                // allowFullScreen
              ></iframe>
            </div>
          </Card>
        </div>

        {/* Motivational Insight */}
        {habits.length > 0 && (
          <HabitsInsight totalCompletions={totalCompletions} />
        )}
      </div>

      {/* Add/Edit Dialog */}
      <HabitDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingHabit(null);
        }}
        habit={editingHabit}
      />
    </div>
  );
}
