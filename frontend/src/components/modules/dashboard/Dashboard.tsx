import { HabitSummary } from "@/components/modules/dashboard/habit-summary";
import { KnowledgeSummary } from "@/components/modules/dashboard/knowledge-summary";
import { MoodSummary } from "@/components/modules/dashboard/mood-summary";
import { OpportunitySummary } from "@/components/modules/dashboard/opportunity-summary";

function Dashboard() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
      <HabitSummary />
      <MoodSummary />
      <KnowledgeSummary />
      <OpportunitySummary />
    </div>
  );
}

export default Dashboard;
