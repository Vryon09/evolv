import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface DeleteDialogProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: () => void;
  handleDelete: () => void;
}

function DeleteDialog({
  children,
  open,
  onOpenChange,
  handleDelete,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between">
          <Button className="cursor-pointer" onClick={onOpenChange}>
            Return
          </Button>
          <Button className="cursor-pointer" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
