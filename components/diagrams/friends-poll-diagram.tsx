"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Vote, CalendarDays, Users, Sparkles } from "lucide-react"

const stages = [
  {
    title: "Crew in",
    description: "Invite link drops in chat.",
    icon: Users,
  },
  {
    title: "Poll snapshots",
    description: "Waypoint tallies categories, templates, timing.",
    icon: Vote,
  },
  {
    title: "Calendar lock",
    description: "Conflicts resolved, plan auto-builds.",
    icon: CalendarDays,
  },
  {
    title: "Live night",
    description: "Notifications + reroutes on standby.",
    icon: Sparkles,
  },
]

export function FriendsPollDiagram() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % stages.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-3xl border border-border/40 bg-card/60 p-6">
      <Badge className="border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Planner loop
      </Badge>
      <p className="mt-2 text-sm text-muted-foreground">
        Watch the friends coordinator spin up a plan in four tiny beats.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon
          const activeStage = index === active
          return (
            <div
              key={stage.title}
              onMouseEnter={() => setActive(index)}
              className={`relative overflow-hidden rounded-2xl border px-4 py-6 transition-all duration-300 ${
                activeStage ? "border-accent/60 bg-accent/10" : "border-border/40 bg-background/60"
              }`}
            >
              {activeStage && <span className="absolute right-3 top-3 text-[10px] uppercase tracking-[0.25em] text-accent">Now</span>}
              <div
                className={`flex size-10 items-center justify-center rounded-full ${
                  activeStage ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{stage.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{stage.description}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        Tap any stage to jump ahead <ArrowRight className="h-3 w-3" />
      </div>
    </div>
  )
}
