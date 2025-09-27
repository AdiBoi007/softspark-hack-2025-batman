"use client"

import { useMemo, useState } from "react"
import { ArrowRight, Sparkles, Clock4, MapPin, Gauge, RefreshCcw, Save, Share2, Users, Shuffle } from "lucide-react"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import { smartJourneys, type CategorySlug } from "@/lib/waypoint-data"
import { cn } from "@/lib/utils"
import { SoloJourneyDiagram } from "@/components/diagrams/solo-journey-diagram"

const categories = [
  { label: "Nightlife", value: "nightlife" },
  { label: "Restaurants", value: "restaurant" },
  { label: "Cafés", value: "cafe" },
  { label: "Beaches", value: "beach" },
  { label: "Outdoors", value: "outdoor" },
  { label: "Events", value: "event" },
  { label: "Travel", value: "travel" },
  { label: "Retail", value: "retail" },
  { label: "Study/Cowork", value: "cowork" },
]

const timeWindows = ["Today", "Tonight", "This weekend"] as const

interface SoloIntake {
  categories: string[]
  timeWindow: (typeof timeWindows)[number] | ""
  startArea: string
  budget: "<$30" | "$30-$60" | "$60-$100" | "$100+" | ""
  pace: number
}

const initialIntake: SoloIntake = {
  categories: [],
  timeWindow: "",
  startArea: "",
  budget: "",
  pace: 50,
}

export default function SoloPage() {
  const [step, setStep] = useState(1)
  const [intake, setIntake] = useState<SoloIntake>(initialIntake)
  const [showWaitlist, setShowWaitlist] = useState(false)

  const journey = useMemo(() => {
    const matches = smartJourneys.filter((journey) => {
      if (!intake.categories.length) return true
      return intake.categories.every((category) => journey.categories.includes(category as CategorySlug))
    })
    return matches[0] ?? smartJourneys[0]
  }, [intake.categories])

  const canContinueStep1 = intake.categories.length > 0
  const canGenerate = intake.timeWindow && intake.startArea && intake.budget

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="py-16">
          <div className="container space-y-10">
            <header className="space-y-6">
              <Badge className="w-fit border border-border/50 bg-background/60 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Solo mode
              </Badge>
              <div className="space-y-4">
                <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-6xl">
                  Journey Builder — Your day, stitched by AI.
                </h1>
                <p className="max-w-3xl text-lg text-muted-foreground">
                  Choose a vibe, time window, and start point. Waypoint designs the perfect path with buffers, backups,
                  and live updates baked in.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <Sparkles className="h-3.5 w-3.5" /> Personalised to your vibe
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <Clock4 className="h-3.5 w-3.5" /> Time-aware scheduling
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <MapPin className="h-3.5 w-3.5" /> Travel buffers included
                </span>
              </div>
            </header>

            <Stepper currentStep={step} />

            <div className="grid gap-8 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
              <Card className="border-border/40 bg-card/60">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {step === 1 && "Pick your categories"}
                    {step === 2 && "Dial in the details"}
                    {step === 3 && "Your curated journey"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Select everything you want to include. Waypoint balances variety, travel time, and energy levels
                        when stitching the timeline.
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        {categories.map((category) => (
                          <label
                            key={category.value}
                            className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/60 px-4 py-3 text-sm"
                          >
                            <Checkbox
                              checked={intake.categories.includes(category.value)}
                              onCheckedChange={(checked) =>
                                setIntake((prev) => ({
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
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" onClick={() => setIntake(initialIntake)}>
                          Reset
                        </Button>
                        <Button
                          className="gap-2"
                          onClick={() => setStep(2)}
                          disabled={!canContinueStep1}
                        >
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-3">
                        {timeWindows.map((time) => (
                          <Button
                            key={time}
                            variant={intake.timeWindow === time ? "default" : "outline"}
                            className="h-auto flex-1 flex-col gap-1 border-border/40 py-4 text-sm"
                            onClick={() => setIntake((prev) => ({ ...prev, timeWindow: time }))}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="start-area">Start area</Label>
                          <Input
                            id="start-area"
                            placeholder="e.g. East Borough, Downtown"
                            value={intake.startArea}
                            onChange={(event) => setIntake((prev) => ({ ...prev, startArea: event.target.value }))}
                            className="border-border/40 bg-background/60"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Budget</Label>
                          <Select
                            value={intake.budget}
                            onValueChange={(value: SoloIntake["budget"]) => setIntake((prev) => ({ ...prev, budget: value }))}
                          >
                            <SelectTrigger className="border-border/40 bg-background/60">
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="<$30">Under $30</SelectItem>
                              <SelectItem value="$30-$60">$30-$60</SelectItem>
                              <SelectItem value="$60-$100">$60-$100</SelectItem>
                              <SelectItem value="$100+">$100+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-sm">
                          <Gauge className="h-4 w-4" /> Pace — {intake.pace <= 33 ? "Chill" : intake.pace >= 66 ? "Packed" : "Balanced"}
                        </Label>
                        <Slider
                          value={[intake.pace]}
                          onValueChange={([value]) => setIntake((prev) => ({ ...prev, pace: value }))}
                          min={10}
                          max={100}
                        />
                        <p className="text-xs text-muted-foreground">
                          Waypoint adjusts travel time, dwell time, and activity intensity to match your pace.
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="ghost" onClick={() => setStep(1)}>
                          Back
                        </Button>
                        <Button className="gap-2" onClick={() => setStep(3)} disabled={!canGenerate}>
                          Generate journey
                          <Sparkles className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-border/40 bg-background/60">
                          {intake.timeWindow || "Anytime"}
                        </Badge>
                        <Badge variant="outline" className="border-border/40 bg-background/60">
                          From {intake.startArea || "your base"}
                        </Badge>
                        <Badge variant="outline" className="border-border/40 bg-background/60">
                          Pace: {intake.pace}/100
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        {journey.stops.map((stop) => (
                          <div key={stop.title} className="rounded-2xl border border-border/40 bg-background/60 p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground/80">
                                  {stop.time}
                                </p>
                                <h3 className="mt-2 text-lg font-semibold text-foreground">{stop.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{stop.description}</p>
                                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                  <Badge variant="secondary" className="border-border/30">
                                    {stop.category}
                                  </Badge>
                                  {stop.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="border-border/40">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="gap-2">
                                    <Shuffle className="h-4 w-4" /> Swap stop
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md border-border/40 bg-background/95">
                                  <DialogHeader>
                                    <DialogTitle>Swap stop</DialogTitle>
                                  </DialogHeader>
                                  <p className="text-sm text-muted-foreground">
                                    Soon you’ll be able to regenerate alternate options based on vibe, travel time, and
                                    availability. For now, note preferences in the waitlist and we’ll tailor your launch
                                    invite.
                                  </p>
                                  <Button className="mt-6" onClick={() => setShowWaitlist(true)}>
                                    Request swap access
                                  </Button>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" className="gap-2">
                          <RefreshCcw className="h-4 w-4" /> Shorten
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Save className="h-4 w-4" /> Save draft
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Share2 className="h-4 w-4" /> Share
                        </Button>
                        <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90" asChild>
                          <a href="/friends">
                            <Users className="h-4 w-4" /> Convert to Friends plan
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/40">
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl">What Waypoint optimises</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Each journey balances pace, travel buffers, crowd density, and backups so you can stay in flow.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <SoloJourneyDiagram />
                  <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                    <p className="font-medium text-foreground">Path coherence</p>
                    <p>We minimise backtracking and string together stops that vibe together.</p>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                    <p className="font-medium text-foreground">Availability sync</p>
                    <p>Live reservation feeds and weather intel keep your timeline realistic.</p>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                    <p className="font-medium text-foreground">Backup stack</p>
                    <p>Every stop has a quick-swap alternative ready inside the app.</p>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                    <p className="font-medium text-foreground">Safety layer</p>
                    <p>Live check-ins, public venues, and SOS prompts stay active even on solo runs.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WaitlistDialog
        open={showWaitlist}
        onOpenChange={setShowWaitlist}
        initialMode="Solo"
        initialCategories={intake.categories.map(
          (category) => categories.find((item) => item.value === category)?.label ?? category,
        )}
      />
    </div>
  )
}

function Stepper({ currentStep }: { currentStep: number }) {
  const steps = [
    { title: "Categories", description: "Pick what you want to include" },
    { title: "Details", description: "Set time, budget, and pace" },
    { title: "Journey", description: "Review and customise" },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const active = stepNumber === currentStep
        const completed = stepNumber < currentStep
        return (
          <div
            key={step.title}
            className={cn(
              "rounded-2xl border px-4 py-6 transition-colors",
              active
                ? "border-foreground bg-foreground text-background"
                : completed
                ? "border-border/60 bg-background/60"
                : "border-border/40 bg-background/40 text-muted-foreground",
            )}
          >
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full border border-border/40 text-sm font-semibold">
                {stepNumber}
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em]">{step.title}</p>
                <p className="text-xs opacity-80">{step.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
