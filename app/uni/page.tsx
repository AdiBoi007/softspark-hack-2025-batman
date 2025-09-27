"use client"

import { useState } from "react"
import { ArrowRight, GraduationCap, ShieldCheck, Users } from "lucide-react"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { uniTeasers } from "@/lib/waypoint-data"
import { toast } from "sonner"
import { triggerConfetti } from "@/lib/confetti"
import { UniCampusDiagram } from "@/components/diagrams/uni-campus-diagram"

const interestOptions = [
  "Societies",
  "Study buddies",
  "Nightlife",
  "Coffee crawls",
  "Markets",
  "Outdoor",
  "Sports",
  "Research",
]

export default function UniPage() {
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: "",
    name: "",
    campus: "",
    degree: "",
    year: "",
    interests: [] as string[],
    notes: "",
  })

  const handleInterest = (interest: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((item) => item !== interest),
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          mode: "Uni",
          categories: ["cowork"],
          campus: form.campus,
          degree: form.degree,
          year: form.year,
          interests: form.interests,
        }),
      })
      if (!response.ok) throw new Error("Unable to submit right now")
      await triggerConfetti({ scalar: 0.9 })
      toast.success("Uni waitlist saved — we’ll reach out soon.")
      setForm({ email: "", name: "", campus: "", degree: "", year: "", interests: [], notes: "" })
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="py-16">
          <div className="container grid gap-12 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
            <div className="space-y-6">
              <Badge className="w-fit border border-border/40 bg-background/60 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Waypoint Uni — coming soon
              </Badge>
              <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-6xl">
                Waypoint Uni — your campus, connected.
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover classmates, societies, study groups, and nights out, verified by campus email. Waypoint Uni keeps
                everything public-space by default with full safety layers.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified with .edu / campus ID
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-3 py-1">
                  <Users className="h-3.5 w-3.5" /> Societies & events
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {uniTeasers.map((teaser) => (
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
              <UniCampusDiagram />
            </div>

            <Card className="border-border/40 bg-card/60">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl">Join the Uni waitlist</CardTitle>
                <CardDescription>Tell us about your campus so we can prioritise your launch.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="uni-name">Name</Label>
                      <Input
                        id="uni-name"
                        value={form.name}
                        onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                        className="border-border/40 bg-background/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="uni-email">Campus email</Label>
                      <Input
                        id="uni-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                        placeholder="name@school.edu"
                        className="border-border/40 bg-background/60"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uni-campus">Campus</Label>
                    <Input
                      id="uni-campus"
                      value={form.campus}
                      onChange={(event) => setForm((prev) => ({ ...prev, campus: event.target.value }))}
                      placeholder="e.g. NYU, UCLA, UCL"
                      className="border-border/40 bg-background/60"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="uni-degree">Degree / major</Label>
                      <Input
                        id="uni-degree"
                        value={form.degree}
                        onChange={(event) => setForm((prev) => ({ ...prev, degree: event.target.value }))}
                        className="border-border/40 bg-background/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="uni-year">Year</Label>
                      <Input
                        id="uni-year"
                        value={form.year}
                        onChange={(event) => setForm((prev) => ({ ...prev, year: event.target.value }))}
                        placeholder="2025"
                        className="border-border/40 bg-background/60"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>What are you most excited for?</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions.map((interest) => (
                        <label key={interest} className="flex items-center gap-2 rounded-xl border border-border/40 bg-background/60 px-4 py-2 text-sm">
                          <Checkbox
                            checked={form.interests.includes(interest)}
                            onCheckedChange={(checked) => handleInterest(interest, checked as boolean)}
                          />
                          {interest}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uni-notes">Anything else we should know?</Label>
                    <Textarea
                      id="uni-notes"
                      value={form.notes}
                      onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                      placeholder="Society roles, recurring events, campus traditions..."
                      className="min-h-[120px] border-border/40 bg-background/60"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90" disabled={submitting}>
                    {submitting ? "Submitting..." : "Join Uni waitlist"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
