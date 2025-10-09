import { Card } from "@/components/ui/card";
import { Calendar, Flame, Target, TrendingUp } from "lucide-react";

function HabitStats() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-blue-500/10 p-3">
            <Target className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm">Total Completions</p>
            <p className="text-2xl font-semibold">36</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-purple-500/10 p-3">
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm">Average Streak</p>
            <p className="text-2xl font-semibold">7 days</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-red-500/10 p-3">
            <Flame className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="text-sm">Longest Streak</p>
            <p className="text-2xl font-semibold">69 days</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-green-500/10 p-3">
            <Calendar className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm">Active Habits</p>
            <p className="text-2xl font-semibold">7</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default HabitStats;
