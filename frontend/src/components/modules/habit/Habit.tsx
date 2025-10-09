import ModuleHeader from "@/components/layout/ModuleHeader";
import ModuleLayout from "@/components/layout/ModuleLayout";
import HabitStats from "./HabitStats";
import HabitActions from "./HabitActions";
import Habits from "./Habits";

function Habit() {
  return (
    <ModuleLayout>
      <ModuleHeader title="Habit" />
      <div className="m-4">
        <HabitStats />
        <HabitActions />
        <Habits />
      </div>
    </ModuleLayout>
  );
}

export default Habit;
