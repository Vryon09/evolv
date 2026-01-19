import { useQuery } from "@tanstack/react-query";
import MoodForm from "./MoodForm";
import SleepForm from "./SleepForm";
import StressForm from "./StressForm";
import { handleGetHabits } from "@/services/apiHabits";
import type { IHabit } from "types/habit";
import JournalButtons from "./JournalButtons";
import { Button } from "@/components/ui/button";
import { handleGetMoods, useAddMood } from "@/services/apiMoods";
import { useMood } from "@/contexts/useMood";
import PhysicalActivityForm from "./PhysicalActivityForm";
import PerHabitImpactForm from "./PerHabitImpactForm";
import isCompletedToday from "@/helper/isCompletedToday";
import type { IMood } from "types/mood";
import dayjs from "dayjs";

function MoodPage() {
  const { data: habits = [], isPending: isHabitsLoading } = useQuery<IHabit[]>({
    queryFn: () => handleGetHabits("default"),
    queryKey: ["habits", "default"],
  });

  const { data: moods = [] } = useQuery<IMood[]>({
    queryFn: handleGetMoods,
    queryKey: ["moods"],
  });

  const { mood, sleep, stressLevel, physicalActivity } = useMood();
  const { mutate: handleAddMood } = useAddMood();
  const dailyHabits = habits.reduce(
    (acc: { habitId: string; isCompleted: boolean }[], curr) => {
      if (curr.frequency !== "daily") return acc;

      return [
        ...acc,
        {
          habitId: curr._id,
          isCompleted: isCompletedToday(curr),
        },
      ];
    },
    [],
  );

  const isSubmittedToday = moods.some((mood) =>
    dayjs(mood.createdAt).isSame(dayjs(), "day"),
  );

  function handleSubmit() {
    // change sliders, radio inputs to better input types
    if (mood === "" || sleep.bedTime === "" || sleep.wakeTime === "") return;

    handleAddMood({
      mood,
      sleep,
      stressLevel,
      physicalActivity,
      habits: dailyHabits,
    });
  }

  return (
    <div className="bg-background overflow-scroll overflow-x-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-semibold">Completed daily habits</p>
          {isHabitsLoading ? (
            <div>loading...</div>
          ) : (
            habits.map((habit, i) => {
              if (habit.frequency !== "daily") return;

              return (
                <div key={i}>
                  <p>{habit.title}</p>
                </div>
              );
            })
          )}
        </div>
        <JournalButtons />
        <MoodForm />
        <SleepForm />
        <div>
          <StressForm />
          <PhysicalActivityForm />
        </div>
        <PerHabitImpactForm habits={habits} isHabitsLoading={isHabitsLoading} />
        <Button
          disabled={isSubmittedToday}
          onClick={handleSubmit}
          className="col-span-3 cursor-pointer"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default MoodPage;
