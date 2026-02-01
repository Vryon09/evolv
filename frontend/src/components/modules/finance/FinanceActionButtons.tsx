import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { categories, type Expense, type Income } from "@/constants/finance";
import { useAddTransaction } from "@/services/apiTransactions";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { Category } from "types/Transaction";
import FinancialDialog from "./FinancialDialog";

function FinanceActionButtons() {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<{
    transactionType: "Expense" | "Income";
    category: Category;
    amount: string;
    description: string;
  }>({
    transactionType: "Expense",
    category: "Food",
    amount: "",
    description: "",
  });

  const { mutate: handleAddTransaction } = useAddTransaction();

  useEffect(() => {
    if (formValue.transactionType === "Expense") {
      setFormValue((prev) => {
        return { ...prev, category: categories.Expense[0] as Expense };
      });
    }

    if (formValue.transactionType === "Income") {
      setFormValue((prev) => {
        return { ...prev, category: categories.Income[0] as Income };
      });
    }
  }, [formValue.transactionType]);

  function handleAdd() {
    if (isNaN(+formValue.amount)) return;

    handleAddTransaction({
      transactionType: formValue.transactionType,
      category: formValue.category,
      amount: +formValue.amount,
      description: formValue.description,
    });

    setIsCreatingNew(false);
  }

  return (
    <>
      <div className="space-x-4">
        <Button
          className="cursor-pointer"
          onClick={() => setIsCreatingNew(true)}
        >
          <span>
            <Plus />
          </span>{" "}
          Add New
        </Button>
      </div>

      <FinancialDialog
        open={isCreatingNew}
        onOpenChange={() => setIsCreatingNew((prev) => !prev)}
        formValue={formValue}
        setFormValue={setFormValue}
        handleSubmit={handleAdd}
        action="Add"
      />
    </>
  );
}

export default FinanceActionButtons;
