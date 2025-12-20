import { useQuery } from "@tanstack/react-query";
import MoodForm from "./MoodForm";
import SleepForm from "./SleepForm";
import StressForm from "./StressForm";
import { handleGetHabits } from "@/services/apiHabits";
import isCompletedToday from "@/helper/isCompletedToday";
import type { IHabit } from "types/habit";
import JournalButtons from "./JournalButtons";

function MoodPage() {
  const { data: habits = [], isPending: isHabitsLoading } = useQuery<IHabit[]>({
    queryFn: () => handleGetHabits("default"),
    queryKey: ["habits", "default"],
  });

  return (
    <div className="bg-background overflow-scroll overflow-x-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-semibold">Completed daily habits</p>
          {isHabitsLoading ? (
            <div>loading...</div>
          ) : (
            habits.map((habit, i) => {
              if (!isCompletedToday(habit) || habit.frequency !== "daily")
                return;

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
        <StressForm />
      </div>
    </div>
  );
}

export default MoodPage;
