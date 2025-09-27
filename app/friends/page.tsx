"use client"

import { useState } from "react"
import { ArrowRight, CalendarDays, Link2, Sparkles, Users, Vote, MapPin } from "lucide-react"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Switch } from "@/components/ui/switch"
import { friendsTemplates } from "@/lib/waypoint-data"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import { cn } from "@/lib/utils"
import { FriendsPollDiagram } from "@/components/diagrams/friends-poll-diagram"

interface FriendsPlan {
  groupName: string
  crewSize: number
  vibe: string
  templateId?: string
  categories: string[]
  date: string
  startTime: string
  meetupLocation: string
  notes: string
  polls: {
    category: boolean
    template: boolean
    timing: boolean
  }
}

const initialPlan: FriendsPlan = {
  groupName: "",
  crewSize: 6,
  vibe: "",
  templateId: undefined,
  categories: [],
  date: "",
  startTime: "",
  meetupLocation: "",
  notes: "",
  polls: {
    category: true,
    template: true,
    timing: false,
  },
}

const categories = [
  { label: "Nightlife", value: "nightlife" },
  { label: "Restaurants", value: "restaurant" },
  { label: "Cafés", value: "cafe" },
  { label: "Beaches", value: "beach" },
  { label: "Outdoors", value: "outdoor" },
  { label: "Events", value: "event" },
  { label: "Retail", value: "retail" },
  { label: "Travel", value: "travel" },
  { label: "Study/Cowork", value: "cowork" },
]

export default function FriendsPage() {
  const [step, setStep] = useState(1)
  const [plan, setPlan] = useState<FriendsPlan>(initialPlan)
  const [invitationLink] = useState("waypoint.city/invite/crew-42")
  const [showWaitlist, setShowWaitlist] = useState(false)

  const selectedTemplate = friendsTemplates.find((template) => template.id === plan.templateId)

  const categoriesSelected = plan.categories.length > 0
  const basicComplete = plan.groupName.trim().length > 1 && plan.vibe.trim().length > 2
  const timingComplete = plan.date && plan.startTime && plan.meetupLocation

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="py-16">
          <div className="container space-y-10">
            <header className="space-y-6">
              <Badge className="w-fit border border-border/50 bg-background/60 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Friends mode
              </Badge>
              <div className="space-y-4">
                <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-6xl">Plan with your friends.</h1>
                <p className="max-w-3xl text-lg text-muted-foreground">
                  Coordinate the squad across categories. Waypoint syncs calendars, polls preferences, books venues, and
                  keeps everyone updated live.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <Users className="h-3.5 w-3.5" /> Private invite links
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <Vote className="h-3.5 w-3.5" /> Smart polls
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <CalendarDays className="h-3.5 w-3.5" /> Calendar sync
                </span>
              </div>
            </header>

            <FriendsSteps currentStep={step} />

            <div className="grid gap-8 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
              <Card className="border-border/40 bg-card/60">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {step === 1 && "Basics"}
                    {step === 2 && "Categories & templates"}
                    {step === 3 && "Timing"}
                    {step === 4 && "Invite"}
                  </CardTitle>
                  <CardDescription>
                    {step === 1 && "Name the crew and share the vibe."}
                    {step === 2 && "Pick what you want Waypoint to stitch together."}
                    {step === 3 && "Lock the when and where—Waypoint handles conflicts."}
                    {step === 4 && "Send the invite, launch polls, and track RSVPs."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="group-name">Crew name</Label>
                          <Input
                            id="group-name"
                            value={plan.groupName}
                            onChange={(event) => setPlan((prev) => ({ ...prev, groupName: event.target.value }))}
                            placeholder="e.g. Weekend crew"
                            className="border-border/40 bg-background/60"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="crew-size">Crew size</Label>
                          <Input
                            id="crew-size"
                            type="number"
                            min={2}
                            max={20}
                            value={plan.crewSize}
                            onChange={(event) =>
                              setPlan((prev) => ({ ...prev, crewSize: Number(event.target.value || 2) }))
                            }
                            className="border-border/40 bg-background/60"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vibe">What’s the vibe?</Label>
                        <Textarea
                          id="vibe"
                          value={plan.vibe}
                          onChange={(event) => setPlan((prev) => ({ ...prev, vibe: event.target.value }))}
                          placeholder="e.g. Sunrise dip, coffee crawl, thrift run"
                          className="min-h-[120px] border-border/40 bg-background/60"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button className="gap-2" onClick={() => setStep(2)} disabled={!basicComplete}>
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">Categories</Label>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {categories.map((category) => (
                            <label
                              key={category.value}
                              className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/60 px-4 py-3 text-sm"
                            >
                              <Switch
                                checked={plan.categories.includes(category.value)}
                                onCheckedChange={(checked) =>
                                  setPlan((prev) => ({
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

                      <div className="space-y-4">
                        <Label className="text-sm font-semibold">Templates</Label>
                        <div className="grid gap-4 md:grid-cols-2">
                          {friendsTemplates.map((template) => {
                            const active = plan.templateId === template.id
                            return (
                              <Card
                                key={template.id}
                                className={cn(
                                  "cursor-pointer border-border/40 bg-background/60 transition-shadow",
                                  active && "border-foreground shadow-lg",
                                )}
                                onClick={() => setPlan((prev) => ({ ...prev, templateId: template.id }))}
                              >
                                <CardHeader className="space-y-2">
                                  <CardTitle className="text-lg">{template.label}</CardTitle>
                                  <CardDescription>{template.summary}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2 text-xs">
                                  {template.categories.map((category) => (
                                    <Badge key={`${template.id}-${category}`} variant="secondary" className="border-border/30">
                                      {category}
                                    </Badge>
                                  ))}
                                  <Badge variant="outline" className="border-border/30 uppercase tracking-[0.25em]">
                                    {template.duration}
                                  </Badge>
                                </CardContent>
                              </Card>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="ghost" onClick={() => setStep(1)}>
                          Back
                        </Button>
                        <Button className="gap-2" onClick={() => setStep(3)} disabled={!categoriesSelected}>
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={plan.date}
                            onChange={(event) => setPlan((prev) => ({ ...prev, date: event.target.value }))}
                            className="border-border/40 bg-background/60"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="start-time">Start time</Label>
                          <Input
                            id="start-time"
                            type="time"
                            value={plan.startTime}
                            onChange={(event) => setPlan((prev) => ({ ...prev, startTime: event.target.value }))}
                            className="border-border/40 bg-background/60"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meetup">Meetup location</Label>
                        <Input
                          id="meetup"
                          value={plan.meetupLocation}
                          onChange={(event) => setPlan((prev) => ({ ...prev, meetupLocation: event.target.value }))}
                          placeholder="e.g. North Park entrance"
                          className="border-border/40 bg-background/60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes for the crew</Label>
                        <Textarea
                          id="notes"
                          value={plan.notes}
                          onChange={(event) => setPlan((prev) => ({ ...prev, notes: event.target.value }))}
                          placeholder="Allergies, must-see spots, travel constraints..."
                          className="min-h-[120px] border-border/40 bg-background/60"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" onClick={() => setStep(2)}>
                          Back
                        </Button>
                        <Button className="gap-2" onClick={() => setStep(4)} disabled={!timingComplete}>
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Invite link</p>
                        <div className="mt-2 flex items-center gap-3">
                          <code className="flex-1 truncate rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-sm">
                            {invitationLink}
                          </code>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Link2 className="h-4 w-4" /> Copy
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">Polls</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <PollToggle
                            title="Pick category"
                            description="Crew votes on which categories to keep if clash."
                            checked={plan.polls.category}
                            onChange={(checked) =>
                              setPlan((prev) => ({
                                ...prev,
                                polls: { ...prev.polls, category: checked },
                              }))
                            }
                          />
                          <PollToggle
                            title="Pick template"
                            description="Let the crew choose between templates you shortlisted."
                            checked={plan.polls.template}
                            onChange={(checked) =>
                              setPlan((prev) => ({
                                ...prev,
                                polls: { ...prev.polls, template: checked },
                              }))
                            }
                          />
                          <PollToggle
                            title="Pick timing"
                            description="Send optional time slots if not everyone can make the main slot."
                            checked={plan.polls.timing}
                            onChange={(checked) =>
                              setPlan((prev) => ({
                                ...prev,
                                polls: { ...prev.polls, timing: checked },
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Waypoint will auto-prompt confirmations, handle shared payments, and nudge the crew with live
                          updates once the plan locks.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" className="gap-2" onClick={() => setShowWaitlist(true)}>
                          <Sparkles className="h-4 w-4" /> Enable concierge planning
                        </Button>
                        <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90">
                          Launch plan
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/40">
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl">Live planner preview</CardTitle>
                  <CardDescription>See how it comes together.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FriendsPollDiagram />
                  <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Crew</p>
                    <p className="text-sm text-foreground">{plan.groupName || "Your crew name"}</p>
                    <p className="text-xs text-muted-foreground">{plan.crewSize} people • {plan.categories.join(", ") || "add categories"}</p>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-background/60 p-4 space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Template</p>
                    <p className="text-sm text-foreground">{selectedTemplate?.label ?? "Choose a template"}</p>
                    {selectedTemplate ? (
                      <p className="text-xs text-muted-foreground">{selectedTemplate.summary}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Templates help kickstart your journey.</p>
                    )}
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-background/60 p-4 space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Timing</p>
                    <p className="text-sm text-foreground">
                      {plan.date || "Pick a date"} • {plan.startTime || "Pick a start time"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {plan.meetupLocation ? `Meet at ${plan.meetupLocation}` : "Set a meetup location"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-background/60 p-4 space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Polls</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {plan.polls.category && <Badge variant="outline" className="border-border/40">Category poll</Badge>}
                      {plan.polls.template && <Badge variant="outline" className="border-border/40">Template poll</Badge>}
                      {plan.polls.timing && <Badge variant="outline" className="border-border/40">Timing poll</Badge>}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-background/60 p-4 space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Notes</p>
                    <p className="text-xs text-muted-foreground">
                      {plan.notes || "Share dietary notes, must-do stops, or logistics here."}
                    </p>
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
        initialMode="Friends"
        initialCategories={plan.categories.map(
          (category) => categories.find((item) => item.value === category)?.label ?? category,
        )}
      />
    </div>
  )
}

function FriendsSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    { title: "Basics", description: "Crew + vibe" },
    { title: "Categories", description: "Templates & experiences" },
    { title: "Timing", description: "Date, time, meetup" },
    { title: "Invite", description: "Polls + share" },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const active = stepNumber === currentStep
        const completed = stepNumber < currentStep
        return (
          <div
            key={step.title}
            className={cn(
              "rounded-2xl border px-4 py-5 transition-colors",
              active
                ? "border-foreground bg-foreground text-background"
                : completed
                ? "border-border/60 bg-background/60"
                : "border-border/40 bg-background/40 text-muted-foreground",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em]">Step {stepNumber}</p>
            <p className="text-sm font-semibold">{step.title}</p>
            <p className="text-xs opacity-80">{step.description}</p>
          </div>
        )
      })}
    </div>
  )
}

function PollToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <Card className={cn("border-border/40 bg-background/60", checked && "border-foreground")}>
      <CardContent className="flex items-start gap-4 p-4">
        <Switch checked={checked} onCheckedChange={onChange} />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
