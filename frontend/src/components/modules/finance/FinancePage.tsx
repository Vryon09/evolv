import FinanceActionButtons from "./FinanceActionButtons";
import FinancialSummary from "./FinancialSummary";

function FinancePage() {
  return (
    <div className="bg-background overflow-scroll overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <FinanceActionButtons />
        </div>
        <FinancialSummary />
      </div>
    </div>
  );
}

export default FinancePage;
