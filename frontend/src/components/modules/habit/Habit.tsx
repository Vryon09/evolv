import ModuleHeader from "@/components/layout/ModuleHeader";
import ModuleLayout from "@/components/layout/ModuleLayout";
import HabitsPage from "./HabitsPage";
function Habit() {
  return (
    <ModuleLayout>
      <ModuleHeader title="Habit" />
      <HabitsPage />
    </ModuleLayout>
  );
}

export default Habit;
