"use client"

import { cn } from "@/lib/utils"

interface MiniCalendarProps {
  completedDates: string[]
  startDate: string
}

export function MiniCalendar({ completedDates, startDate }: MiniCalendarProps) {
  const today = new Date()
  const start = new Date(startDate)

  // Get last 42 days (6 weeks) for a nice grid
  const days: Date[] = []
  for (let i = 41; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    days.push(date)
  }

  const isCompleted = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return completedDates.includes(dateStr)
  }

  const isBeforeStart = (date: Date) => {
    return date < start
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Activity</h4>
        <span className="text-xs text-muted-foreground">Last 6 weeks</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((date, index) => {
          const completed = isCompleted(date)
          const beforeStart = isBeforeStart(date)
          const today = isToday(date)

          return (
            <div
              key={index}
              className={cn(
                "aspect-square rounded-sm transition-all",
                beforeStart && "bg-muted/30",
                !beforeStart && !completed && "bg-muted/50",
                completed && "bg-success",
                today && "ring-2 ring-accent ring-offset-2 ring-offset-background",
              )}
              title={date.toLocaleDateString()}
            />
          )
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded-sm bg-muted/50" />
          <div className="h-3 w-3 rounded-sm bg-success/40" />
          <div className="h-3 w-3 rounded-sm bg-success/70" />
          <div className="h-3 w-3 rounded-sm bg-success" />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
