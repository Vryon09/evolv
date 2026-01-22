import { Button } from "@/components/ui/button";
import { MOODS, type MoodKey } from "@/constants/moods";
import { handleGetHabits } from "@/services/apiHabits";
import { handleGetMoods } from "@/services/apiMoods";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import type { IHabit } from "types/habit";
import type { IMood } from "types/mood";

function MoodOverview() {
  const { data: moods = [] } = useQuery<IMood[]>({
    queryFn: handleGetMoods,
    queryKey: ["moods"],
  });
  const { data: habits = [] } = useQuery<IHabit[]>({
    queryFn: () => handleGetHabits("default"),
    queryKey: ["habits"],
  });

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("/app/mood")}
          className="cursor-pointer"
        >
          <span>Go to Mood</span>
          <ArrowRight />
        </Button>
      </div>
      {moods.map((mood) => (
        <div key={mood._id}>
          <p>{MOODS[mood.mood as MoodKey].label}</p>
          <p>{MOODS[mood.mood as MoodKey].emoji}</p>
          <p>{MOODS[mood.mood as MoodKey].description}</p>
          <p>{mood.sleep.duration}hrs</p>
          <p>{mood.sleep.quality}</p>
          <div>
            {mood.habits.map((habit) => {
              const habitData = habits.find((h) => h._id === habit.habitId);
              return (
                <div key={habit.habitId}>
                  <p>{habitData?.title}</p>
                  <p>Is it completed? {habit.isCompleted ? "Yes" : "No"}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoodOverview;
