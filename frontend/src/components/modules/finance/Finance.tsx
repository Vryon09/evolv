import ModuleHeader from "@/components/layout/ModuleHeader";
import ModuleLayout from "@/components/layout/ModuleLayout";
import FinancePage from "./FinancePage";

function Finance() {
  return (
    <ModuleLayout>
      <ModuleHeader title="Finance" />
      <FinancePage />
    </ModuleLayout>
  );
}

export default Finance;
