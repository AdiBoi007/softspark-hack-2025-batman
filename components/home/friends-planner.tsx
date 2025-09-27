import { ArrowRight, CalendarCheck2, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { FriendsTemplate } from "@/lib/waypoint-data"

interface FriendsPlannerProps {
  templates: FriendsTemplate[]
}

export function FriendsPlanner({ templates }: FriendsPlannerProps) {
  return (
    <section className="py-20">
      <div className="container grid gap-12 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
        <div className="space-y-6">
          <Badge className="border border-border/50 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Plan with friends
          </Badge>
          <h2 className="font-comfortaa text-3xl font-semibold tracking-tight sm:text-4xl">Plan with your friends</h2>
          <p className="max-w-3xl text-muted-foreground">
            Drop in your crew, pick categories, and Waypoint handles polls, schedules, reservations, and live updates.
            Templates are just starting points—tweak them or build from scratch in the Journey Builder.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-border/40 bg-card/60">
              <CardHeader className="gap-3">
                <div className="flex size-10 items-center justify-center rounded-full border border-border/30 bg-background/60">
                  <Users className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">Invite-only, instant sync</CardTitle>
                <CardDescription>
                  Secure invite links, live RSVP tracking, and compatibility insights keep planning transparent.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/40 bg-card/60">
              <CardHeader className="gap-3">
                <div className="flex size-10 items-center justify-center rounded-full border border-border/30 bg-background/60">
                  <CalendarCheck2 className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">Slots, bookings, reminders</CardTitle>
                <CardDescription>
                  Waypoint syncs calendars, manages deposits, and pushes live notifications to every attendee.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <Button size="lg" className="gap-2 bg-foreground text-background hover:bg-foreground/90" asChild>
            <a href="/friends">
              Launch the planner
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-comfortaa text-2xl font-semibold">Journey templates</h3>
            <Badge variant="outline" className="border-border/40 text-xs uppercase tracking-[0.25em]">
              Remix-ready
            </Badge>
          </div>
          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="border-border/40 bg-background/60">
                <CardHeader className="flex-row items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.label}</CardTitle>
                    <CardDescription>{template.summary}</CardDescription>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {template.categories.map((category) => (
                        <Badge key={`${template.id}-${category}`} variant="secondary" className="border-border/30">
                          {category}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="border-border/30 uppercase tracking-[0.25em]">
                        {template.duration}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-foreground hover:text-foreground/80">
                    Adopt plan
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 text-xs">
                  {template.tags.map((tag) => (
                    <Badge key={`${template.id}-${tag}`} variant="outline" className="border-border/30">
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
