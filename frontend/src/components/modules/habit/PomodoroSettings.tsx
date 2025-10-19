import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PomodoroSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function PomodoroSettings({ open, onOpenChange }: PomodoroSettingsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PomodoroSettings;
