import ModuleHeader from "@/components/layout/ModuleHeader";
import ModuleLayout from "@/components/layout/ModuleLayout";
import MoodPage from "./MoodPage";

function Mood() {
  return (
    <ModuleLayout>
      <ModuleHeader title="Mood" />
      <MoodPage />
    </ModuleLayout>
  );
}

export default Mood;
