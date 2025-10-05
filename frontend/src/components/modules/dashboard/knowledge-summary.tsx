import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Flame, TrendingUp, BookMarked, Lightbulb, FileText } from "lucide-react"

// Mock data for recent notes
const mockNotes = [
  { id: 1, title: "React Server Components Deep Dive", icon: "book", addedDaysAgo: 0 },
  { id: 2, title: "TypeScript Advanced Patterns", icon: "lightbulb", addedDaysAgo: 1 },
  { id: 3, title: "Database Optimization Techniques", icon: "bookmark", addedDaysAgo: 2 },
]

const mockData = {
  studyStreak: 5,
  weeklyStudySessions: 7,
  recentNotes: mockNotes.slice(0, 3),
  weeklyProgress: [3, 5, 4, 6, 7, 5, 8], // Last 7 days study sessions
}

const noteIcons = {
  book: BookOpen,
  lightbulb: Lightbulb,
  bookmark: BookMarked,
}

export function KnowledgeSummary() {
  const [streak] = useState(mockData.studyStreak)
  const completedThisWeek = mockData.weeklyStudySessions
  const maxSessions = Math.max(...mockData.weeklyProgress)

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Knowledge Overview
        </CardTitle>
        <CardDescription>Your learning journey at a glance</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        {/* Study Streak */}
        <div className="flex items-center justify-between rounded-lg bg-primary/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{streak} days</p>
              <p className="text-sm text-muted-foreground">Study streak</p>
            </div>
          </div>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>

        {/* Weekly Progress Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">You studied {completedThisWeek} times this week</p>
            <span className="text-xs text-muted-foreground">{completedThisWeek}/7 days</span>
          </div>

          {/* Mini sparkline chart */}
          <div className="flex items-end gap-1 h-12">
            {mockData.weeklyProgress.map((sessions, index) => (
              <div
                key={index}
                className="flex-1 bg-primary/20 rounded-t transition-all hover:bg-primary/30"
                style={{
                  height: `${(sessions / maxSessions) * 100}%`,
                  minHeight: "8px",
                }}
                title={`${sessions} sessions`}
              />
            ))}
          </div>
        </div>

        {/* Recent Notes */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Recent Notes</h4>
          <div className="space-y-2">
            {mockData.recentNotes.map((note) => {
              const IconComponent = noteIcons[note.icon as keyof typeof noteIcons] || FileText
              return (
                <div
                  key={note.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent"
                >
                  <IconComponent className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight line-clamp-2">{note.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {note.addedDaysAgo === 0
                        ? "Added today"
                        : `Added ${note.addedDaysAgo} day${note.addedDaysAgo > 1 ? "s" : ""} ago`}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="rounded-lg bg-muted/50 p-3 border border-border">
          <p className="text-sm text-muted-foreground text-center">Keep learning — your consistency is growing!</p>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-transparent" variant="outline">
          <BookOpen className="mr-2 h-4 w-4" />
          Open Knowledge Hub
        </Button>
      </CardContent>
    </Card>
  )
}
