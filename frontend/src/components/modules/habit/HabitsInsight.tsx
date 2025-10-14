import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

function HabitsInsight({ totalCompletions }: { totalCompletions: number }) {
  return (
    <Card className="border-accent/20 bg-accent/5 mt-8 p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-blue-500/10 p-3">
          <TrendingUp className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h3 className="text-foreground mb-1 font-semibold">Keep it up!</h3>
          <p className="text-muted-foreground text-sm">
            {totalCompletions > 50
              ? `You've completed ${totalCompletions} habits! You're building incredible consistency.`
              : totalCompletions > 20
                ? `${totalCompletions} completions and counting. You're on a great path!`
                : `You've completed ${totalCompletions} habits. Every day counts!`}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default HabitsInsight;
