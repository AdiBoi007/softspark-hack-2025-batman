"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, Clock, MessageCircle, Star, ArrowRight } from "lucide-react"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import { useState } from "react"

const friendGroups = [
  {
    id: 1,
    name: "The Squad",
    members: 4,
    avatars: [
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
    ],
    lastPlan: "Rooftop bar crawl",
    nextPlan: "Tonight",
    compatibility: 95,
  },
  {
    id: 2,
    name: "Work Crew",
    members: 6,
    avatars: [
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
    ],
    lastPlan: "Karaoke night",
    nextPlan: "This weekend",
    compatibility: 88,
  },
]

const planningSteps = [
  {
    step: 1,
    title: "Sync Calendars",
    description: "AI finds when everyone's free",
    icon: Calendar,
  },
  {
    step: 2,
    title: "Match Vibes",
    description: "Suggests venues based on group preferences",
    icon: Star,
  },
  {
    step: 3,
    title: "Book & Go",
    description: "Handles reservations and sends everyone details",
    icon: MapPin,
  },
]

export default function FriendsPage() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-blue-500/20 text-blue-400">Friends Mode</Badge>
              <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-6xl">Plan with your crew</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                AI coordinates schedules, matches group vibes, and handles all the logistics. Your job is just to show
                up and have fun.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-blue-500 text-white hover:bg-blue-600 px-8"
                  onClick={() => setShowWaitlist(true)}
                >
                  Start Planning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  See Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-secondary/20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">How Friends Mode Works</h2>
              <p className="mt-4 text-lg text-muted-foreground">Three simple steps to the perfect group night out</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {planningSteps.map((step) => {
                const Icon = step.icon
                return (
                  <Card key={step.step} className="text-center">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 mb-4">
                        <Icon className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="text-sm font-medium text-blue-500 mb-2">Step {step.step}</div>
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

        {/* Friend Groups Demo */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">Your Friend Groups</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Manage multiple crews with different vibes and preferences
              </p>
            </div>

            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="active">Active Groups</TabsTrigger>
                <TabsTrigger value="create">Create New</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {friendGroups.map((group) => (
                    <Card key={group.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          <Badge variant="secondary">{group.members} members</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {group.avatars.map((avatar, i) => (
                              <Avatar key={i} className="h-8 w-8 border-2 border-background">
                                <AvatarImage src={avatar || "/placeholder.svg"} />
                                <AvatarFallback>U{i + 1}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">+{group.members - 3} more</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Group compatibility</span>
                            <span>{group.compatibility}%</span>
                          </div>
                          <Progress value={group.compatibility} className="h-2" />
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Last plan: {group.lastPlan}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Next available: {group.nextPlan}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Plan Night
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="create" className="space-y-6">
                <Card className="max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle>Create New Group</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-center py-8">Group creation coming soon in beta!</p>
                    <Button className="w-full" onClick={() => setShowWaitlist(true)}>
                      Join Beta for Early Access
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <WaitlistDialog open={showWaitlist} onOpenChange={setShowWaitlist} />
    </div>
  )
}
