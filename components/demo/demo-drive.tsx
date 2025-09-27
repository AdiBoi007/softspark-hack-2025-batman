"use client"

import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DemoTimelineStop } from "@/lib/demo-showcase"

interface DemoDriveProps {
  stops: DemoTimelineStop[]
}

const stageOrder = ["morning", "day", "evening", "late"] as const

const stageLabels: Record<(typeof stageOrder)[number], string> = {
  morning: "Morning Ritual",
  day: "Daytime Explorer",
  evening: "Evening Culture",
  late: "Late Night Energy",
}

const stageSummaries: Record<(typeof stageOrder)[number], string> = {
  morning: "Sunrise swim, coffee rituals, and Assemble Weather running quietly in the background.",
  day: "Waypoint juggles hikes, thrift crawls, dietary notes, and transit buffers without breaking a sweat.",
  evening: "Private gallery preview, Aperitif pairing, backup rides. AI nudges the crew at each check-in.",
  late: "Warehouse set + afters fallback. Bands glow to the beat while safety stays on.",
}

const stageFeatures: Record<(typeof stageOrder)[number], string[]> = {
  morning: ["Assemble Weather Lens", "Tide & UV monitor", "Heated towel kiosk unlock"],
  day: ["Inventory sync for thrift", "Dietary engine for brunch", "Ride orchestrator"],
  evening: ["Venue capacity watchdog", "Taxi + shuttle scheduling", "Crew check-ins every 90 minutes"],
  late: ["Bands pulse to DJ link", "SOS overlay ready", "Fallback venue auto-booked"],
}

export function DemoDrive({ stops }: DemoDriveProps) {
  const stageStops = useMemo(() => {
    const mapping: Record<(typeof stageOrder)[number], DemoTimelineStop[]> = {
      morning: stops.filter((_stop, index) => index <= 2),
      day: stops.filter((_stop, index) => index === 3),
      evening: stops.filter((_stop, index) => index === 4),
      late: stops.filter((_stop, index) => index === 5),
    }
    return mapping
  }, [stops])

  const [stage, setStage] = useState<(typeof stageOrder)[number]>("morning")

  const primaryStop = stageStops[stage][0] ?? stops[0]

  return (
    <section id="drive" className="container space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Badge className="border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Test drive
          </Badge>
          <h2 className="font-comfortaa text-3xl font-semibold text-foreground">
            Spin the demo like a real user
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Step through a single day with Assemble AI orchestrating every moment. Tap a stage to see the map, what the AI
            is juggling, and which extensions are at work.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
            • Map view per stage
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
            • AI automations
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
            • Safety + fallback readiness
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,1.2fr)]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {stageOrder.map((item) => (
              <button
                key={item}
                onClick={() => setStage(item)}
                className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                  stage === item
                    ? "border-accent/60 bg-accent/10 text-foreground shadow-lg shadow-accent/10"
                    : "border-border/40 bg-background/60 text-muted-foreground hover:border-border"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.3em]">{stageLabels[item]}</p>
                <p className="mt-2 text-sm font-semibold">{stageSummaries[item]}</p>
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-border/40 bg-background/60 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              What Assemble AI is handling
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {stageFeatures[stage].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border/40 bg-background/60 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Stops in this window</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              {stageStops[stage].map((stop) => (
                <div key={stop.slot} className="rounded-2xl border border-border/40 bg-card/60 px-4 py-3">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
                    <span>{stop.slot}</span>
                    <span>{stop.location}</span>
                    <span>{stop.category}</span>
                  </div>
                  <p className="mt-2 text-sm text-foreground">{stop.title}</p>
                  <p className="text-xs opacity-80">{stop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-border/40">
            <iframe
              key={primaryStop.mapUrl}
              src={primaryStop.mapUrl}
              className="h-72 w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title={`${primaryStop.title} map`}
            />
          </div>
          <div className="rounded-3xl border border-border/40 bg-card/60 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Live context</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Assemble AI cross-checks venue telemetry, weather, dietary notes, ride timing, and check-ins at every stage.
              This is what your crew experiences the first time they touch the app.
            </p>
            <Button asChild variant="ghost" className="mt-4 gap-2 px-0 text-foreground hover:text-foreground/80">
              <a href="#conversation">Replay the AI conversation</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
