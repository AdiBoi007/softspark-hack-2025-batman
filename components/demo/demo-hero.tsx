import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function DemoHero() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/10 via-purple-500/5 to-background" />
      <div className="container grid gap-12 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
        <div className="space-y-6">
          <Badge className="border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Assemble AI demo
          </Badge>
          <h1 className="font-comfortaa text-5xl font-bold tracking-tight sm:text-6xl">
            The all-day, all-city Waypoint experience
          </h1>
          <p className="text-lg text-muted-foreground">
            Walk through a demo account as Assemble AI plans a sunrise-to-sunrise adventure. Every tap shows how the
            engine syncs venues, crews, budgets, safety, and vibes in seconds.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
              • Assemble AI conversation
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
              • Bands-powered safety & check-ins
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
              • Explore, Solo, Discover, Friends in one flow
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
              <a href="#timeline">
                Start demo journey
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="#extensions">
                View AI extensions
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="relative rounded-3xl border border-border/40 bg-card/60 p-6">
          <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-border/40 bg-background/60 px-4 py-1 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Demo user • assemble.ai/waypoint
          </div>
          <div className="mt-10 space-y-3 text-sm text-muted-foreground">
            <p>
              "Waypoint, weave a day that starts in the ocean, squeezes in thrift, and ends at a sunrise set. Vegan-friendly,
              budget $80pp, four friends."
            </p>
            <p className="text-emerald-300">
              "On it. Checking tides, inventory, ride windows, and safety coverage. Timeline arriving in 4 seconds."
            </p>
            <p>
              "Lock an afters option if the warehouse caps out, and keep nudging the crew for check-ins."
            </p>
            <p className="text-emerald-300">
              "Afters queued (Observatory Lounge). Waypoint Bands will glow amber if we reroute."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
