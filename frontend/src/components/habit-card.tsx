import {
  Check,
  Flame,
  MoreVertical,
  Edit2,
  Trash2,
  Archive,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { IHabit } from "types/habit";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { useState } from "react";

interface HabitCardProps {
  habit: IHabit;
  onToggleComplete: (id: string) => void;
  onEdit: () => void;
  onArchive: () => void;
  onDelete: (id: string) => void;
}

export function HabitCard({
  habit,
  onToggleComplete,
  onEdit,
  onArchive,
  onDelete,
}: HabitCardProps) {
  const [isCalendarShow, setIsCalendarShow] = useState(false);

  const date = new Date();
  const today = format(date, "yyyy-MM-dd'T'HH:mm:ssXXX").split("T")[0];
  const isCompletedToday = habit.completedDates.some(
    (date) => date.split("T")[0] === today,
  );
  const calendarDatesHighlight = habit.completedDates.map(
    (date) => new Date(date),
  );

  // Calculate completion rate (last 30 days)
  // const thirtyDaysAgo = new Date();
  // thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  // const recentCompletions = habit.completedDates.filter(
  //   (date) => new Date(date) >= thirtyDaysAgo,
  // ).length;
  // const completionRate = Math.round((recentCompletions / 30) * 100);

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-foreground mb-1 font-semibold text-balance">
              {habit.title}
            </h3>
            <p className="text-muted-foreground text-sm">{habit.description}</p>
            <div className="mt-2 flex gap-2">
              {habit.tags &&
                habit.tags.map((tag, i) => (
                  <p
                    key={i}
                    className="bg-muted text-muted-foreground rounded-full px-3 py-1.5 text-xs font-medium capitalize"
                  >
                    {tag}
                  </p>
                ))}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onArchive}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(habit._id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Streak */}
        <div className="mb-4 flex items-center gap-2">
          <div className="bg-flame/10 flex items-center gap-1.5 rounded-full px-3 py-1.5">
            <Flame className="text-flame h-4 w-4" />
            <span className="text-flame text-sm font-semibold">
              {habit.streak} day streak
            </span>
          </div>
        </div>

        {/* Progress */}
        {/* <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">30-day completion</span>
            <span className="text-foreground font-semibold">
              {completionRate}%
            </span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div> */}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onToggleComplete(habit._id)}
            className={cn(
              "hover:bg-success/90 hover:text-primary-foreground flex-1 cursor-pointer gap-2 transition-all",
              isCompletedToday
                ? "text-primary-foreground bg-success"
                : "border-accent border",
            )}
            variant={isCompletedToday ? "default" : "outline"}
          >
            <Check
              className={cn(
                "h-4 w-4",
                isCompletedToday && "animate-in zoom-in-50",
              )}
            />
            {isCompletedToday ? "Completed Today" : "Mark as Done"}
          </Button>

          <Button
            className="cursor-pointer"
            variant="ghost"
            onClick={() => setIsCalendarShow(!isCalendarShow)}
          >
            {!isCalendarShow ? <ChevronDown /> : <ChevronUp />}
          </Button>
        </div>

        {isCalendarShow && (
          <div className="mt-4 rounded-2xl border-1">
            <Calendar
              mode="multiple"
              selected={calendarDatesHighlight}
              className="w-full [&_button[data-selected-single=true]]:border-2 [&_button[data-selected-single=true]]:border-green-500 [&_button[data-selected-single=true]]:bg-green-500/50"
              onSelect={() => {
                return;
              }}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
