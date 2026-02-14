import { Button } from "@/components/ui/button";
import isCompletedToday from "@/helper/isCompletedToday";
import { cn } from "@/lib/utils";
import { handleGetHabits } from "@/services/apiHabits";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import type { IHabit } from "types/habit";
import type { PaginatedResponse } from "types/pagination";

function HabitOverview() {
  const { data: habitsData, isPending: isHabitsLoading } = useQuery<
    PaginatedResponse<IHabit>
  >({
    queryFn: () => handleGetHabits("default"),
    queryKey: ["habits", "default"],
  });

  const habits = habitsData?.data ?? [];

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("/app/habit")}
          className="cursor-pointer"
        >
          <span>Go to Habit</span>
          <ArrowRight />
        </Button>
      </div>

      <div className="flex justify-between">
        {isHabitsLoading ? (
          <div>Loading...</div>
        ) : (
          habits.map((habit) => {
            return (
              <div
                key={habit._id}
                className={cn(
                  "w-full border",
                  isCompletedToday(habit) ? "bg-green-500" : "bg-neutral-600",
                )}
              >
                <p>{habit.title}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HabitOverview;
