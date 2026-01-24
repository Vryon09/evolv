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
  const [selectedHabits, setSelectedHabits] = useState<IHabit[]>([]);

  if (isHabitsLoading) return <p>Loading...</p>;

  const completedHabits = habits.filter(
    (habit) => isCompletedToday(habit) && habit.frequency === "daily",
  );

  //Fix handletoggle
  function handleToggle(toggledHabit: IHabit) {
    const isDuplicated = [...selectedHabits].some(
      (habit) => habit._id === toggledHabit._id,
    );

    if (isDuplicated) {
      const updatedSelectedHabits = [...selectedHabits].filter(
        (habit) => habit._id !== toggledHabit._id,
      );
      setSelectedHabits(updatedSelectedHabits);
    } else {
      setSelectedHabits((prev) => [...prev, toggledHabit]);
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
          {/* <div>
          {completedHabits.map((habit, i) => (
            <p key={i}>{habit.title}</p>
          ))}
        </div> */}
          {!selectedHabits.length ? (
            <div className="flex items-center justify-center">
              <p>Click + icon to select habits</p>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Slider max={2} min={-2} />
                <div className="flex justify-between">
                  <p>Worse</p>
                  <p className="font-semibold">{-2}</p>
                  <p>Better</p>
                </div>
              </div>
            </div>
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
            <Button className="mt-4 w-full" size="sm">
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PerHabitImpactForm;
