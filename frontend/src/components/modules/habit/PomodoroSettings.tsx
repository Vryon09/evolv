import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface IPomodoroSettings {
  pomodoroTime: number;
  shortTime: number;
  longTime: number;
  autoPomodoro: boolean;
  autoBreak: boolean;
}

interface PomodoroSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pomodoroSettings: IPomodoroSettings;
}

function PomodoroSettings({
  open,
  onOpenChange,
  pomodoroSettings,
}: PomodoroSettingsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize your pomodoro</DialogDescription>
        </DialogHeader>
        <form>
          <div className="flex gap-4">
            <div className="space-y-1">
              <Label htmlFor="pomodoro">Pomodoro</Label>
              <Input
                id="pomodoro"
                type="number"
                defaultValue={pomodoroSettings.pomodoroTime}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="short">Short Break</Label>
              <Input
                id="short"
                type="number"
                defaultValue={pomodoroSettings.shortTime}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="long">Long Break</Label>
              <Input
                id="long"
                type="number"
                defaultValue={pomodoroSettings.longTime}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Auto Pomodoro</Label>
              <Switch
                className="cursor-pointer"
                id="auto-pomodoro"
                defaultChecked={pomodoroSettings.autoPomodoro}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Auto Break</Label>
              <Switch
                className="cursor-pointer"
                id="auto-break"
                defaultChecked={pomodoroSettings.autoPomodoro}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button size="sm" className="cursor-pointer">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PomodoroSettings;
