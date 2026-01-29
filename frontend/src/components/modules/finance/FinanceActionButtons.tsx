import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Expense, Income } from "@/constants/finance";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const categories = {
  Expense: [
    "Food",
    "Transport",
    "Bills",
    "Personal",
    "Leisure",
    "Savings",
    "Misc",
  ],
  Income: ["Salary", "Side", "Passive", "Other"],
};

function FinanceActionButtons() {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<{
    transactionType: "Expense" | "Income";
    category: Expense | Income;
  }>({ transactionType: "Expense", category: "Food" });

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

      <Dialog open={isCreatingNew} onOpenChange={setIsCreatingNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>Add new transaction</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Type</label>
              <Select
                value={formValue.transactionType}
                onValueChange={(value) =>
                  setFormValue((prev) => {
                    return {
                      ...prev,
                      transactionType: value as "Income" | "Expense",
                    };
                  })
                }
              >
                <SelectTrigger id="frequency" className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Category</label>
              <Select
                value={formValue.category}
                onValueChange={(value) =>
                  setFormValue((prev) => {
                    return {
                      ...prev,
                      category: value as Expense | Income,
                    };
                  })
                }
              >
                <SelectTrigger id="frequency" className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories[formValue.transactionType].map((category) => (
                    <SelectItem value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Amount($)</label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Description (Optional)</label>
              <Input
                type="number"
                placeholder={`Add a note about this ${formValue.transactionType}`}
              />
            </div>
            <Button className="flex cursor-pointer">
              Add {`${formValue.transactionType}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FinanceActionButtons;
