"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Mountain, Coffee, Users } from "lucide-react"

const crews = [
  { id: "crew-a", label: "Sunrise Ridge", category: "outdoor", icon: Mountain },
  { id: "crew-b", label: "Hidden Cafés", category: "cafe", icon: Coffee },
  { id: "crew-c", label: "Indie Night", category: "nightlife", icon: Sparkles },
]

const links: Array<[string, string]> = [
  ["crew-a", "crew-b"],
  ["crew-b", "crew-c"],
  ["crew-a", "crew-c"],
]

type CrewId = (typeof crews)[number]["id"]

const compatibility: Record<CrewId, number> = {
  "crew-a": 92,
  "crew-b": 88,
  "crew-c": 95,
}

const categoryColor: Record<string, string> = {
  outdoor: "bg-emerald-500/80",
  cafe: "bg-amber-500/80",
  nightlife: "bg-purple-500/80",
}

export function DiscoverNetworkDiagram() {
  const [activeCrew, setActiveCrew] = useState("crew-a")

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCrew((prev) => {
        const index = crews.findIndex((crew) => crew.id === prev)
        return crews[(index + 1) % crews.length].id
      })
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-3xl border border-border/40 bg-card/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge className="border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Compatibility mesh
          </Badge>
          <p className="mt-2 text-sm text-muted-foreground">
            Crews glow together when vibes and schedules line up.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <Users className="h-4 w-4" /> 4–8 per crew
        </div>
      </div>

      <div className="relative mt-8 h-56 overflow-hidden rounded-3xl border border-border/40 bg-background/70">
        <svg viewBox="0 0 360 200" className="h-full w-full">
          {links.map(([from, to]) => {
            const start = crews.find((crew) => crew.id === from)!
            const end = crews.find((crew) => crew.id === to)!
            const isActive = from === activeCrew || to === activeCrew
            return (
              <line
                key={`${from}-${to}`}
                x1={start.id === "crew-a" ? 90 : start.id === "crew-b" ? 180 : 270}
                y1={start.id === "crew-a" ? 140 : start.id === "crew-b" ? 60 : 120}
                x2={end.id === "crew-a" ? 90 : end.id === "crew-b" ? 180 : 270}
                y2={end.id === "crew-a" ? 140 : end.id === "crew-b" ? 60 : 120}
                stroke={isActive ? "rgba(232,204,126,0.9)" : "rgba(148,163,184,0.4)"}
                strokeWidth={isActive ? 4 : 2}
                strokeDasharray={isActive ? "" : "10 6"}
              />
            )
          })}

          {crews.map((crew) => {
            const Icon = crew.icon
            const x = crew.id === "crew-a" ? 90 : crew.id === "crew-b" ? 180 : 270
            const y = crew.id === "crew-a" ? 140 : crew.id === "crew-b" ? 60 : 120
            const isActive = crew.id === activeCrew
            return (
              <g key={crew.id} onMouseEnter={() => setActiveCrew(crew.id)} className="cursor-pointer">
                <circle cx={x} cy={y} r={isActive ? 36 : 30} fill="rgba(15,23,42,0.9)" stroke="rgba(232,204,126,0.6)" strokeWidth={isActive ? 4 : 2} />
                <foreignObject x={x - 20} y={y - 20} width="40" height="40">
                  <div
                    className={`flex h-full w-full items-center justify-center rounded-full ${
                      categoryColor[crew.category] ?? "bg-foreground"
                    } text-white`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </foreignObject>
                <text x={x} y={y + 55} textAnchor="middle" className="text-sm font-semibold fill-foreground">
                  {crew.label}
                </text>
                <text x={x} y={y + 70} textAnchor="middle" className="text-[11px] uppercase tracking-[0.25em] fill-muted-foreground">
                  {compatibility[crew.id]}% match
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
