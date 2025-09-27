"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

import type { DemoTimelineStop } from "@/lib/demo-showcase"

interface DemoTimelineProps {
  stops: DemoTimelineStop[]
}

export function DemoTimeline({ stops }: DemoTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeStop = useMemo(() => stops[activeIndex], [stops, activeIndex])

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,1.2fr)]">
      <div className="flex flex-col gap-4">
        <Badge className="w-fit border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Sunrise → afterhours
        </Badge>
        <h3 className="font-comfortaa text-3xl font-semibold text-foreground">One demo day, assembled for you</h3>
        <p className="text-sm text-muted-foreground">
          Click through the timeline to see Assemble AI weaving beach rituals, thrift crawls, gallery moments, and
          sunrise sets into one flow.
        </p>

        <div className="mt-4 space-y-3">
          {stops.map((stop, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={stop.slot}
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                  isActive
                    ? "border-accent/60 bg-accent/10 text-foreground shadow-lg shadow-accent/10"
                    : "border-border/40 bg-background/60 text-muted-foreground hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em]">{stop.slot}</span>
                  <span className="rounded-full bg-foreground/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em]">
                    {stop.category}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold">{stop.title}</p>
                <p className="text-xs opacity-80">{stop.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/60">
        <div className="relative h-full transition-all duration-300">
          <Image
            key={activeStop.media}
            src={activeStop.media}
            alt={activeStop.title}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
              <span>{activeStop.location}</span>
              <span>{activeStop.category}</span>
            </div>
            <h4 className="mt-2 text-2xl font-semibold">{activeStop.title}</h4>
            <p className="mt-2 text-sm text-white/90">{activeStop.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
