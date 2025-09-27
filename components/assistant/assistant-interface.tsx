"use client"

import { useEffect, useMemo, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowUp, Check, Filter, Plug, Sparkles, Stars } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  ChatMessage,
  EventCard,
  ItineraryStep,
  suggestionPrompts,
  seededMessages,
  suggestionResponses,
  savedContexts,
  SmartTimeSuggestion,
} from "@/lib/assistant-data"

type Mode = "solo" | "discover" | "friends"

type FilterState = {
  mode: Mode
  categories: string[]
  budget?: "<30" | "30-60" | "60-100" | "100+"
  timeOfDay?: "morning" | "afternoon" | "evening" | "late"
  distance: number
  partySize: number
  campusOnly: boolean
}

const categoryFilters = [
  { value: "nightlife", label: "Nightlife" },
  { value: "restaurant", label: "Restaurants" },
  { value: "cafe", label: "Cafés" },
  { value: "beach", label: "Beaches" },
  { value: "outdoor", label: "Outdoors" },
  { value: "event", label: "Events" },
  { value: "travel", label: "Travel" },
  { value: "retail", label: "Retail" },
  { value: "cowork", label: "Study/Cowork" },
  { value: "uni", label: "Uni" },
]

const budgetFilters = ["<30", "30-60", "60-100", "100+"] as const
const timeFilters = ["morning", "afternoon", "evening", "late"] as const
const composerPrompts = [
  "Run sunrise swim → gallery → warehouse",
  "Match a Discover crew for rooftop drinks",
  "Uni study pod tomorrow 4–6pm",
]

export function AssistantInterface() {
  const router = useRouter()
  const [filters, setFilters] = useState<FilterState>({
    mode: "solo",
    categories: ["outdoor", "restaurant"],
    distance: 5,
    partySize: 3,
    campusOnly: false,
  })

  const [messages, setMessages] = useState<ChatMessage[]>(seededMessages)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerTitle, setDrawerTitle] = useState("Plan preview")
  const [drawerContent, setDrawerContent] = useState<JSX.Element | null>(null)
  const streamingTimers = useRef<number[]>([])

  const latestMessageId = useMemo(() => messages[messages.length - 1]?.id, [messages])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const composer = document.getElementById("assistant-composer") as HTMLTextAreaElement | null
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        composer?.focus()
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault()
        if (composer && input.trim()) {
          handleSend(input.trim())
        }
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [input])

  useEffect(() => {
    return () => {
      streamingTimers.current.forEach((timer) => window.clearTimeout(timer))
      streamingTimers.current = []
    }
  }, [])

  const pushMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }, [])

  const streamAssistantReply = useCallback(
    (incoming: ChatMessage) => {
      const id = incoming.id ?? crypto.randomUUID()
      const text = incoming.content ?? ""
      const base: ChatMessage = { ...incoming, id, content: "" }

      setMessages((prev) => [...prev, base])

      if (!text.length) {
        setMessages((prev) => prev.map((message) => (message.id === id ? { ...incoming, id } : message)))
        setTyping(false)
        return
      }

      const characters = Array.from(text)
      characters.forEach((_char, index) => {
        const timer = window.setTimeout(() => {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === id ? { ...incoming, id, content: text.slice(0, index + 1) } : message,
            ),
          )
          if (index === characters.length - 1) {
            setTyping(false)
          }
        }, 14 * (index + 1))
        streamingTimers.current.push(timer)
      })
    },
    [setMessages],
  )

  const pushAssistantMessage = useCallback(
    async (prompt: string) => {
      setTyping(true)
      try {
        const res = await fetch("/api/assistant/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: prompt, filters }),
        })
        const data = await res.json()
        if (data?.reply) {
          streamAssistantReply({ ...data.reply, id: data.reply.id ?? crypto.randomUUID() })
        } else {
          setTyping(false)
        }
      } catch (error) {
        console.error(error)
        setTyping(false)
      }
    },
    [filters, streamAssistantReply],
  )

  const handleSend = (value?: string) => {
    const content = (value ?? input).trim()
    if (!content) return
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    pushMessage(userMessage)
    setInput("")

    const canned = suggestionResponses[content]
    if (canned) {
      setTyping(true)
      setTimeout(() => {
        streamAssistantReply({
          ...canned.assistant,
          id: crypto.randomUUID(),
          createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        })
      }, 400)
      return
    }

    void pushAssistantMessage(content)
  }

  const handleSuggestion = (prompt: string) => {
    handleSend(prompt)
  }

  const handleAction = (title: string, content: JSX.Element) => {
    setDrawerTitle(title)
    setDrawerContent(content)
    setDrawerOpen(true)
  }

  return (
    <div className="relative">
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/90 backdrop-blur">
        <div className="container mx-auto flex max-w-screen-2xl items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-full border-border/40 bg-background/70"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <span className="font-comfortaa text-lg font-semibold">Waypoint</span>
              <span className="ml-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">AI Concierge</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/40 bg-background/80 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Online
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-md overflow-y-auto bg-background">
              <SheetHeader>
                <SheetTitle>Context & Filters</SheetTitle>
              </SheetHeader>
              <ContextRail filters={filters} setFilters={setFilters} compact onContextSelect={handleSuggestion} />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto grid max-w-screen-2xl gap-6 px-4 py-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <ContextRail filters={filters} setFilters={setFilters} onContextSelect={handleSuggestion} />
        </aside>

        <div className="flex flex-col gap-6">
          <ChatPane
            messages={messages}
            typing={typing}
            onSuggestion={handleSuggestion}
            onAction={handleAction}
            latestMessageId={latestMessageId}
          />
          <Composer value={input} onChange={setInput} onSend={handleSend} prompts={composerPrompts} onPrompt={handleSuggestion} />
        </div>
      </main>

      <PlanDrawer open={drawerOpen} title={drawerTitle} onOpenChange={setDrawerOpen}>
        {drawerContent}
      </PlanDrawer>
    </div>
  )
}

function ContextRail({
  filters,
  setFilters,
  compact,
  onContextSelect,
}: {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  compact?: boolean
  onContextSelect: (prompt: string) => void
}) {
  const handleCategoryToggle = (value: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(value)
        ? filters.categories.filter((c) => c !== value)
        : [...filters.categories, value],
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", compact ? "pt-6" : "pt-0")}> 
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Mode</h2>
        <ToggleGroup type="single" value={filters.mode} onValueChange={(value) => value && setFilters({ ...filters, mode: value as Mode })} className="grid grid-cols-3 gap-2">
          <ToggleGroupItem value="solo" className="rounded-full border border-border/40 bg-background/60 text-xs uppercase tracking-[0.25em]">
            Solo
          </ToggleGroupItem>
          <ToggleGroupItem value="discover" className="rounded-full border border-border/40 bg-background/60 text-xs uppercase tracking-[0.25em]">
            Discover
          </ToggleGroupItem>
          <ToggleGroupItem value="friends" className="rounded-full border border-border/40 bg-background/60 text-xs uppercase tracking-[0.25em]">
            Friends
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-xs text-muted-foreground">
          Solo: you only · Discover: meet new crew · Friends: plan with your people.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryToggle(category.value)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs uppercase tracking-[0.25em] transition",
                filters.categories.includes(category.value)
                  ? "border-accent/60 bg-accent/20 text-foreground"
                  : "border-border/40 bg-background/60 text-muted-foreground hover:border-border",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Quick filters</h2>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {budgetFilters.map((budget) => (
              <button
                key={budget}
                onClick={() => setFilters({ ...filters, budget })}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs uppercase",
                  filters.budget === budget ? "border-accent/60 bg-accent/10 text-foreground" : "border-border/40 bg-background/60 text-muted-foreground",
                )}
              >
                ${budget}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {timeFilters.map((time) => (
              <button
                key={time}
                onClick={() => setFilters({ ...filters, timeOfDay: time })}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs uppercase",
                  filters.timeOfDay === time ? "border-accent/60 bg-accent/10 text-foreground" : "border-border/40 bg-background/60 text-muted-foreground",
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Distance</span>
            <span>{filters.distance} km</span>
          </div>
          <Slider value={[filters.distance]} min={1} max={20} step={1} onValueChange={([value]) => setFilters({ ...filters, distance: value })} />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="party" className="text-xs text-muted-foreground">
            Party size
          </label>
          <Input
            id="party"
            type="number"
            min={1}
            max={20}
            value={filters.partySize}
            onChange={(event) => setFilters({ ...filters, partySize: Number(event.target.value) || 1 })}
            className="h-8 w-20 border-border/40 bg-background/60 text-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch id="campus-only" checked={filters.campusOnly} onCheckedChange={(checked) => setFilters({ ...filters, campusOnly: Boolean(checked) })} />
          <label htmlFor="campus-only" className="text-xs text-muted-foreground">
            Show campus-verified
          </label>
        </div>
      </section>

      <section>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="contexts">
            <AccordionTrigger className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Saved contexts
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {savedContexts.map((context) => (
                  <button
                    key={context.id}
                    onClick={() => {
                      setFilters({ ...filters })
                      onContextSelect(context.summary)
                    }}
                    className="w-full rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-left text-xs text-muted-foreground hover:border-border"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{context.title}</span>
                      <span>{context.timestamp}</span>
                    </div>
                    <p>{context.summary}</p>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  )
}

function ChatPane({
  messages,
  typing,
  onSuggestion,
  onAction,
  latestMessageId,
}: {
  messages: ChatMessage[]
  typing: boolean
  onSuggestion: (prompt: string) => void
  onAction: (title: string, content: JSX.Element) => void
  latestMessageId?: string
}) {
  const hasMessages = messages.length > 0

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      <div className="mx-auto flex w-full max-w-[820px] flex-col gap-6">
        <div className="rounded-3xl border border-border/40 bg-card/60 p-6">
          <h2 className="font-comfortaa text-3xl font-bold">Do more, together.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell me what you want: "Sunrise beach + coffee", "Hike + ramen", "Tonight techno within $40", "Study group near USYD 4–6pm".
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestionPrompts.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                className="rounded-full border-border/40 bg-background/60 text-xs"
                onClick={() => onSuggestion(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {hasMessages &&
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} onAction={onAction} isLatest={latestMessageId === message.id} />
            ))}
          {typing && <TypingIndicator />}
        </div>
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  onAction,
  isLatest,
}: {
  message: ChatMessage
  onAction: (title: string, content: JSX.Element) => void
  isLatest: boolean
}) {
  const isAssistant = message.role === "assistant"

  return (
    <div className={cn("flex w-full", isAssistant ? "justify-start" : "justify-end")}> 
      <div
        className={cn(
          "max-w-[820px] space-y-4 rounded-2xl px-4 py-3 text-sm leading-relaxed shadow",
          isAssistant ? "bg-card/80 text-foreground" : "bg-foreground text-background",
        )}
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
          <span>{isAssistant ? "Assemble AI" : "You"}</span>
          <span>{message.createdAt}</span>
          {isAssistant && isLatest && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent">
              <Sparkles className="h-3 w-3" /> Live
            </span>
          )}
        </div>
        <p>{message.content}</p>

        {message.smartTimes && message.smartTimes.length > 0 && <SmartTimes suggestions={message.smartTimes} />}
        {message.eventCards && message.eventCards.length > 0 && <EventCardRow cards={message.eventCards} onAction={onAction} />}
        {message.itinerary && message.itinerary.length > 0 && <Itinerary steps={message.itinerary} onAction={onAction} />}
        {message.poll && <PollCard poll={message.poll} />}

        {isAssistant && (
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-border/40"
              onClick={() =>
                onAction(
                  "Plan preview",
                  <PlanPreview />,
                )
              }
            >
              Add to Plan
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border/40"
              onClick={() => onAction("Discover crew setup", <DiscoverCrewPanel />)}
            >
              Create Discover Crew
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border/40"
              onClick={() => onAction("Invite friends", <InviteFriendsPanel />)}
            >
              Invite Friends
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border/40"
              onClick={() => onAction("Calendar export", <CalendarExportPanel />)}
            >
              Add to Calendar
            </Button>
            <WhyThisPopover message={message} />
          </div>
        )}
      </div>
    </div>
  )
}

function EventCardRow({ cards, onAction }: { cards: EventCard[]; onAction: (title: string, content: JSX.Element) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {cards.map((card) => (
        <div key={card.id} className="flex justify-between gap-3 rounded-2xl border border-border/40 bg-background/80 p-4 transition hover:-translate-y-1 hover:border-border">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{card.category}</div>
            <div className="text-sm font-semibold text-foreground">{card.title}</div>
            <div className="text-xs text-muted-foreground">
              {card.area}
              {card.distKm ? ` • ${card.distKm.toFixed(1)} km` : ""}
            </div>
            {card.tags && (
              <div className="mt-2 flex flex-wrap gap-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {card.tags.map((tag) => (
                  <span key={`${card.id}-${tag}`} className="rounded-full bg-foreground/10 px-2 py-0.5 text-foreground/70">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {card.slot && (
              <p className="text-xs text-muted-foreground">
                {card.slot.start}
                {card.slot.end ? ` – ${card.slot.end}` : ""}
              </p>
            )}
            {card.meta && <p className="text-xs text-muted-foreground/80">{card.meta}</p>}
          </div>
          <div className="flex flex-col items-end justify-between">
            {card.budget && <Badge variant="outline" className="border-border/40 text-xs">${card.budget}</Badge>}
            <Button
              size="sm"
              className="mt-auto"
              onClick={() => {
                if (card.cta === "join") {
                  onAction("Join Discover Crew", <CrewSignupPreview card={card} />)
                  return
                }
                if (card.cta === "book") {
                  onAction("Book Venue", <BookingPreview card={card} />)
                  return
                }
                if (card.cta === "details") {
                  onAction("Venue Details", <DetailsPreview card={card} />)
                  return
                }
                onAction("Plan preview", <PlanPreview highlight={card} />)
              }}
            >
              {card.cta === "join" ? "Join" : card.cta === "book" ? "Book" : card.cta === "details" ? "Details" : "Add"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function Itinerary({ steps, onAction }: { steps: ItineraryStep[]; onAction: (title: string, content: JSX.Element) => void }) {
  return (
    <Card className="border-border/40 bg-background/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Itinerary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="space-y-2 text-sm text-foreground">
          {steps.map((step) => (
            <li key={`${step.t}-${step.label}`} className="flex items-start gap-3">
              <span className="min-w-[60px] text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">{step.t}</span>
              <div>
                <p className="font-medium">{step.label}</p>
                {step.meta && <p className="text-xs text-muted-foreground">{step.meta}</p>}
              </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 text-xs">
          <Button size="sm" variant="outline" className="border-border/40" onClick={() => onAction("Plan preview", <PlanPreview />)}>
            Swap step
          </Button>
          <Button size="sm" variant="outline" className="border-border/40">
            Shorten
          </Button>
          <Button size="sm" variant="outline" className="border-border/40">
            Save
          </Button>
          <Button size="sm" variant="outline" className="border-border/40">
            Add to Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PollCard({ poll }: { poll: { title: string; kind: "time" | "venue"; options: { id: string; label: string; votes: number; total: number }[] } }) {
  return (
    <Card className="border-border/40 bg-background/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{poll.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {poll.options.map((option) => {
          const percentage = Math.round((option.votes / option.total) * 100)
          return (
            <div key={option.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>{option.label}</span>
                <span>{percentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-border/60">
                <div className="h-full rounded-full bg-accent/70" style={{ width: `${percentage}%` }} />
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs">
                Vote
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function SmartTimes({ suggestions }: { suggestions: SmartTimeSuggestion[] }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-border/40 bg-background/80 p-3 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1 rounded-full bg-foreground/10 px-2 py-0.5 text-foreground">
        <Stars className="h-3 w-3" /> Smart times
      </span>
      {suggestions.map((suggestion) => (
        <span key={suggestion.slot} className="rounded-full bg-foreground/5 px-2 py-0.5 text-foreground/80">
          {suggestion.slot} — {suggestion.reason}
        </span>
      ))}
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="mx-auto flex max-w-[820px] items-center gap-2 text-xs text-muted-foreground">
      <div className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted delay-150" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted delay-300" />
      </div>
      Assemble AI is thinking…
    </div>
  )
}

function Composer({
  value,
  onChange,
  onSend,
  prompts,
  onPrompt,
}: {
  value: string
  onChange: (value: string) => void
  onSend: (value?: string) => void
  prompts?: string[]
  onPrompt?: (prompt: string) => void
}) {
  return (
    <div className="mx-auto w-full max-w-[820px] rounded-3xl border border-[#232833] bg-background/90 px-4 py-3 shadow">
      {prompts && prompts.length > 0 ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onPrompt?.(prompt)}
              className="rounded-full border border-border/40 bg-background/60 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground transition hover:border-border hover:text-foreground"
            >
              {prompt}
            </button>
          ))}
        </div>
      ) : null}
      <textarea
        id="assistant-composer"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            onSend()
          }
        }}
        placeholder="Message Assemble AI…"
        rows={1}
        className="max-h-40 w-full resize-none bg-transparent text-sm leading-relaxed focus-visible:outline-none"
      />
      <div className="mt-3 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">⌘ + Enter</div>
        <button
          type="button"
          onClick={() => onSend()}
          className="h-11 w-11 rounded-full border border-[#232833] bg-[#0B0F14] text-foreground transition will-change-transform hover:-translate-y-[1px] hover:bg-[var(--accent)] hover:text-black"
        >
          <ArrowUp className="mx-auto h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function PlanDrawer({ open, onOpenChange, title, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; children?: React.ReactNode }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md overflow-y-auto bg-background">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4 text-sm text-muted-foreground">{children}</div>
      </SheetContent>
    </Sheet>
  )
}

function PlanPreview({ highlight }: { highlight?: EventCard }) {
  return (
    <div className="space-y-4 text-sm text-foreground">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <Plug className="h-3 w-3" /> Plan summary
      </div>
      {highlight ? (
        <div className="rounded-2xl border border-border/40 bg-background/70 p-3 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Added: {highlight.title}</p>
          <p>
            {highlight.area}
            {highlight.slot ? ` • ${highlight.slot.start}${highlight.slot.end ? `–${highlight.slot.end}` : ""}` : ""}
          </p>
          {highlight.tags && highlight.tags.length > 0 && <p>Vibe: {highlight.tags.join(", ")}</p>}
        </div>
      ) : null}
      <ul className="space-y-2">
        <li>
          <strong>08:00</strong> — Bondi Coastal Walk (trail entry)
        </li>
        <li>
          <strong>09:30</strong> — Drift Espresso (coffee hold)
        </li>
        <li>
          <strong>10:15</strong> — Lox & Bagel Co. (booked)
        </li>
        <li>
          <strong>20:00</strong> — Skyline Spritz Society (Discover crew)
        </li>
      </ul>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <Badge variant="outline" className="border-border/40">Travel 14 minutes total</Badge>
        <Badge variant="outline" className="border-border/40">Budget ~$65pp</Badge>
        <Badge variant="outline" className="border-border/40">Bands synced</Badge>
      </div>
      <Button className="w-full">Lock Plan</Button>
    </div>
  )
}

function DiscoverCrewPanel() {
  const crews = [
    {
      id: "crew-a",
      title: "Skyline Spritz Society",
      matches: "7 / 8 matched",
      slot: "20:00 – 22:00",
      vibe: "Rooftop • dress smart • DJ Amaury",
    },
    {
      id: "crew-b",
      title: "Harbour Golden Hour",
      matches: "6 / 7 matched",
      slot: "18:30 – 21:00",
      vibe: "Sunset ferry • cocktails • live sax",
    },
  ]

  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      <p>Select a crew to spin up invites instantly. Everyone gets chat, RSVPs, and safety guardrails.</p>
      <ul className="space-y-3">
        {crews.map((crew) => (
          <li key={crew.id} className="rounded-2xl border border-border/40 bg-background/70 p-3">
            <p className="text-foreground">{crew.title}</p>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80">{crew.matches}</p>
            <p className="text-xs">{crew.slot}</p>
            <p className="text-xs">{crew.vibe}</p>
            <Button size="sm" className="mt-3 w-full">
              Create Crew Link
            </Button>
          </li>
        ))}
      </ul>
      <Button variant="outline" className="w-full border-border/40 text-xs uppercase tracking-[0.25em]">
        Generate new match
      </Button>
    </div>
  )
}

function InviteFriendsPanel() {
  const pollOptions = [
    { id: "time-1", label: "Sat 08:00", support: "5 votes" },
    { id: "time-2", label: "Sat 09:30", support: "3 votes" },
  ]

  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      <p>Drop a link into your group chat or send direct emails. We’ll track RSVPs and sync updates.</p>
      <div className="space-y-2 rounded-2xl border border-border/40 bg-background/70 p-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Invite link</p>
        <div className="flex items-center justify-between rounded-full border border-border/40 bg-background/60 px-3 py-1 text-xs">
          assemble.ai/invite/waypoint-382
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
            Copy
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Quick poll</p>
        <ul className="space-y-2">
          {pollOptions.map((option) => (
            <li key={option.id} className="flex items-center justify-between rounded-full border border-border/40 px-3 py-1 text-xs">
              <span>{option.label}</span>
              <span>{option.support}</span>
            </li>
          ))}
        </ul>
        <Button size="sm" className="w-full">
          Launch Invite
        </Button>
      </div>
    </div>
  )
}

function CalendarExportPanel() {
  const toggles = [
    "Single all-day block",
    "Individual stop events",
    "Push to Google + iCal",
  ]

  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      <p>Choose how the journey lands on everyone’s calendars. We’ll add travel buffers automatically.</p>
      <ul className="space-y-2">
        {toggles.map((toggle) => (
          <li key={toggle} className="flex items-center gap-2 rounded-2xl border border-border/40 bg-background/70 px-3 py-2">
            <Check className="h-4 w-4 text-accent" />
            <span>{toggle}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full">Add to Calendar</Button>
    </div>
  )
}

function WhyThisPopover({ message }: { message: ChatMessage }) {
  const primaryCard = message.eventCards?.[0]
  const primarySmart = message.smartTimes?.[0]
  const reasons = [
    primaryCard?.distKm ? `Within ${primaryCard.distKm.toFixed(1)} km of your start.` : null,
    primaryCard?.budget ? `Keeps spend in the ${formatBudgetLabel(primaryCard.budget)} range.` : null,
    primarySmart ? `${primarySmart.slot}: ${primarySmart.reason}.` : null,
    primaryCard?.tags && primaryCard.tags.length ? `Vibe match: ${primaryCard.tags.slice(0, 3).join(", ")}.` : null,
  ].filter(Boolean) as string[]

  if (reasons.length === 0) {
    reasons.push("Optimized for travel time, crowd levels, and safety checks.")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" className="text-muted-foreground">
          Why this
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 space-y-2 border-border/40 bg-background/95 text-xs text-muted-foreground">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Selection logic</p>
        <ul className="space-y-1 text-sm">
          {reasons.map((reason, index) => (
            <li key={index} className="flex gap-2 text-left">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-muted-foreground/80">Live mode would stream venue data, safety signals, and weather pivots.</p>
      </PopoverContent>
    </Popover>
  )
}

function CrewSignupPreview({ card }: { card: EventCard }) {
  return (
    <div className="space-y-3 text-sm text-muted-foreground">
      <p className="text-foreground">{card.title}</p>
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Capacity + vibe</p>
      <p className="text-xs">{card.meta ?? "Curated Discover crew"}</p>
      {card.slot && <p className="text-xs">{card.slot.start}{card.slot.end ? ` – ${card.slot.end}` : ""}</p>}
      <Button className="w-full">Reserve spot</Button>
      <Button variant="outline" className="w-full border-border/40 text-xs uppercase tracking-[0.25em]">
        Share preview link
      </Button>
    </div>
  )
}

function BookingPreview({ card }: { card: EventCard }) {
  return (
    <div className="space-y-3 text-sm text-muted-foreground">
      <p className="text-foreground">{card.title}</p>
      <p className="text-xs">{card.area}</p>
      {card.slot && (
        <p className="text-xs">
          {card.slot.start}
          {card.slot.end ? ` – ${card.slot.end}` : ""}
        </p>
      )}
      <div className="rounded-2xl border border-border/40 bg-background/70 p-3 text-xs">
        <p>Reservation held for 4 guests. Dietary notes synced.</p>
        {card.budget && <p>Budget: {formatBudgetLabel(card.budget)}</p>}
      </div>
      <Button className="w-full">Confirm booking</Button>
      <Button variant="outline" className="w-full border-border/40 text-xs uppercase tracking-[0.25em]">
        Request adjustment
      </Button>
    </div>
  )
}

function DetailsPreview({ card }: { card: EventCard }) {
  return (
    <div className="space-y-3 text-sm text-muted-foreground">
      <p className="text-foreground">{card.title}</p>
      <p className="text-xs">{card.area}</p>
      {card.tags && card.tags.length > 0 && <p className="text-xs">Tags: {card.tags.join(", ")}</p>}
      {card.meta && <p className="text-xs">{card.meta}</p>}
      <div className="rounded-2xl border border-border/40 bg-background/70 p-3 text-xs">
        <p>Live product would surface photos, queue estimates, and transport modes here.</p>
      </div>
      <Button size="sm" className="w-full">
        Open in Explore
      </Button>
    </div>
  )
}

function formatBudgetLabel(budget: EventCard["budget"]) {
  switch (budget) {
    case "<30":
      return "<$30"
    case "30-60":
      return "$30–$60"
    case "60-100":
      return "$60–$100"
    case "100+":
      return "$100+"
    default:
      return "mixed"
  }
}
