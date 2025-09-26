"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Shield, Clock, MapPin, Star, ArrowRight, Zap } from "lucide-react"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import { useState } from "react"

const matchExamples = [
  {
    id: 1,
    name: "Alex",
    age: 26,
    interests: ["Photography", "Craft Beer", "Hiking"],
    compatibility: 94,
    venue: "Rooftop Bar",
    time: "7:30 PM",
    vibe: "Creative & Adventurous",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 2,
    name: "Sam",
    age: 24,
    interests: ["Music", "Art", "Coffee"],
    compatibility: 89,
    venue: "Jazz Lounge",
    time: "8:00 PM",
    vibe: "Artistic & Thoughtful",
    avatar: "/placeholder.svg?height=64&width=64",
  },
]

const safetyFeatures = [
  {
    icon: Shield,
    title: "ID Verification",
    description: "Every user is verified with government ID",
  },
  {
    icon: MapPin,
    title: "Public Venues",
    description: "All dates happen in safe, public locations",
  },
  {
    icon: Clock,
    title: "Check-in System",
    description: "Automated safety check-ins during dates",
  },
  {
    icon: Star,
    title: "Rating System",
    description: "Community-driven safety ratings",
  },
]

const howItWorks = [
  {
    step: 1,
    title: "AI Matching",
    description: "Advanced algorithms find your perfect match based on 50+ compatibility factors",
    icon: Zap,
  },
  {
    step: 2,
    title: "Venue Selection",
    description: "AI picks the perfect spot based on both your preferences and safety ratings",
    icon: MapPin,
  },
  {
    step: 3,
    title: "Blind Reveal",
    description: "Meet at the venue - no photos exchanged beforehand for authentic connections",
    icon: Heart,
  },
]

export default function BlindDatePage() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-pink-500/20 text-pink-400">Blind Date Mode</Badge>
              <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-6xl">AI-matched dates</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Skip the endless swiping. Our AI analyzes 50+ compatibility factors to find your perfect match. No
                photos, no pressure - just authentic connections.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-pink-500 text-white hover:bg-pink-600 px-8"
                  onClick={() => setShowWaitlist(true)}
                >
                  Find My Match
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Safety First
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-secondary/20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">How Blind Dating Works</h2>
              <p className="mt-4 text-lg text-muted-foreground">Authentic connections through AI-powered matching</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {howItWorks.map((step) => {
                const Icon = step.icon
                return (
                  <Card key={step.step} className="text-center">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/10 mb-4">
                        <Icon className="h-8 w-8 text-pink-500" />
                      </div>
                      <div className="text-sm font-medium text-pink-500 mb-2">Step {step.step}</div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Match Examples */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">Your Potential Matches</h2>
              <p className="mt-4 text-lg text-muted-foreground">See how our AI finds your perfect compatibility</p>
            </div>

            <Tabs defaultValue="matches" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="matches">Today's Matches</TabsTrigger>
                <TabsTrigger value="preferences">Set Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="matches" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {matchExamples.map((match) => (
                    <Card key={match.id} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={match.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{match.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-xl">
                              {match.name}, {match.age}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">{match.vibe}</p>
                          </div>
                          <Badge className="bg-pink-500/20 text-pink-400">{match.compatibility}% match</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Compatibility</span>
                            <span>{match.compatibility}%</span>
                          </div>
                          <Progress value={match.compatibility} className="h-2" />
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{match.venue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{match.time}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Shared Interests</p>
                          <div className="flex flex-wrap gap-1">
                            {match.interests.map((interest) => (
                              <Badge key={interest} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm">
                            <Heart className="h-4 w-4 mr-2" />
                            Accept Date
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Pass
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card className="max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle>Dating Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-center py-8">Preference settings coming soon in beta!</p>
                    <Button className="w-full" onClick={() => setShowWaitlist(true)}>
                      Join Beta for Early Access
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20 bg-secondary/20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">Safety First, Always</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Your safety is our top priority with multiple layers of protection
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {safetyFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="text-center">
                    <CardHeader>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 mb-3">
                        <Icon className="h-6 w-6 text-green-500" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WaitlistDialog open={showWaitlist} onOpenChange={setShowWaitlist} />
    </div>
  )
}
