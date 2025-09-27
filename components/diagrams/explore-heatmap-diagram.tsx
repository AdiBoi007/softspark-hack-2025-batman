"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

const gridCategories = [
  "Nightlife",
  "Restaurants",
  "Cafés",
  "Beaches",
  "Outdoors",
  "Events",
  "Travel",
  "Retail",
  "Cowork",
]

const heatColors = [
  "from-emerald-500/60 to-emerald-400/20",
  "from-sky-500/60 to-sky-400/20",
  "from-amber-500/60 to-amber-400/20",
  "from-rose-500/60 to-rose-400/20",
]

export function ExploreHeatmapDiagram() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gridCategories.length)
    }, 1800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-3xl border border-border/40 bg-card/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge className="border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Live heatmap pulse
          </Badge>
          <p className="mt-2 text-sm text-muted-foreground">
            Each tile brightens as a category trends in the Explore feed.
          </p>
        </div>
        <div className="flex gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="rounded-full bg-emerald-500/80 px-2 py-1 text-background">Hot</span>
          <span className="rounded-full bg-zinc-700 px-2 py-1 text-foreground">Calm</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {gridCategories.map((category, index) => {
          const active = index === activeIndex
          const color = heatColors[index % heatColors.length]
          return (
            <div
              key={category}
              className={`relative overflow-hidden rounded-2xl border border-border/40 bg-background/70 p-4 transition-all duration-500 ${
                active ? "scale-[1.03] shadow-lg shadow-emerald-500/20" : "opacity-80"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${color} ${active ? "opacity-70" : "opacity-10"} transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Category</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{category}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {active ? "Trending now" : "Live monitoring"}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
