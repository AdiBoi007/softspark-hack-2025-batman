"use client"

import { useEffect, useState } from "react"
import { GraduationCap, ShieldCheck, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UniTeaserItem {
  id: string
  title: string
  description: string
}

export function WaypointUniTeaser({ onWaitlist }: { onWaitlist?: (mode: string) => void }) {
  const [teasers, setTeasers] = useState<UniTeaserItem[]>([])

  useEffect(() => {
    let mounted = true
    const loadTeasers = async () => {
      try {
        const response = await fetch("/api/uni/teasers")
        if (!response.ok) throw new Error("Failed to load Uni teasers")
        const data = (await response.json()) as { teasers: UniTeaserItem[] }
        if (mounted) setTeasers(data.teasers)
      } catch (error) {
        console.error(error)
      }
    }
    loadTeasers()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="py-20">
      <div className="container grid gap-10 rounded-3xl border border-border/40 bg-card/40 p-10 backdrop-blur lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <Badge className="w-fit border border-border/40 bg-background/60 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Waypoint uni — coming soon
          </Badge>
          <h2 className="font-comfortaa text-3xl font-semibold tracking-tight sm:text-4xl">
            Waypoint Uni — your campus, connected.
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Discover classmates, societies, study groups, and nights out, all verified by campus email. Uni mode keeps
            everything public-space by default, with the same trust and safety layers.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5" /> ID checks
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" /> Campus verified
            </span>
          </div>
          {onWaitlist ? (
            <Button
              size="lg"
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => onWaitlist("Uni")}
            >
              Join Uni waitlist
            </Button>
          ) : (
            <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href="/uni">Join Uni waitlist</a>
            </Button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-border/40 bg-background/60">
            <CardHeader className="gap-3">
              <div className="flex size-10 items-center justify-center rounded-full border border-border/30 bg-background/60">
                <GraduationCap className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">What’s inside</CardTitle>
              <CardDescription>
                Hyperspecific filters by major, society, energy level, and study goals. Launching with top campuses first.
              </CardDescription>
            </CardHeader>
          </Card>
          {teasers.map((teaser) => (
            <Card key={teaser.id} className="border-border/40 bg-card/60">
              <CardHeader>
                <CardTitle className="text-lg">{teaser.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{teaser.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
