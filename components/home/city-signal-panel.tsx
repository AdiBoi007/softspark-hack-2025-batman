import { ArrowRight, MapPin, TrendingUp, AlertTriangle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cityEventHighlights, citySignals } from "@/lib/waypoint-data"
import { cn } from "@/lib/utils"

const statusAccent: Record<string, string> = {
  Trending: "border-sky-500/40 bg-sky-500/10 text-sky-100",
  Peaking: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
  Watch: "border-amber-500/40 bg-amber-500/10 text-amber-100",
}

export function CitySignalPanel() {
  return (
    <section className="py-20">
      <div className="container space-y-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Badge className="border border-border/50 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Live city signals
            </Badge>
            <h2 className="font-comfortaa text-3xl font-semibold tracking-tight sm:text-4xl">
              What’s moving right now
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              We ingest venue telemetry, wait times, and journey completions to surface where the energy is building.
            </p>
          </div>
          <Button variant="outline" asChild className="gap-2">
            <a href="/explore">
              Explore feed
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_minmax(0,1fr)]">
          <Card className="border-border/40 bg-card/60">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl text-foreground">Velocity across categories</CardTitle>
              <p className="text-sm text-muted-foreground">
                % change is calculated against the trailing seven-day average. “Watch” signals flag shifts in supply or weather.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {citySignals.map((signal) => (
                <div
                  key={signal.id}
                  className="rounded-2xl border border-border/40 bg-background/60 p-4 transition-colors duration-200 hover:border-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="border border-border/40 text-xs uppercase tracking-[0.25em]">
                          {signal.category}
                        </Badge>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.25em]",
                            statusAccent[signal.status] ?? "border-border/40 bg-border/20 text-foreground",
                          )}
                        >
                          {signal.status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{signal.metric}</p>
                      <p className="text-xs text-muted-foreground">{signal.descriptor}</p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                        {signal.change > 0 ? "▲" : signal.change < 0 ? "▼" : "≈"}
                        {Math.abs(signal.change)}%
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">vs last week</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <Progress
                      value={Math.min(100, Math.max(0, signal.status === "Watch" ? 50 + signal.change : 60 + signal.change * 1.5))}
                      className="h-2 flex-1"
                    />
                    {signal.status === "Peaking" ? <TrendingUp className="h-4 w-4 text-emerald-300" /> : <AlertTriangle className="h-4 w-4 text-amber-300" />}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/60">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl text-foreground">Moments worth dropping in</CardTitle>
              <p className="text-sm text-muted-foreground">Waypoint secures slots and handles logistics for members.</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Experience</TableHead>
                    <TableHead>When</TableHead>
                    <TableHead>Where</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cityEventHighlights.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="max-w-[180px] text-foreground">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium">{event.title}</span>
                          <Badge variant="outline" className="w-fit border-border/40 text-[10px] uppercase tracking-[0.25em]">
                            {event.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{event.time}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/80">{event.callout}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="pt-6">
                  Tap “Explore feed” to filter by neighbourhood, budget, or vibe and send straight to Journey Builder.
                </TableCaption>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
