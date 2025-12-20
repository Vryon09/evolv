import ModuleHeader from "@/components/layout/ModuleHeader";
import ModuleLayout from "@/components/layout/ModuleLayout";
import DashboardPage from "./DashboardPage";

function Dashboard() {
  return (
    <ModuleLayout>
      <ModuleHeader title="Dashboard" />
      <DashboardPage />
    </ModuleLayout>
  );
}

export default Dashboard;
