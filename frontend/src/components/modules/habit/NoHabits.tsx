import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";

function NoHabits({
  setIsDialogOpen,
}: {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Card className="flex flex-col items-center justify-center py-16 text-center">
      <Calendar className="text-muted-foreground mb-4 h-12 w-12" />
      <h3 className="text-foreground mb-2 text-lg font-semibold">
        No habits yet
      </h3>
      <p className="text-muted-foreground mb-4 text-sm">
        Start building consistency by adding your first habit
      </p>
      <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Your First Habit
      </Button>
    </Card>
  );
}

export default NoHabits;
