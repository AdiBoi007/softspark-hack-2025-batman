"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

const slots = [
  { time: "07:00", title: "Sunrise dip", category: "beach" },
  { time: "08:30", title: "Pour-over ritual", category: "cafe" },
  { time: "10:00", title: "Coastal walk", category: "outdoor" },
  { time: "12:00", title: "Recovery brunch", category: "restaurant" },
]

const categoryColors: Record<string, string> = {
  beach: "bg-cyan-500/80",
  cafe: "bg-amber-500/80",
  outdoor: "bg-emerald-500/80",
  restaurant: "bg-rose-500/80",
}

export function SoloJourneyDiagram() {
  const [pace, setPace] = useState([60])
  const spacing = useMemo(() => 60 + pace[0] / 2, [pace])

  return (
    <div className="rounded-3xl border border-border/40 bg-card/60 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge className="border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Journey timeline
          </Badge>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Drag the pace slider to see how Waypoint automatically adjusts buffer times for a solo itinerary.
          </p>
        </div>
        <div className="w-full max-w-xs">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Pace</p>
          <Slider value={pace} onValueChange={setPace} min={20} max={100} step={10} className="mt-2" />
          <p className="mt-1 text-xs text-muted-foreground">
            {pace[0] <= 40 ? "Chill" : pace[0] >= 80 ? "Packed" : "Balanced"} flow
          </p>
        </div>
      </div>

      <div className="mt-8 relative">
        <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-border/60" />
        <div className="flex flex-col gap-6">
          {slots.map((slot, index) => {
            const offset = index * spacing
            return (
              <div key={slot.time} className="flex items-center gap-4">
                <div className="flex w-20 flex-col items-end text-right text-xs text-muted-foreground">
                  <span>{slot.time}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em]">{slot.category}</span>
                </div>
                <div className="relative h-16 flex-1">
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 flex min-w-[160px] -translate-y-1/2 items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white shadow-lg transition-transform",
                      categoryColors[slot.category] ?? "bg-foreground",
                    )}
                    style={{ transform: `translate(${offset}px, -50%)` }}
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">
                      {index + 1}
                    </span>
                    {slot.title}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
