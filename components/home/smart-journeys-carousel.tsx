"use client"

import type { ComponentProps } from "react"
import { useEffect, useState } from "react"

import { ArrowLeft, ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { SmartJourney } from "@/lib/waypoint-data"

const categoryBadges: Record<string, string> = {
  beach: "bg-cyan-500/15 text-cyan-200",
  cafe: "bg-amber-500/15 text-amber-200",
  outdoor: "bg-emerald-500/15 text-emerald-200",
  retail: "bg-fuchsia-500/15 text-fuchsia-200",
  event: "bg-purple-500/15 text-purple-200",
  restaurant: "bg-rose-500/15 text-rose-200",
  nightlife: "bg-slate-500/30 text-slate-100",
  travel: "bg-sky-500/15 text-sky-200",
  cowork: "bg-blue-500/15 text-blue-200",
}

const timeOfDayCopy: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  late: "Late night",
}

type CarouselApi = Parameters<NonNullable<ComponentProps<typeof Carousel>["setApi"]>>[0]

export function SmartJourneysCarousel() {
  const [journeys, setJourneys] = useState<SmartJourney[]>([])
  const [loading, setLoading] = useState(true)
  const [api, setApi] = useState<CarouselApi>()
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    let mounted = true
    const fetchJourneys = async () => {
      try {
        const response = await fetch("/api/journeys")
        if (!response.ok) throw new Error("Failed to load journeys")
        const data = (await response.json()) as { journeys: SmartJourney[] }
        if (mounted) {
          setJourneys(data.journeys)
        }
      } catch (error) {
        console.error(error)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchJourneys()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!api) return
    const update = () => {
      setCanPrev(api.canScrollPrev())
      setCanNext(api.canScrollNext())
    }
    update()
    api.on("select", update)
    api.on("reInit", update)
    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Badge className="border border-border/50 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Smart journeys
            </Badge>
            <h2 className="font-comfortaa text-3xl font-semibold tracking-tight sm:text-4xl">AI-stitched sample itineraries</h2>
            <p className="max-w-2xl text-muted-foreground">
              From sunrise rituals to late-night crawls, these are living timelines you can adopt or remix.
            </p>
          </div>
        <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="relative border-border/40 bg-background/60"
              size="icon"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
            >
              <span className="sr-only">Previous</span>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="relative border-border/40 bg-background/60"
              size="icon"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
            >
              <span className="sr-only">Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Carousel className="mt-10" opts={{ align: "start" }} setApi={setApi}>
          <CarouselContent className="-ml-6">
            {(loading ? Array.from({ length: 3 }, () => null) : journeys).map((journey, index) => {
              const categories = journey?.categories ?? (["beach", "cafe", "outdoor"] as const)
              const stops = journey?.stops ?? Array.from({ length: 3 }, () => ({
                time: "--:--",
                title: "",
                description: "",
                tags: [] as string[],
              }))

              return (
                <CarouselItem key={journey?.id ?? `journey-skeleton-${index}`} className="pl-6 sm:basis-1/2 xl:basis-1/3">
                  <Card className="h-full border-border/40 bg-card/60 backdrop-blur">
                    <CardHeader className="space-y-4">
                      {journey ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="border border-border/40 text-xs uppercase tracking-[0.25em]">
                          {timeOfDayCopy[journey.timeOfDay]}
                        </Badge>
                        <Badge variant="outline" className="border-border/40 text-xs uppercase tracking-[0.25em]">
                          {journey.vibe}
                        </Badge>
                      </div>
                    ) : (
                      <div className="h-4 w-32 animate-pulse rounded-full bg-muted/30" />
                    )}
                    <CardTitle className="text-2xl text-balance">
                      {journey ? journey.title : <span className="block h-6 w-3/4 animate-pulse rounded-full bg-muted/30" />}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {journey ? journey.summary : <span className="block h-4 w-full animate-pulse rounded-full bg-muted/20" />}
                    </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category, catIndex) => (
                          <Badge
                            key={`${journey?.id ?? "skeleton"}-cat-${catIndex}`}
                            variant="secondary"
                            className={`border border-border/30 text-xs ${categoryBadges[category] ?? "bg-border/40 text-foreground"}`}
                          >
                            {category}
                          </Badge>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {stops.map((stop, stopIndex) => (
                        <div key={`${journey?.id ?? "skeleton"}-stop-${stopIndex}`} className="flex gap-3">
                          <span className="text-xs font-medium text-muted-foreground/80">
                            {journey ? stop.time : "--:--"}
                          </span>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">
                              {journey ? stop.title : <span className="block h-4 w-40 animate-pulse rounded-full bg-muted/30" />}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {journey ? stop.description : <span className="block h-3 w-52 animate-pulse rounded-full bg-muted/20" />}
                            </p>
                            {journey && stop.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {stop.tags.map((tag) => (
                                  <Badge key={`${journey.id}-${tag}`} variant="outline" className="border-border/30 text-[10px] uppercase tracking-[0.25em]">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="px-0 text-foreground hover:text-foreground/80" size="sm">
                      Adopt this journey
                    </Button>
                  </CardContent>
                </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
