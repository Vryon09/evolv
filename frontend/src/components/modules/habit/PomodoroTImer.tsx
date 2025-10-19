import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import PomodoroSettings from "./PomodoroSettings";
import { useState } from "react";

function PomodoroTimer() {
  const [isPomodoroSettingsOpen, setIsPomodoroSettingsOpen] = useState(false);

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
      />
    </div>
  );
}

export default PomodoroTimer;
