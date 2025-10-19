import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import PomodoroSettings from "./PomodoroSettings";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import type { IUser } from "@/components/layout/OSLayout";

function PomodoroTimer() {
  const [pomodoroSettings, setPomodoroSettings] = useState({
    pomodoroTime: 0,
    shortTime: 0,
    longTime: 0,
    autoPomodoro: false,
    autoBreak: false,
  });
  const [isPomodoroSettingsOpen, setIsPomodoroSettingsOpen] = useState(false);

  const { user }: { user?: IUser } = useOutletContext();

  useEffect(() => {
    setPomodoroSettings(
      user?.pomodoroSetting || {
        pomodoroTime: 0,
        shortTime: 0,
        longTime: 0,
        autoPomodoro: false,
        autoBreak: false,
      },
    );
  }, [user]);

  return (
    <div>
      <Card className="mt-8 max-w-[500px] p-6">
        <header className="flex flex-col">
          <div className="flex w-full justify-end">
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => setIsPomodoroSettingsOpen(true)}
            >
              <Settings />
            </Button>
          </div>
          <div className="mx-6 flex justify-between p-2">
            <Button variant="default" className="cursor-pointer">
              Pomodoro
            </Button>
            <Button variant="secondary" className="cursor-pointer">
              Short Break
            </Button>
            <Button variant="secondary" className="cursor-pointer">
              Long Break
            </Button>
          </div>
        </header>
        <div className="flex items-center justify-center">
          <p className="text-6xl">25:00</p>
        </div>
        <Button className="cursor-pointer">Start</Button>
      </Card>

      <PomodoroSettings
        open={isPomodoroSettingsOpen}
        onOpenChange={(open) => setIsPomodoroSettingsOpen(open)}
        pomodoroSettings={pomodoroSettings}
      />
    </div>
  );
}

export default PomodoroTimer;
