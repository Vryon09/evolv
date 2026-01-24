import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useMood } from "@/contexts/useMood";
import isCompletedToday from "@/helper/isCompletedToday";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { IHabit } from "types/habit";

function PerHabitImpactForm({
  habits,
  isHabitsLoading,
}: {
  habits: IHabit[];
  isHabitsLoading: boolean;
}) {
  const [isSelectingHabits, setIsSelectingHabits] = useState<boolean>(false);
  // const [selectedHabits, setSelectedHabits] = useState<IHabit[]>([]);
  const { dispatch, selectedHabits } = useMood();

  if (isHabitsLoading) return <p>Loading...</p>;

  const completedHabits: (IHabit & { moodImpact: number })[] = habits
    .filter((habit) => isCompletedToday(habit) && habit.frequency === "daily")
    .map((habit) => {
      return { ...habit, moodImpact: -2 };
    });

  //Fix handletoggle
  function handleToggle(toggledHabit: IHabit & { moodImpact: number }) {
    const isDuplicated = [...selectedHabits].some(
      (habit) => habit._id === toggledHabit._id,
    );

    if (isDuplicated) {
      dispatch({ type: "deleteSelectedHabit", payload: toggledHabit._id });
    } else {
      dispatch({ type: "addSelectedHabit", payload: toggledHabit });
    }
  }

  return (
    <>
      <Card className="h-fit p-4">
        <div className="space-y-8">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Per habit impact</p>
            <Button
              size="icon-sm"
              className="cursor-pointer"
              onClick={() =>
                setIsSelectingHabits((isSelecting) => !isSelecting)
              }
            >
              <span>
                <Plus />
              </span>
            </Button>
          </div>
          {!selectedHabits.length ? (
            <div className="flex items-center justify-center">
              <p>Click + icon to select habits</p>
            </div>
          ) : (
            selectedHabits.map((habit) => (
              <div className="flex gap-4" key={habit._id}>
                <div className="flex-1 space-y-2">
                  <p>{habit.title}</p>
                  <Slider
                    max={2}
                    min={-2}
                    value={[habit.moodImpact]}
                    onValueChange={(value) =>
                      dispatch({
                        type: "setHabitMoodImpact",
                        payload: { id: habit._id, value: value[0] },
                      })
                    }
                  />
                  <div className="flex justify-between">
                    <p>Worse</p>
                    <p className="font-semibold">{habit.moodImpact}</p>
                    <p>Better</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Dialog
        open={isSelectingHabits}
        onOpenChange={() => setIsSelectingHabits((isSelecting) => !isSelecting)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Habits</DialogTitle>
            <DialogDescription>
              Select habits to include in ypur mood submission.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-2">
              {completedHabits.map((habit) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="h-6 w-6 cursor-pointer border-neutral-400"
                    onCheckedChange={() => handleToggle(habit)}
                    checked={selectedHabits.some(
                      (prev) => prev._id === habit._id,
                    )}
                  />
                  <p className="font-semibold">{habit.title}</p>
                </div>
              ))}
            </div>
            <Button
              className="mt-4 w-full cursor-pointer"
              size="sm"
              onClick={() => setIsSelectingHabits(false)}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PerHabitImpactForm;
