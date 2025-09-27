"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useMemo, useState } from "react"

import { WaitlistDialog } from "@/components/waitlist-dialog"

const modes = ["Solo", "Discover", "Friends"] as const
const categories = [
  "Nightlife",
  "Restaurants",
  "Cafés",
  "Beaches",
  "Outdoors",
  "Events",
  "Travel",
  "Shops",
  "Study/Cowork",
]

const modeDescriptions: Record<(typeof modes)[number], { headline: string; description: string; cta: string }> = {
  Solo: {
    headline: "Go solo with an AI concierge",
    description:
      "Pick a vibe and time window—Waypoint stitches sunrise swims, coffee rituals, gallery drops, and late-night gems into one fluid journey.",
    cta: "Craft my journey",
  },
  Discover: {
    headline: "Meet your crew instantly",
    description:
      "We match 4–8 people chasing the same energy, from sunrise hikes to thrift crawls and jazz nights. Every crew verified, every plan handled.",
    cta: "Match me with a crew",
  },
  Friends: {
    headline: "Coordinate the whole squad",
    description:
      "Waypoint aligns calendars, preferences, and budgets across categories—then books and keeps everyone in sync in real time.",
    cta: "Plan with my friends",
  },
}

const categoryBlurbs: Record<string, string> = {
  Nightlife: "Venues, sets, and after-hours mapped to your vibe.",
  Restaurants: "Tables, tasting menus, and hidden kitchens.",
  "Cafés": "Third-wave espresso, daylight studios, cozy study nooks.",
  Beaches: "Sunrise dips, bonfire nights, and surf forecasts baked in.",
  Outdoors: "Trail intel, park hangs, and gear-friendly meetups.",
  Events: "Pop-ups, gigs, markets, and launches with ticket sync.",
  Travel: "Weekenders, staycations, and day trips with transit handled.",
  Shops: "Vintage crawls, design districts, indie makers, and more.",
  "Study/Cowork": "Campus spots, all-night cafés, and cowork collisions.",
}

export function Hero() {
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [selectedMode, setSelectedMode] = useState<(typeof modes)[number]>("Solo")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Nightlife", "Restaurants", "Cafés"])

  const modeDetail = modeDescriptions[selectedMode]

  const heroSubheading =
    "Plan solo, meet a new crew, or go with friends — for nights out, beaches, hikes, cafés, events, and beyond. AI plans it; you just show up."

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const selectedBlurb = useMemo(() => {
    if (!selectedCategories.length) return "Pick a category to preview how we run it."
    const [first] = selectedCategories
    return categoryBlurbs[first] ?? "Waypoint keeps your city dialed in."
  }, [selectedCategories])

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute left-1/2 top-20 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[160px]" />
      <div className="absolute right-[10%] top-10 -z-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="absolute left-[5%] bottom-10 -z-10 h-56 w-56 rounded-full bg-accent/10 blur-[150px]" />

      <div className="container relative">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-muted-foreground/80 backdrop-blur">
              Connection Engine
              <Sparkles className="h-3 w-3" />
            </div>
            <h1 className="font-comfortaa text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">Do more, together.</h1>
            <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">{heroSubheading}</p>
          </div>

          <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-3xl border border-border/40 bg-card/50 p-8 text-left shadow-xl backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Modes</p>
                <div className="flex flex-wrap gap-2">
                  {modes.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSelectedMode(mode)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${
                        selectedMode === mode
                          ? "border-foreground bg-foreground text-background"
                          : "border-border/60 bg-transparent text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{modeDetail.headline}</p>
                <p>{modeDetail.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Categories</p>
                <p className="text-xs text-muted-foreground">Multi-select what you’re craving</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = selectedCategories.includes(category)
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${
                        active
                          ? "border-accent/60 bg-accent/20 text-foreground"
                          : "border-border/60 bg-transparent text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-[1.2fr_auto]">
              <div className="rounded-2xl border border-border/40 bg-background/60 p-6 text-sm text-muted-foreground backdrop-blur">
                {selectedBlurb}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                  onClick={() => setShowWaitlist(true)}
                >
                  {modeDetail.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="w-full" asChild>
                  <a href="/explore">Explore the city</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaitlistDialog
        open={showWaitlist}
        onOpenChange={setShowWaitlist}
        initialMode={selectedMode}
        initialCategories={selectedCategories}
      />
    </section>
  )
}
