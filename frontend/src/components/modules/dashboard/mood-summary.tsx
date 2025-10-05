import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Smile, Meh, Frown, Heart, Zap, Cloud } from "lucide-react"
import { cn } from "@/lib/utils"

type MoodType = "great" | "good" | "neutral" | "sad" | "stressed"

interface MoodEntry {
  date: string
  mood: MoodType
  label: string
}

interface MoodOption {
  type: MoodType
  icon: React.ReactNode
  label: string
  color: string
  bgColor: string
}

// Mock data for 7-day mood history
const INITIAL_MOOD_HISTORY: MoodEntry[] = [
  { date: "Mon", mood: "good", label: "Happy" },
  { date: "Tue", mood: "great", label: "Excited" },
  { date: "Wed", mood: "neutral", label: "Neutral" },
  { date: "Thu", mood: "good", label: "Happy" },
  { date: "Fri", mood: "great", label: "Excited" },
  { date: "Sat", mood: "good", label: "Happy" },
  { date: "Today", mood: "good", label: "Happy" },
]

const MOOD_OPTIONS: MoodOption[] = [
  {
    type: "great",
    icon: <Heart className="h-6 w-6" />,
    label: "Excited",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10 hover:bg-green-500/20 border-green-500/20",
  },
  {
    type: "good",
    icon: <Smile className="h-6 w-6" />,
    label: "Happy",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20",
  },
  {
    type: "neutral",
    icon: <Meh className="h-6 w-6" />,
    label: "Neutral",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/20",
  },
  {
    type: "sad",
    icon: <Frown className="h-6 w-6" />,
    label: "Sad",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/20",
  },
  {
    type: "stressed",
    icon: <Cloud className="h-6 w-6" />,
    label: "Stressed",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10 hover:bg-red-500/20 border-red-500/20",
  },
]

const getMoodColor = (mood: MoodType): string => {
  const colors = {
    great: "bg-green-500",
    good: "bg-emerald-500",
    neutral: "bg-yellow-500",
    sad: "bg-orange-500",
    stressed: "bg-red-500",
  }
  return colors[mood]
}

const getMoodHeight = (mood: MoodType): string => {
  const heights = {
    great: "h-16",
    good: "h-12",
    neutral: "h-8",
    sad: "h-6",
    stressed: "h-4",
  }
  return heights[mood]
}

export function MoodSummary() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(INITIAL_MOOD_HISTORY)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const todayMood = moodHistory[moodHistory.length - 1]
  const todayMoodOption = MOOD_OPTIONS.find((m) => m.type === todayMood.mood)

  const logMood = (moodType: MoodType, label: string) => {
    setMoodHistory((prev) => {
      const newHistory = [...prev]
      newHistory[newHistory.length - 1] = { date: "Today", mood: moodType, label }
      return newHistory
    })
    setIsDialogOpen(false)
  }

  const getSummaryText = () => {
    const positiveMoods = moodHistory.filter((m) => m.mood === "great" || m.mood === "good").length
    const percentage = (positiveMoods / moodHistory.length) * 100

    if (percentage >= 80) return "You've been mostly positive this week!"
    if (percentage >= 60) return "Your week has been pretty good overall."
    if (percentage >= 40) return "Mixed emotions this week — that's okay!"
    return "This week has been challenging. Take care of yourself."
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">Mood Overview</CardTitle>
            <CardDescription>Track your emotional well-being</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Zap className="h-4 w-4" />
                Log Mood
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>How are you feeling today?</DialogTitle>
                <DialogDescription>Select your current mood to track your emotional journey</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 py-4">
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood.type}
                    onClick={() => logMood(mood.type, mood.label)}
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 transition-all",
                      mood.bgColor,
                      mood.color,
                    )}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/50">
                      {mood.icon}
                    </div>
                    <span className="text-lg font-semibold">{mood.label}</span>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's Mood */}
        <div className="space-y-3 rounded-lg bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Today's Mood</span>
            <div
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-all animate-scale-in",
                todayMoodOption?.bgColor,
                todayMoodOption?.color,
              )}
            >
              {todayMoodOption?.icon}
              <span>{todayMood.label}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{getSummaryText()}</p>
        </div>

        {/* 7-Day Mood Chart */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">7-Day Mood History</h3>
          <div className="flex items-end justify-between gap-2 rounded-lg border bg-card p-4">
            {moodHistory.map((entry, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative flex h-20 w-full items-end justify-center">
                  <div
                    className={cn(
                      "w-full rounded-t-md transition-all duration-300",
                      getMoodColor(entry.mood),
                      getMoodHeight(entry.mood),
                    )}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{entry.date}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-green-500" />
              <span>Positive</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-yellow-500" />
              <span>Neutral</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-red-500" />
              <span>Negative</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
