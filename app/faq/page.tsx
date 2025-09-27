"use client"

import { useState } from "react"
import { Sparkles, CalendarCheck, ShieldCheck, MessageCircle, ArrowRight, Clock4, MapPin } from "lucide-react"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WaitlistDialog } from "@/components/waitlist-dialog"

const quickAnswers = [
  {
    title: "AI plans, you vibe",
    description:
      "Share your crew's preferences once. Waypoint syncs calendars, curates venues, and serves a ready-to-go plan every time.",
    icon: Sparkles,
    bullet: "Instant personalised itineraries",
  },
  {
    title: "Timeline transparency",
    description:
      "Preview when invites go out, when check-ins happen, and how we coordinate changes without group chat chaos.",
    icon: Clock4,
    bullet: "Real-time scheduling clarity",
  },
  {
    title: "Safety on autopilot",
    description:
      "ID verification, public venues, live status updates, and an SOS fail-safe keep every night layered with protection.",
    icon: ShieldCheck,
    bullet: "Always-on trust and accountability",
  },
]

const faqSections = [
  {
    label: "Platform",
    accent: "bg-blue-500/15 text-blue-300",
    faqs: [
      {
        question: "How does Waypoint actually build a plan?",
        answer:
          "Waypoint ingests your group preferences, availability, and past nights out. Our recommendations engine blends city data, live availability signals, and vibe matching to produce a curated lineup with venue backups and travel buffers built in.",
      },
      {
        question: "Can I use Waypoint solo, or is it only for groups?",
        answer:
          "Both. Solo nights get concierge-style itineraries with pace suggestions. Invite friends and we automatically layer in schedule syncing, split payments, and collaborative tweaks before locking the reservation.",
      },
      {
        question: "What cities do you cover right now?",
        answer:
          "We’re live in NYC, LA, London, Austin, and Chicago. New markets drop monthly—join the waitlist to nudge your city up the queue.",
      },
    ],
  },
  {
    label: "Trust & Safety",
    accent: "bg-emerald-500/15 text-emerald-300",
    faqs: [
      {
        question: "How do live check-ins work?",
        answer:
          "We ping every attendee at key moments—arrival, midpoint, wrap-up—and surface the status in the app. If someone misses a check-in, their trusted contact gets nudged with the venue info and last known location.",
      },
      {
        question: "What happens if a plan needs to change mid-night?",
        answer:
          "Waypoint watches for updates from venues and your crew. If capacity shifts or the vibe isn’t right, we swap in backup options instantly and push the new plan with navigation and ride-share prompts.",
      },
      {
        question: "Is my personal data safe?",
        answer:
          "Absolutely. Preferences stay encrypted, we never sell your data, and you can nuke your profile (and all shared itineraries) in one tap from settings.",
      },
    ],
  },
  {
    label: "Membership",
    accent: "bg-purple-500/15 text-purple-300",
    faqs: [
      {
        question: "How much does Waypoint cost?",
        answer:
          "The core planning suite is free while we’re in beta. Premium unlocks concierge perks, last-minute access at partner spots, and member-only events once we launch publicly.",
      },
      {
        question: "Do venues pay to be featured?",
        answer:
          "Nope. Venues can partner with us for faster coordination, but recommendations are driven by match quality, availability, and how well they align with your group’s energy.",
      },
      {
        question: "How do I get early access?",
        answer:
          "Tap the join button, tell us about your nightlife style, and we’ll unlock invites in waves. Early adopters keep their premium perks when we go public.",
      },
    ],
  },
]

const contactOptions = [
  {
    title: "Talk to the team",
    description: "Something we didn’t cover? Drop us a line and we’ll get back in under 24 hours.",
    icon: MessageCircle,
    cta: "hello@waypoint.city",
    href: "mailto:hello@waypoint.city",
  },
  {
    title: "See live venues",
    description: "Curious about a specific neighbourhood night? We’ll design one with real-time availability.",
    icon: MapPin,
    cta: "Request a sample plan",
    href: "mailto:plans@waypoint.city?subject=Sample%20Plan%20Request",
  },
  {
    title: "Schedule a concierge session",
    description: "Premium members get 1:1 concierge onboarding with personal nightlife strategy.",
    icon: CalendarCheck,
    cta: "Book a 15 min slot",
    href: "mailto:concierge@waypoint.city?subject=Concierge%20Session",
  },
]

export default function FAQPage() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 -z-10">
            <div className="pointer-events-none absolute left-1/2 top-12 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
            <div className="pointer-events-none absolute left-[15%] top-1/3 h-72 w-72 rounded-full bg-purple-500/15 blur-[120px]" />
            <div className="pointer-events-none absolute right-[12%] bottom-12 h-64 w-64 rounded-full bg-emerald-500/15 blur-[100px]" />
          </div>

          <div className="container grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-8 text-balance">
              <Badge className="inline-flex items-center gap-2 border border-foreground/10 bg-background/40 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Everything you want to know
              </Badge>
              <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-6xl">
                Nights out, engineered for real life
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                We blend AI planning, venue intelligence, and safety layers so you can spend less time coordinating and more time living it up. Dive into the details below or chat with the squad directly.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90"
                  onClick={() => setShowWaitlist(true)}
                >
                  Join the beta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-border/60 backdrop-blur">
                  Explore sample plans
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {quickAnswers.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.title} className="border-border/50 bg-card/70 backdrop-blur">
                    <CardHeader className="gap-3">
                      <Badge variant="secondary" className="w-fit bg-foreground/10 text-foreground">
                        <Icon className="h-4 w-4" />
                      </Badge>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium text-muted-foreground/80">{item.bullet}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container grid gap-10 lg:grid-cols-[0.35fr_1fr]">
            <div className="space-y-4">
              <h2 className="font-comfortaa text-3xl font-semibold tracking-tight sm:text-4xl">All the answers, zero fluff</h2>
              <p className="text-muted-foreground">
                Browse by pillar or open everything—each answer is tuned by the team that builds the nightly experience. Have a curveball? Scroll down and we’ll take it live.
              </p>
            </div>

            <div className="space-y-12">
              {faqSections.map((section) => (
                <div key={section.label} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${section.accent}`}>
                      {section.label}
                    </span>
                    <span className="h-px flex-1 bg-border/50" aria-hidden />
                  </div>
                  <Accordion type="single" collapsible className="divide-y divide-border/40 rounded-2xl border border-border/40 bg-card/60 backdrop-blur">
                    {section.faqs.map((faq, index) => (
                      <AccordionItem key={faq.question} value={`${section.label}-${index}`} className="px-6">
                        <AccordionTrigger className="text-base font-medium text-foreground">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground/90">
                          <p>{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="container grid gap-8 lg:grid-cols-3">
            {contactOptions.map((option) => {
              const Icon = option.icon
              return (
                <Card key={option.title} className="border-border/40 bg-card/60 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                  <CardHeader className="gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="px-0 text-foreground hover:text-foreground/80" asChild>
                      <a href={option.href} className="flex items-center gap-2">
                        {option.cta}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="py-20">
          <div className="container rounded-3xl border border-border/40 bg-card/60 p-10 text-center backdrop-blur">
            <Badge className="mb-4 bg-foreground/10 text-foreground">Ready when you are</Badge>
            <h3 className="font-comfortaa text-3xl font-semibold sm:text-4xl">Drop your crew into Waypoint tonight</h3>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Set your vibe once, and we’ll keep the nights coming with concierge-level logistics, live safety layers, and city intel that adapts as fast as you do.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setShowWaitlist(true)}>
                Claim early access
              </Button>
              <Button size="lg" variant="outline" className="border-border/60 text-muted-foreground hover:text-foreground">
                Download the product deck
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WaitlistDialog open={showWaitlist} onOpenChange={setShowWaitlist} />
    </div>
  )
}
