import ModuleHeader from "@/components/layout/ModuleHeader";
import ModuleLayout from "@/components/layout/ModuleLayout";
import HabitStats from "./HabitStats";

function Habit() {
  return (
    <ModuleLayout>
      <ModuleHeader title="Habit" />
      <HabitStats />
    </ModuleLayout>
  );
}

export default Habit;
