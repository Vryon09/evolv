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
import { categories, type Expense, type Income } from "@/constants/finance";
import type { Dispatch, SetStateAction } from "react";
import type { IFinanceFormValue } from "types/Transaction";

interface FinancialDialogProps {
  open: boolean;
  onOpenChange: () => void;
  formValue: IFinanceFormValue;
  setFormValue: Dispatch<SetStateAction<IFinanceFormValue>>;
  handleSubmit: () => void;
  action: "Add" | "Edit";
}

function FinancialDialog({
  open,
  onOpenChange,
  formValue,
  setFormValue,
  handleSubmit,
  action,
}: FinancialDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{action} Transaction</DialogTitle>
          <DialogDescription>{action} transaction</DialogDescription>
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
          <Button className="flex cursor-pointer" onClick={handleSubmit}>
            {action} {`${formValue.transactionType}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FinancialDialog;
