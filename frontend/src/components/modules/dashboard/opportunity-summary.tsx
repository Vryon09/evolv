"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Users, CheckCircle2 } from "lucide-react"

type FollowUp = {
  id: string
  name: string
  date: string
  note: string
  status: "overdue" | "soon" | "done"
  initials: string
}

const mockFollowUps: FollowUp[] = [
  {
    id: "1",
    name: "Sarah Chen",
    date: "2025-01-08",
    note: "Follow up on project collaboration",
    status: "overdue",
    initials: "SC",
  },
  {
    id: "2",
    name: "Michael Torres",
    date: "2025-01-10",
    note: "Coffee chat about startup ideas",
    status: "soon",
    initials: "MT",
  },
  {
    id: "3",
    name: "Emma Wilson",
    date: "2025-01-12",
    note: "Share portfolio and discuss opportunities",
    status: "soon",
    initials: "EW",
  },
]

export function OpportunitySummary() {
  const [followUps, setFollowUps] = useState<FollowUp[]>(mockFollowUps)

  const totalContacts = 12
  const upcomingThisWeek = followUps.filter((f) => f.status !== "done").length

  const getStatusColor = (status: FollowUp["status"]) => {
    switch (status) {
      case "overdue":
        return "border-red-500/50 bg-red-500/10"
      case "soon":
        return "border-yellow-500/50 bg-yellow-500/10"
      case "done":
        return "border-green-500/50 bg-green-500/10"
    }
  }

  const getStatusBadge = (status: FollowUp["status"]) => {
    switch (status) {
      case "overdue":
        return <span className="text-xs font-medium text-red-600 dark:text-red-400">Overdue</span>
      case "soon":
        return <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">Soon</span>
      case "done":
        return <span className="text-xs font-medium text-green-600 dark:text-green-400">Done</span>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 0) return `${Math.abs(diffDays)}d ago`
    return `In ${diffDays}d`
  }

  const toggleComplete = (id: string) => {
    setFollowUps((prev) => prev.map((f) => (f.id === id ? { ...f, status: f.status === "done" ? "soon" : "done" } : f)))
  }

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="h-5 w-5 text-primary" />
          Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {upcomingThisWeek} follow-up{upcomingThisWeek !== 1 ? "s" : ""} this week
            </span>
          </div>
          <span className="text-sm font-medium text-foreground">{totalContacts} contacts</span>
        </div>

        {/* Follow-ups List */}
        <div className="space-y-3">
          {followUps.map((followUp) => (
            <div
              key={followUp.id}
              className={`group relative rounded-lg border p-3 transition-all ${getStatusColor(
                followUp.status,
              )} ${followUp.status === "done" ? "opacity-60" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {followUp.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`font-medium leading-tight ${followUp.status === "done" ? "line-through" : ""}`}>
                      {followUp.name}
                    </h4>
                    {getStatusBadge(followUp.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{followUp.note}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(followUp.date)}
                  </div>
                </div>

                <button
                  onClick={() => toggleComplete(followUp.id)}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Mark as complete"
                >
                  <CheckCircle2
                    className={`h-5 w-5 transition-colors ${
                      followUp.status === "done"
                        ? "fill-green-500 text-green-500"
                        : "text-muted-foreground hover:text-green-500"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Message */}
        <p className="text-center text-sm text-muted-foreground">
          {upcomingThisWeek > 0
            ? `${upcomingThisWeek} connection${upcomingThisWeek !== 1 ? "s" : ""} need${
                upcomingThisWeek === 1 ? "s" : ""
              } your attention today!`
            : "Keep growing your network!"}
        </p>

        {/* Action Button */}
        <Button variant="outline" className="w-full bg-transparent" asChild>
          <a href="/opportunities">View All Opportunities</a>
        </Button>
      </CardContent>
    </Card>
  )
}
