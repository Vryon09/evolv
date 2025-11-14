import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Filter } from "lucide-react";

interface HabitSortProps {
  sortBy: "default" | "recent" | "streak";
  setSortBy: (sortBy: "default" | "recent" | "streak") => void;
}

function HabitsSort({ sortBy, setSortBy }: HabitSortProps) {
  return (
    <div className="z-50 flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Sort by:{" "}
            {sortBy === "streak"
              ? "Streak"
              : sortBy === "recent"
                ? "Recent"
                : "Default"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="space-y-1 border-1 bg-white"
        >
          <DropdownMenuItem
            className="cursor-pointer px-2 py-1 text-xs hover:bg-neutral-200"
            onClick={() => setSortBy("default")}
          >
            Default
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer px-2 py-1 text-xs hover:bg-neutral-200"
            onClick={() => setSortBy("recent")}
          >
            Most Recent
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer px-2 py-1 text-xs hover:bg-neutral-200"
            onClick={() => setSortBy("streak")}
          >
            Highest Streak
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HabitsSort;
