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

  const totalCompletions = habits.reduce((acc, curr) => {
    return (acc += curr.completedDates.length);
  }, 0);
  const averageStreak = habits.reduce((acc, curr) => {
    return (acc += curr.bestStreak) / habits.length;
  }, 0);
  const longestStreak = habits.sort((a, b) => b.bestStreak - a.bestStreak)[0]
    .bestStreak;

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <HabitStats
          totalCompletions={totalCompletions}
          averageStreak={averageStreak}
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
            className="gap-2"
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
