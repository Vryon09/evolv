import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import isCompletedToday from "@/helper/isCompletedToday";
import type { IHabit } from "types/habit";

function PerHabitImpactForm({
  habits,
  isHabitsLoading,
}: {
  habits: IHabit[];
  isHabitsLoading: boolean;
}) {
  if (isHabitsLoading) return <p>Loading...</p>;

  const completedHabits = habits.filter(
    (habit) => isCompletedToday(habit) && habit.frequency === "daily",
  );

  return (
    <Card className="h-fit p-4">
      <div className="space-y-8">
        <p className="text-xl font-semibold">Per habit impact</p>
        <div>
          {completedHabits.map((habit, i) => (
            <p key={i}>{habit.title}</p>
          ))}
        </div>
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
      </div>
    </Card>
  );
}

export default PerHabitImpactForm;
