"use client"

import { useMemo, useState } from "react"
import {
  ArrowRight,
  Filter,
  MapPin,
  Sparkles,
  Users,
  CalendarClock,
  ShieldCheck,
  Ticket,
} from "lucide-react"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { discoverCrews } from "@/lib/waypoint-data"
import { DiscoverNetworkDiagram } from "@/components/diagrams/discover-network-diagram"
import { WaitlistDialog } from "@/components/waitlist-dialog"

const crewCategories = [
  { label: "Nightlife", value: "nightlife" },
  { label: "Beaches", value: "beach" },
  { label: "Outdoors", value: "outdoor" },
  { label: "Cafés", value: "cafe" },
  { label: "Events", value: "event" },
  { label: "Retail", value: "retail" },
  { label: "Travel", value: "travel" },
  { label: "Study/Cowork", value: "cowork" },
]

const safetyNotes: Record<string, string> = {
  outdoor: "Outdoor crews follow sunrise meetup rules and weather briefings.",
  beach: "Beach crews meet at public access points; lifeguards on duty for sunrise dips.",
  event: "Event crews include ticket sync and arrival windows.",
  nightlife: "Nightlife crews use verified venues with queue-less entry and live check-ins.",
  travel: "Travel crews coordinate transport and shared itineraries.",
  cafe: "Café crews rotate seats; introverts welcome.",
  retail: "Retail crews include lockers and bag drops.",
  cowork: "Study crews default to public libraries or verified cowork hubs.",
}

interface DiscoverFilters {
  categories: string[]
  minCompatibility: number
  maxSize: number
  openingsOnly: boolean
  upcomingOnly: boolean
}

const defaultFilters: DiscoverFilters = {
  categories: [],
  minCompatibility: 80,
  maxSize: 12,
  openingsOnly: false,
  upcomingOnly: false,
}

export default function DiscoverPage() {
  const [filters, setFilters] = useState<DiscoverFilters>(defaultFilters)
  const [selectedCrew, setSelectedCrew] = useState<typeof discoverCrews[number] | null>(null)
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [pendingCrewId, setPendingCrewId] = useState<string | undefined>()
  const [pendingCategories, setPendingCategories] = useState<string[] | undefined>()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredCrews = useMemo(() => {
    return discoverCrews.filter((crew) => {
      if (filters.categories.length && !filters.categories.includes(crew.category)) return false
      if (crew.compatibility < filters.minCompatibility) return false
      if (crew.capacity.total > filters.maxSize) return false
      if (filters.openingsOnly && crew.capacity.filled >= crew.capacity.total) return false
      return true
    })
  }, [filters])

  const renderFilters = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {crewCategories.map((category) => (
            <label key={category.value} className="flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-4 py-2 text-sm">
              <Checkbox
                checked={filters.categories.includes(category.value)}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({
                    ...prev,
                    categories: checked
                      ? [...prev.categories, category.value]
                      : prev.categories.filter((value) => value !== category.value),
                  }))
                }
              />
              {category.label}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">Compatibility</h3>
        <Slider
          value={[filters.minCompatibility]}
          onValueChange={([value]) => setFilters((prev) => ({ ...prev, minCompatibility: value }))}
          min={50}
          max={100}
          step={5}
        />
        <p className="text-xs text-muted-foreground">{filters.minCompatibility}% match or higher</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">Max crew size</h3>
        <ToggleGroup
          type="single"
          value={String(filters.maxSize)}
          onValueChange={(value) => value && setFilters((prev) => ({ ...prev, maxSize: Number(value) }))}
          className="flex flex-wrap gap-2"
        >
          {[8, 10, 12, 16].map((size) => (
            <ToggleGroupItem key={size} value={String(size)} className="rounded-full border border-border/40">
              {size}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-3">
        <label className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/60 px-4 py-3 text-sm">
          <span>Only show crews with spots</span>
          <Checkbox
            checked={filters.openingsOnly}
            onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, openingsOnly: checked as boolean }))}
          />
        </label>
      </div>
      <Button variant="ghost" className="w-full" onClick={() => setFilters(defaultFilters)}>
        Reset filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="py-16">
          <div className="container space-y-12">
            <header className="space-y-6">
              <Badge className="w-fit border border-border/50 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Discover mode
              </Badge>
              <div className="space-y-4">
                <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-6xl">Meet your crew — for anything.</h1>
                <p className="max-w-3xl text-lg text-muted-foreground">
                  AI matches you with 4–8 people for beaches, hikes, cafés, thrift crawls, gigs, and nights out. Verified
                  vibes, safety layers always on.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <Sparkles className="h-3 w-3" /> Compatibility scoring
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <ShieldCheck className="h-3 w-3" /> Safety briefings
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <Ticket className="h-3 w-3" /> Ticket sync (events)
                </span>
              </div>
            </header>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="border-border/40 bg-background/40">
                {filteredCrews.length} crews live
              </Badge>
              <div className="ml-auto hidden w-full max-w-md lg:block">{renderFilters()}</div>
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">{renderFilters()}</div>
                </SheetContent>
              </Sheet>
            </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCrews.map((crew) => (
            <Card key={crew.id} className="border-border/40 bg-card/60">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl text-foreground">{crew.name}</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">{crew.description}</p>
                      </div>
                      <Badge variant="secondary" className="border-border/40 bg-background/60 text-xs uppercase tracking-[0.25em]">
                        {crew.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarClock className="h-3.5 w-3.5" /> {crew.start}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {crew.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {crew.capacity.filled}/{crew.capacity.total} spots
                      </span>
                      <span>Compatibility {crew.compatibility}%</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {crew.tags.map((tag) => (
                        <Badge key={`${crew.id}-${tag}`} variant="outline" className="border-border/40 bg-background/60">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full gap-2 bg-foreground text-background hover:bg-foreground/90" onClick={() => setSelectedCrew(crew)}>
                      Join crew
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
          ))}
        </div>
        <div className="mt-12">
          <DiscoverNetworkDiagram />
        </div>
      </div>
    </section>
  </main>
      <Footer />

      <Dialog open={Boolean(selectedCrew)} onOpenChange={(open) => !open && setSelectedCrew(null)}>
        <DialogContent className="max-w-md border-border/40 bg-background/95">
          {selectedCrew && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCrew.name}</DialogTitle>
                <DialogDescription>
                  {selectedCrew.start} • {selectedCrew.location}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>{selectedCrew.description}</p>
                <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" /> Safety note
                  </p>
                  <p className="mt-2 text-sm text-foreground">
                    {safetyNotes[selectedCrew.category] ?? "Waypoint keeps every crew in verified public spaces with live check-ins."}
                  </p>
                </div>
              </div>
              <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button variant="ghost" onClick={() => setSelectedCrew(null)}>
                  Cancel
                </Button>
                <Button
                  className="gap-2 bg-foreground text-background hover:bg-foreground/90"
                  onClick={() => {
                    setPendingCrewId(selectedCrew.id)
                    setPendingCategories([selectedCrew.category])
                    setShowWaitlist(true)
                    setSelectedCrew(null)
                  }}
                >
                  Request invite
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <WaitlistDialog
        open={showWaitlist}
        onOpenChange={(open) => {
          setShowWaitlist(open)
          if (!open) {
            setPendingCrewId(undefined)
            setPendingCategories(undefined)
          }
        }}
        initialMode="Discover"
        initialCategories={pendingCategories}
        initialCrewId={pendingCrewId}
      />
    </div>
  )
}
