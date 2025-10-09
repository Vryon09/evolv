import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Plus } from "lucide-react";

function HabitActions() {
  return (
    <div className="flex justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>
            <Filter /> Sort By: Streak
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Streak</DropdownMenuItem>
          <DropdownMenuItem>Most Recent</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button>
        <Plus /> <span>Add Habit</span>
      </Button>
    </div>
  );
}

export default HabitActions;
