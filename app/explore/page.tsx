"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { MapPin, Filter, List, Map, Star, ArrowRight, Check } from "lucide-react"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { explorePlaces, type ExplorePlace } from "@/lib/waypoint-data"
import { ExploreHeatmapDiagram } from "@/components/diagrams/explore-heatmap-diagram"
import { cn } from "@/lib/utils"

const categoryFilters = [
  { label: "Nightlife", value: "nightlife" },
  { label: "Restaurants", value: "restaurant" },
  { label: "Cafés", value: "cafe" },
  { label: "Beaches", value: "beach" },
  { label: "Outdoors", value: "outdoor" },
  { label: "Events", value: "event" },
  { label: "Travel", value: "travel" },
  { label: "Shops", value: "retail" },
  { label: "Study/Cowork", value: "cowork" },
]

const durationFilters = [
  { label: "Short (1–2h)", value: "short" },
  { label: "Half-day", value: "half-day" },
  { label: "Full-day", value: "full-day" },
]

const timeFilters = [
  { label: "Morning", value: "morning" },
  { label: "Afternoon", value: "afternoon" },
  { label: "Evening", value: "evening" },
  { label: "Late", value: "late" },
]

const budgetFilters = ["<$30", "$30-$60", "$60-$100", "$100+"] as const

type ViewMode = "list" | "map"

interface ExploreFilters {
  categories: string[]
  durations: string[]
  times: string[]
  budget?: string
  maxDistance: number
  openNow: boolean
  crewFriendly: boolean
  search: string
}

const defaultFilters: ExploreFilters = {
  categories: [],
  durations: [],
  times: [],
  budget: undefined,
  maxDistance: 10,
  openNow: false,
  crewFriendly: false,
  search: "",
}

export default function ExplorePage() {
  const [places, setPlaces] = useState<ExplorePlace[]>([])
  const [filters, setFilters] = useState<ExploreFilters>(defaultFilters)
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [journeyOpen, setJourneyOpen] = useState(false)
  const [journeyPlace, setJourneyPlace] = useState<ExplorePlace | null>(null)

  useEffect(() => {
    // In production we'd fetch(`/api/explore/places`).
    setPlaces(explorePlaces)
  }, [])

  const buildItineraryPreview = useCallback((place: ExplorePlace) => {
    const lookup: Record<ExplorePlace["category"], { time: string; title: string; meta: string }[]> = {
      nightlife: [
        { time: "19:00", title: place.name, meta: `${place.neighborhood} • Arrival + wristband sync` },
        { time: "21:30", title: "Crew lounge + backup venue on standby", meta: "Waypoint monitors capacity + rides" },
        { time: "00:15", title: "Afterhours shuttle", meta: "Drivers and invites auto-trigger" },
      ],
      restaurant: [
        { time: "18:30", title: place.name, meta: `${place.neighborhood} • Table secured + dietary notes applied` },
        { time: "20:15", title: "Digestif walk", meta: "Waypoint lines up rooftop or speakeasy" },
        { time: "21:00", title: "Ride home ready", meta: "No queue, AI adjusts to pace" },
      ],
      cafe: [
        { time: "09:00", title: place.name, meta: `${place.neighborhood} • Workspace setup + Wi-Fi keys` },
        { time: "11:00", title: "Mid-morning stretch", meta: "Waypoint slots nearby walk + pastry hold" },
        { time: "12:30", title: "Lunch pairing", meta: "AI books table around the corner" },
      ],
      beach: [
        { time: "05:50", title: place.name, meta: `${place.neighborhood} • Towels + tide intel waiting` },
        { time: "07:15", title: "Coffee + warm-up", meta: "Waypoint flags the best cart nearby" },
        { time: "08:00", title: "Secondary stop", meta: "Choose hike, brunch, or sauna recovery" },
      ],
      outdoor: [
        { time: "06:00", title: place.name, meta: `${place.neighborhood} • Gear check + pacer bands on` },
        { time: "08:30", title: "Scenic pause", meta: "Snacks + drone shots delivered" },
        { time: "10:15", title: "Transport buffer", meta: "Return shuttle + backup weather route" },
      ],
      event: [
        { time: place.slot?.split("•")[1]?.trim() ?? "18:00", title: place.name, meta: `${place.neighborhood} • Tickets + check-in sorted` },
        { time: "+45m", title: "Sponsor or lounge moment", meta: "Waypoint unlocks perks + photo ops" },
        { time: "+90m", title: "Post-event plan", meta: "AI suggests next stop or ride home" },
      ],
      travel: [
        { time: "Departure", title: place.name, meta: `Waypoint handles transport, stay, and backups` },
        { time: "Day 1", title: "Curated experiences", meta: "AI stitches hikes, dining, downtime" },
        { time: "Return", title: "Summary + media drop", meta: "Crew album, expenses, calendar sync" },
      ],
      retail: [
        { time: "13:00", title: place.name, meta: `${place.neighborhood} • Inventory intel + queue skipping` },
        { time: "15:00", title: "Drop-off", meta: "Try-ons + hold racks ready" },
        { time: "17:00", title: "Coda stop", meta: "Waypoint books ramen / cocktails to finish" },
      ],
      cowork: [
        { time: "10:00", title: place.name, meta: `${place.neighborhood} • Pods + Wi-Fi prepped` },
        { time: "12:30", title: "Team sync", meta: "AI schedules lunch or breakout" },
        { time: "15:00", title: "Wrap + export", meta: "Notes + calendar blocks shared" },
      ],
    }
    return lookup[place.category]
  }, [])

  const journeyPreview = useMemo(() => (journeyPlace ? buildItineraryPreview(journeyPlace) : []), [journeyPlace, buildItineraryPreview])

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      if (filters.categories.length && !filters.categories.includes(place.category)) return false
      if (filters.durations.length && !filters.durations.includes(place.duration)) return false
      if (filters.times.length && !filters.times.includes(place.timeOfDay)) return false
      if (filters.budget && place.budget !== filters.budget) return false
      if (filters.openNow && !place.openNow) return false
      if (filters.crewFriendly && !place.isCrewFriendly) return false
      if (place.distanceKm > filters.maxDistance) return false
      if (filters.search && !place.name.toLowerCase().includes(filters.search.toLowerCase())) return false
      return true
    })
  }, [places, filters])

  const resultsCopy = filteredPlaces.length === 0 ? "No matches yet" : `${filteredPlaces.length} match${filteredPlaces.length === 1 ? "" : "es"}`

  const renderFilters = (isMobile = false) => (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="font-semibold text-sm uppercase tracking-[0.25em] text-muted-foreground">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {categoryFilters.map((category) => (
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
        <h3 className="font-semibold text-sm uppercase tracking-[0.25em] text-muted-foreground">Budget</h3>
        <div className="flex flex-wrap gap-2">
          {budgetFilters.map((budget) => (
            <Button
              key={budget}
              variant={filters.budget === budget ? "default" : "outline"}
              className={cn(
                "border-border/40",
                filters.budget === budget
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-background/60 text-muted-foreground hover:text-foreground",
              )}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  budget: prev.budget === budget ? undefined : budget,
                }))
              }
            >
              {budget}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-sm uppercase tracking-[0.25em] text-muted-foreground">Time of day</h3>
        <div className="flex flex-wrap gap-2">
          {timeFilters.map((time) => (
            <Button
              key={time.value}
              variant={filters.times.includes(time.value) ? "default" : "outline"}
              className={cn(
                "border-border/40",
                filters.times.includes(time.value)
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-background/60 text-muted-foreground hover:text-foreground",
              )}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  times: prev.times.includes(time.value)
                    ? prev.times.filter((value) => value !== time.value)
                    : [...prev.times, time.value],
                }))
              }
            >
              {time.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-sm uppercase tracking-[0.25em] text-muted-foreground">Duration</h3>
        <div className="flex flex-wrap gap-2">
          {durationFilters.map((duration) => (
            <Button
              key={duration.value}
              variant={filters.durations.includes(duration.value) ? "default" : "outline"}
              className={cn(
                "border-border/40",
                filters.durations.includes(duration.value)
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-background/60 text-muted-foreground hover:text-foreground",
              )}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  durations: prev.durations.includes(duration.value)
                    ? prev.durations.filter((value) => value !== duration.value)
                    : [...prev.durations, duration.value],
                }))
              }
            >
              {duration.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">Within {filters.maxDistance} km</span>
            <span className="text-xs text-muted-foreground">Drag to adjust</span>
          </div>
          <Slider
            value={[filters.maxDistance]}
            onValueChange={([value]) => setFilters((prev) => ({ ...prev, maxDistance: value }))}
            min={1}
            max={25}
            step={1}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id={isMobile ? "mobile-open-now" : "open-now"}
              checked={filters.openNow}
              onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, openNow: checked }))}
            />
            <label htmlFor={isMobile ? "mobile-open-now" : "open-now"} className="text-sm text-muted-foreground">
              Open now
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id={isMobile ? "mobile-crew-friendly" : "crew-friendly"}
              checked={filters.crewFriendly}
              onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, crewFriendly: checked }))}
            />
            <label htmlFor={isMobile ? "mobile-crew-friendly" : "crew-friendly"} className="text-sm text-muted-foreground">
              Crew-friendly
            </label>
          </div>
        </div>
      </div>

      <Button variant="ghost" className="w-full justify-center" onClick={() => setFilters(defaultFilters)}>
        Reset filters
      </Button>
    </div>
  )

  const renderPlaceCard = (place: ExplorePlace) => (
    <Card key={place.id} className="flex flex-col border-border/40 bg-card/60">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-xl text-foreground">{place.name}</CardTitle>
          <Badge variant="outline" className="border-border/40 text-xs uppercase tracking-[0.25em]">
            {place.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{place.description}</p>
      </CardHeader>
      <CardContent className="mt-auto space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {place.neighborhood}
          </span>
          <span>{place.distanceKm.toFixed(1)} km</span>
          <span>{place.budget}</span>
          <span>{place.duration}</span>
          <span>{place.timeOfDay}</span>
          {place.slot && <span>{place.slot}</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          {place.tags.map((tag) => (
            <Badge key={`${place.id}-${tag}`} variant="outline" className="border-border/40 bg-background/40 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-4 w-4 text-accent" />
            {place.rating.toFixed(2)} • {place.reviews} reviews
          </span>
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={() => {
              setJourneyPlace(place)
              setJourneyOpen(true)
            }}
          >
            Add to journey
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="py-16">
          <div className="container">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-4">
                <Badge className="w-fit border border-border/50 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Explore everything
                </Badge>
                <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-5xl">Explore the city</h1>
                <p className="max-w-2xl text-muted-foreground">
                  Filter by category, budget, vibe, and availability. Add stops to a solo journey, send to your crew, or
                  join a live Discover slot.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                    <Check className="h-3 w-3" /> Live availability
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                    <Check className="h-3 w-3" /> Safety-verified venues
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                    <Check className="h-3 w-3" /> Add to Journey Builder
                  </span>
                </div>
              </div>
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
                <ToggleGroupItem value="list" className="gap-2"><List className="h-4 w-4" /> List</ToggleGroupItem>
                <ToggleGroupItem value="map" className="gap-2"><Map className="h-4 w-4" /> Map</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="border-border/40 bg-background/40">
                  {resultsCopy}
                </Badge>
                <span>Filters active: {Object.values(filters).filter((value) => {
                  if (Array.isArray(value)) return value.length > 0
                  if (typeof value === "boolean") return value
                  if (typeof value === "number") return value !== defaultFilters.maxDistance
                  return value && value !== ""
                }).length}</span>
              </div>
              <div className="ml-auto hidden gap-2 lg:flex">
                {renderFilters()}
              </div>
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-md overflow-y-auto bg-background">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">{renderFilters(true)}</div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="mt-6">
              <Input
                placeholder="Search for venues, vibes, or keywords"
                value={filters.search}
                onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
                className="max-w-xl border-border/40 bg-background/60"
              />
            </div>

            <div className="mt-8">
              <ExploreHeatmapDiagram />
            </div>

            {viewMode === "list" ? (
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredPlaces.length ? filteredPlaces.map(renderPlaceCard) : <EmptyState />}
              </div>
            ) : (
              <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
                <div className="flex h-[480px] items-center justify-center rounded-3xl border border-border/40 bg-[radial-gradient(circle_at_top,_rgba(232,204,126,0.12),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(138,229,255,0.12),_transparent_65%)]">
                  <p className="max-w-sm text-center text-sm text-muted-foreground">
                    Map view coming soon—pin drops will reveal live capacity, weather, and travel time. For now, browse
                    curated matches in list view.
                  </p>
                </div>
                <div className="space-y-4">
                  {filteredPlaces.length ? filteredPlaces.slice(0, 3).map(renderPlaceCard) : <EmptyState />}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function EmptyState() {
  return (
    <Card className="border-border/40 bg-card/60">
      <CardContent className="space-y-4 p-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-border/40 bg-background/50">
          <Filter className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-comfortaa text-xl font-semibold">No matches yet</h3>
        <p className="text-sm text-muted-foreground">
          Try widening your filters or explore a different category—Waypoint is syncing new experiences all day.
        </p>
      </CardContent>
    </Card>
  )
}
