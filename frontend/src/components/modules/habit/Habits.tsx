import { HabitCard } from "@/components/habit-card";
import {
  useCompleteHabit,
  useDeleteHabit,
  useUpdateHabit,
} from "@/services/apiHabits";
import type { IHabit } from "types/habit";

interface HabitsProps {
  habits: IHabit[];
  setEditingHabit: React.Dispatch<React.SetStateAction<IHabit | null>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Habits({ habits, setEditingHabit, setIsDialogOpen }: HabitsProps) {
  const { mutate: handleCompleteHabit, isPending: isCompletingHabit } =
    useCompleteHabit();
  const { mutate: handleUpdateHabit } = useUpdateHabit();
  const { mutate: handleDeleteHabit } = useDeleteHabit();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          onToggleComplete={(_id: string) => {
            handleCompleteHabit({ _id });
          }}
          isCompletingHabit={isCompletingHabit}
          onEdit={() => {
            setEditingHabit(habit);
            setIsDialogOpen(true);
          }}
          onArchive={() => {
            handleUpdateHabit({ _id: habit._id, isArchived: true });
          }}
          onDelete={() => handleDeleteHabit({ _id: habit._id })}
        />
      ))}
    </div>
  );
}

export default Habits;
