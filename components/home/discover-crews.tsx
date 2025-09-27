"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Users,
  Coffee,
  Mountain,
  Sparkles,
  ShoppingBag,
  MapPin,
  ArrowRight,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DiscoverCrew } from "@/lib/waypoint-data"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  mountain: Mountain,
  coffee: Coffee,
  sparkle: Sparkles,
  bag: ShoppingBag,
}

const categoryStyles: Record<string, string> = {
  outdoor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
  cafe: "border-amber-500/40 bg-amber-500/10 text-amber-100",
  event: "border-purple-500/40 bg-purple-500/10 text-purple-100",
  retail: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-100",
  nightlife: "border-slate-500/40 bg-slate-500/10 text-slate-100",
  travel: "border-sky-500/40 bg-sky-500/10 text-sky-100",
}

export function DiscoverCrewsSection() {
  const [crews, setCrews] = useState<DiscoverCrew[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const loadCrews = async () => {
      try {
        const response = await fetch("/api/crews")
        if (!response.ok) throw new Error("Failed to load crews")
        const data = (await response.json()) as { crews: DiscoverCrew[] }
        if (mounted) setCrews(data.crews)
      } catch (error) {
        console.error(error)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadCrews()
    return () => {
      mounted = false
    }
  }, [])

  const cards = useMemo<(DiscoverCrew | null)[]>(
    () => (loading ? Array.from({ length: 4 }, () => null) : crews),
    [loading, crews],
  )

  return (
    <section className="py-20">
      <div className="container space-y-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Badge className="border border-border/50 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Discover crews
            </Badge>
            <h2 className="font-comfortaa text-3xl font-semibold tracking-tight sm:text-4xl">
              Meet your crew — for anything
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              We match 4–8 people chasing the same energy, across hikes, café crawls, thrift runs, gigs, and night outs.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/discover" className="gap-2">
              Explore Discover mode
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((crew, index) => {
            const Icon = crew ? iconMap[crew.icon] ?? Users : Users
            const categoryClass = crew ? categoryStyles[crew.category] ?? "border-border/40 bg-border/10" : "bg-border/10"
            const tags = crew ? crew.tags : ["Matching", "Standby", "Soon"]
            return (
              <Card key={crew?.id ?? index} className="border-border/40 bg-card/60">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-foreground">
                      {crew ? crew.name : <span className="block h-5 w-32 animate-pulse rounded-full bg-muted/20" />}
                    </CardTitle>
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full border text-sm",
                        categoryClass,
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
                    <span>{crew ? crew.start : "--"}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {crew ? crew.location : "TBA"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    {crew ? (
                      crew.description
                    ) : (
                      <span className="block h-4 w-full animate-pulse rounded-full bg-muted/20" />
                    )}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                    <span>
                      {crew
                        ? `${crew.capacity.filled}/${crew.capacity.total} spots`
                        : "— / — spots"}
                    </span>
                    <span>Compatibility {crew ? `${crew.compatibility}%` : "--%"}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {tags.map((tag, tagIndex) => (
                      <Badge
                        key={`${crew?.id ?? "skeleton"}-tag-${tagIndex}`}
                        variant="outline"
                        className="border-border/40 bg-background/40"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90" size="sm">
                    {crew ? "Join this crew" : "Loading"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
