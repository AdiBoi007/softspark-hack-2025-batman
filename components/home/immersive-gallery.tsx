"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowRight, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { visualShowcase } from "@/lib/waypoint-data"
import { cn } from "@/lib/utils"

const categoryAccent: Record<string, string> = {
  nightlife: "from-rose-500/40 via-fuchsia-500/10 to-transparent",
  restaurant: "from-amber-500/40 via-amber-500/10 to-transparent",
  cafe: "from-yellow-400/40 via-yellow-400/10 to-transparent",
  beach: "from-cyan-500/40 via-cyan-500/10 to-transparent",
  outdoor: "from-emerald-500/40 via-emerald-500/10 to-transparent",
  event: "from-purple-500/40 via-purple-500/10 to-transparent",
  travel: "from-sky-500/40 via-sky-500/10 to-transparent",
  retail: "from-pink-500/40 via-pink-500/10 to-transparent",
  cowork: "from-blue-500/40 via-blue-500/10 to-transparent",
}

export function ImmersiveGallery() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section className="py-20">
      <div className="container space-y-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Badge className="border border-border/50 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Visual feed
            </Badge>
            <h2 className="font-comfortaa text-3xl font-semibold tracking-tight sm:text-4xl">
              Nights, days, and weekender energy on display
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Each tile surfaces a real Waypoint storyline. Hover to preview logistics, safety layers, and how we keep the
              experience flowing.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            Hover or tap for intel. <span className="font-medium text-foreground">Waypoint auto syncs these in Journey Builder.</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {visualShowcase.map((item) => (
            <Card
              key={item.id}
              className="group relative overflow-hidden border-border/40 bg-card/60 transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={false}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-tr opacity-70",
                    categoryAccent[item.category] ?? "from-accent/30 via-accent/10 to-transparent",
                  )}
                />
                <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2 text-white">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em]">
                    <Badge variant="secondary" className="border border-white/30 bg-white/20 text-white">
                      {item.category}
                    </Badge>
                    <span className="font-medium text-white/80">{item.subtitle}</span>
                  </div>
                  <h3 className="text-lg font-semibold drop-shadow-lg">{item.title}</h3>
                  <p className="flex items-center gap-1 text-xs text-white/80">
                    <MapPin className="h-3 w-3" /> {item.location}
                  </p>
                </div>
              </div>

              <CardContent className="space-y-4 p-5">
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {item.tags.map((tag) => (
                    <Badge key={`${item.id}-${tag}`} variant="outline" className="border-border/40">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <HoverCard open={activeId === item.id} onOpenChange={(open) => setActiveId(open ? item.id : null)}>
                  <HoverCardTrigger asChild>
                    <p className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item.description}
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 border-border/40 bg-background/95 text-xs text-muted-foreground">
                    Waypoint tracks weather, availability, and crowd density to adapt this plan in real time.
                  </HoverCardContent>
                </HoverCard>

                <Button asChild variant="ghost" className="gap-2 px-0 text-foreground hover:text-foreground/80">
                  <a href={item.cta.href}>
                    {item.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
