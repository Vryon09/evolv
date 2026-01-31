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
import { useAddTransaction } from "@/services/apiTransactions";
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
  Income: ["Primary", "Side", "Passive", "Other"],
};

function FinanceActionButtons() {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<{
    transactionType: "Expense" | "Income";
    category: Expense | Income;
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
                  <SelectItem value="Expense">Expense</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
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
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Amount($)</label>
              <Input
                type="text"
                placeholder="0.00"
                value={formValue.amount}
                onChange={(e) =>
                  setFormValue((prev) => {
                    return { ...prev, amount: e.target.value };
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Description (Optional)</label>
              <Input
                type="text"
                placeholder={`Add a note about this ${formValue.transactionType}`}
                value={formValue.description}
                onChange={(e) =>
                  setFormValue((prev) => {
                    return { ...prev, description: e.target.value };
                  })
                }
              />
            </div>
            <Button className="flex cursor-pointer" onClick={handleAdd}>
              Add {`${formValue.transactionType}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FinanceActionButtons;
