"use client";

import { Plus, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { HabitCard } from "@/components/habits/habit-card";
// import { HabitStats } from "@/components/habits/habit-stats";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { HabitDialog } from "@/components/habit-dialog";
import { HabitCard } from "@/components/habit-card";
import { useQuery } from "@tanstack/react-query";
import { handleGetHabits, useUpdateHabit } from "@/services/apiHabits";
import type { IHabit } from "types/habit";
import { Card } from "@/components/ui/card";
export default function HabitsPage() {
  const [editingHabit, setEditingHabit] = useState<IHabit | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"streak" | "recent" | "name">("streak");

  const { data: habits = [] } = useQuery<IHabit[]>({
    queryFn: handleGetHabits,
    queryKey: ["habits"],
  });
  const { mutate: handleUpdateHabit } = useUpdateHabit();

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        {/* <HabitStats
          totalCompletions={totalCompletions}
          averageStreak={averageStreak}
          longestStreak={longestStreak}
          totalHabits={habits.length}
        /> */}
        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Filter className="h-4 w-4" />
                  Sort by:
                  {sortBy === "streak"
                    ? "Streak"
                    : sortBy === "recent"
                      ? "Recent"
                      : "Name"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSortBy("streak")}>
                  Highest Streak
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("recent")}>
                  Most Recent
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name")}>
                  Name (A-Z)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
          <Card className="flex flex-col items-center justify-center py-16 text-center">
            <Calendar className="text-muted-foreground mb-4 h-12 w-12" />
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              No habits yet
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Start building consistency by adding your first habit
            </p>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Habit
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {habits.map((habit) => (
              <HabitCard
                key={habit._id}
                habit={habit}
                onToggleComplete={() => {}}
                onEdit={() => {
                  setEditingHabit(habit);
                  setIsDialogOpen(true);
                }}
                onArchive={() => {
                  handleUpdateHabit({ _id: habit._id, isArchived: true });
                }}
                onDelete={() => {}}
              />
            ))}
          </div>
        )}
        {/* Motivational Insight */}
        {/* {habits.length > 0 && (
          <Card className="border-accent/20 bg-accent/5 mt-8 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-foreground mb-1 font-semibold">
                  Keep it up!
                </h3>
                <p className="text-muted-foreground text-sm">
                  {totalCompletions > 50
                    ? `You've completed ${totalCompletions} habits! You're building incredible consistency.`
                    : totalCompletions > 20
                      ? `${totalCompletions} completions and counting. You're on a great path!`
                      : `You've completed ${totalCompletions} habits. Every day counts!`}
                </p>
              </div>
            </div>
          </Card>
        )} */}
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
