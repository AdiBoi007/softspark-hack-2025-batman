"use client"

import { useMemo, useState } from "react"
import {
  ArrowRight,
  Sparkles,
  Gauge,
  Workflow,
  Compass,
  ChevronRight,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { modeSpotlights } from "@/lib/waypoint-data"
import { cn } from "@/lib/utils"

const accentRing: Record<string, string> = {
  Solo: "from-sky-500/30 via-sky-500/10 to-transparent",
  Discover: "from-purple-500/30 via-purple-500/10 to-transparent",
  Friends: "from-emerald-500/30 via-emerald-500/10 to-transparent",
}

type ModeValue = (typeof modeSpotlights)[number]["mode"]

export function ModeSwitchboard() {
  const [value, setValue] = useState<ModeValue>(modeSpotlights[0]?.mode ?? "Solo")

  const active = useMemo(
    () => modeSpotlights.find((spotlight) => spotlight.mode === value) ?? modeSpotlights[0],
    [value],
  )

  if (!active) return null

  return (
    <section className="py-20">
      <div className="container space-y-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Badge className="border border-border/50 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Modes decoded
            </Badge>
            <h2 className="font-comfortaa text-3xl font-semibold tracking-tight sm:text-4xl">
              Pick a mode, see the playbook
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Hover for live stats, scroll the playbook, and jump straight into the right planner with one tap.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
              <Sparkles className="h-3 w-3" /> AI tuned
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
              <Workflow className="h-3 w-3" /> Ready to run
            </span>
          </div>
        </div>

        <Tabs value={value} onValueChange={(next) => setValue(next as ModeValue)} className="w-full">
          <TabsList className="grid w-full gap-2 rounded-2xl border border-border/40 bg-card/50 p-2 md:grid-cols-3">
            {modeSpotlights.map((spotlight) => (
              <TabsTrigger
                key={spotlight.mode}
                value={spotlight.mode}
                className="flex h-auto flex-col gap-2 rounded-xl border border-transparent px-4 py-4 text-left text-base data-[state=active]:border-border data-[state=active]:bg-background/80"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{spotlight.mode}</span>
                <span className="font-medium text-foreground">{spotlight.headline}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {modeSpotlights.map((spotlight) => (
            <TabsContent key={spotlight.mode} value={spotlight.mode} className="mt-8">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
                <Card className="relative overflow-hidden border-border/40 bg-card/60">
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br",
                      accentRing[spotlight.mode] ?? "from-accent/20 via-accent/10 to-transparent",
                    )}
                  />
                  <CardHeader className="relative space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      <Gauge className="h-3 w-3" /> Mode signals
                    </div>
                    <CardTitle className="text-2xl text-foreground">{spotlight.description}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                      {spotlight.stats.map((stat) => (
                        <HoverCard key={`${spotlight.mode}-${stat.label}`}>
                          <HoverCardTrigger asChild>
                            <div className="cursor-pointer rounded-2xl border border-border/40 bg-background/70 p-4 transition-all duration-200 hover:border-border">
                              <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                                {stat.label}
                              </p>
                              <p className="mt-2 text-2xl font-semibold text-foreground">{stat.value}</p>
                              <p className="text-xs text-muted-foreground">{stat.caption}</p>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-64 border-border/40 bg-background/95 text-xs text-muted-foreground">
                            Powered by live usage data, refreshed hourly.
                          </HoverCardContent>
                        </HoverCard>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        <Compass className="h-3 w-3" /> Playbook
                      </div>
                      <ScrollArea className="max-h-40 rounded-2xl border border-border/40 bg-background/70 p-4">
                        <ol className="space-y-3 text-sm text-muted-foreground">
                          {spotlight.playbook.map((step, index) => (
                            <li key={`${spotlight.mode}-step-${index}`} className="flex items-start gap-3">
                              <span className="mt-0.5 flex size-6 items-center justify-center rounded-full border border-border/40 text-xs font-semibold text-foreground">
                                {index + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </ScrollArea>
                    </div>

                    <Button asChild className="gap-2">
                      <a href={spotlight.cta.href}>
                        {spotlight.cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/40 bg-card/60">
                  <CardHeader className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Live routes
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      Real users running {spotlight.mode.toLowerCase()} right now
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="grid gap-3">
                      {modeSpotlights
                        .filter((item) => item.mode !== spotlight.mode)
                        .map((item) => (
                          <div
                            key={`${spotlight.mode}-${item.mode}`}
                            className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/60 p-4"
                          >
                            <div>
                              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{item.mode}</p>
                              <p className="text-sm text-foreground">{item.headline}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1 text-foreground" asChild>
                              <a href={item.cta.href}>
                                Jump
                                <ChevronRight className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Switch modes anytime — Waypoint keeps your saved journeys and polls ready to remix.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
