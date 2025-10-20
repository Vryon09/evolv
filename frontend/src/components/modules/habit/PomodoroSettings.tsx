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
import { useUpdatePomodoroSettings } from "@/services/apiPomodoro";
import type React from "react";

export interface IPomodoroSettings {
  pomodoro: number;
  short: number;
  long: number;
  autoPomodoro: boolean;
  autoBreak: boolean;
  longBreakInterval: number;
}

interface PomodoroSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pomodoroSettings: IPomodoroSettings;
  setPomodoroSettings: React.Dispatch<React.SetStateAction<IPomodoroSettings>>;
}

function PomodoroSettings({
  open,
  onOpenChange,
  pomodoroSettings,
  setPomodoroSettings,
}: PomodoroSettingsProps) {
  const { mutate: handleUpdatePomodoroSettings } = useUpdatePomodoroSettings();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleUpdatePomodoroSettings(pomodoroSettings);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize your pomodoro</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="space-y-1">
              <Label htmlFor="pomodoro">Pomodoro</Label>
              <Input
                id="pomodoro"
                type="number"
                value={pomodoroSettings.pomodoro}
                onChange={(e) => {
                  e.preventDefault();
                  setPomodoroSettings((prev: IPomodoroSettings) => {
                    return { ...prev, pomodoro: +e.target.value };
                  });
                }}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="short">Short Break</Label>
              <Input
                id="short"
                type="number"
                value={pomodoroSettings.short}
                onChange={(e) => {
                  e.preventDefault();
                  setPomodoroSettings((prev: IPomodoroSettings) => {
                    return { ...prev, short: +e.target.value };
                  });
                }}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="long">Long Break</Label>
              <Input
                id="long"
                type="number"
                value={pomodoroSettings.long}
                onChange={(e) => {
                  e.preventDefault();
                  setPomodoroSettings((prev: IPomodoroSettings) => {
                    return { ...prev, long: +e.target.value };
                  });
                }}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Auto Pomodoro</Label>
              <Switch
                className="cursor-pointer"
                id="auto-pomodoro"
                checked={pomodoroSettings.autoPomodoro}
                onCheckedChange={(checked) => {
                  setPomodoroSettings((prev: IPomodoroSettings) => {
                    return { ...prev, autoPomodoro: checked };
                  });
                }}
                defaultChecked={pomodoroSettings.autoPomodoro}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Auto Break</Label>
              <Switch
                className="cursor-pointer"
                id="auto-break"
                checked={pomodoroSettings.autoBreak}
                onCheckedChange={(checked) => {
                  setPomodoroSettings((prev: IPomodoroSettings) => {
                    return { ...prev, autoBreak: checked };
                  });
                }}
                defaultChecked={pomodoroSettings.autoPomodoro}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="long">Long Break Interval</Label>
              <Input
                className="w-14"
                id="long"
                type="number"
                value={pomodoroSettings.longBreakInterval}
                onChange={(e) => {
                  e.preventDefault();
                  setPomodoroSettings((prev: IPomodoroSettings) => {
                    return { ...prev, longBreakInterval: +e.target.value };
                  });
                }}
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
