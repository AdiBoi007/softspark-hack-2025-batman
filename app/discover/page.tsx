"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Users, MapPin, Star, Clock, Filter, ArrowRight, Sparkles } from "lucide-react"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import { useState } from "react"

const curatedCrews = [
  {
    id: 1,
    name: "Rooftop Hoppers",
    description: "Sky-high vibes and city views",
    members: 8,
    maxSize: 12,
    vibe: "Upscale",
    time: "8:00 PM",
    location: "CBD",
    compatibility: 92,
    tags: ["Cocktails", "Views", "Networking"],
    avatars: [
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
    ],
    hostRating: 4.9,
  },
  {
    id: 2,
    name: "Underground Beats",
    description: "Deep house and techno till dawn",
    members: 15,
    maxSize: 20,
    vibe: "Electronic",
    time: "10:00 PM",
    location: "Warehouse District",
    compatibility: 88,
    tags: ["Techno", "Dancing", "Late Night"],
    avatars: [
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
    ],
    hostRating: 4.8,
  },
  {
    id: 3,
    name: "Craft & Conversation",
    description: "Local brews and good company",
    members: 6,
    maxSize: 10,
    vibe: "Chill",
    time: "7:00 PM",
    location: "Inner West",
    compatibility: 95,
    tags: ["Craft Beer", "Chill", "Local"],
    avatars: [
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
      "/placeholder.svg?height=32&width=32",
    ],
    hostRating: 5.0,
  },
]

const vibeFilters = ["All", "Upscale", "Electronic", "Chill", "Live Music", "Dive Bars"]

export default function DiscoverPage() {
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [selectedVibe, setSelectedVibe] = useState("All")
  const [compatibilityRange, setCompatibilityRange] = useState([80])

  const filteredCrews = curatedCrews.filter(
    (crew) => (selectedVibe === "All" || crew.vibe === selectedVibe) && crew.compatibility >= compatibilityRange[0],
  )

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-purple-500/20 text-purple-400">Discover Mode</Badge>
              <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-6xl">Join curated crews</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Skip the planning. Join verified groups with similar vibes, interests, and energy levels. Every crew is
                curated for the perfect night out.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-purple-500 text-white hover:bg-purple-600 px-8"
                  onClick={() => setShowWaitlist(true)}
                >
                  Find Your Crew
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  How It Works
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Crews */}
        <section className="py-20 bg-secondary/20">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-comfortaa text-2xl font-bold">Tonight's Crews</h2>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  {filteredCrews.length} matches found
                </Badge>
              </div>

              <Tabs defaultValue="browse" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="browse">Browse Crews</TabsTrigger>
                  <TabsTrigger value="filters">Filters</TabsTrigger>
                </TabsList>

                <TabsContent value="filters" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Customize Your Search
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Vibe</label>
                        <div className="flex flex-wrap gap-2">
                          {vibeFilters.map((vibe) => (
                            <Badge
                              key={vibe}
                              variant={selectedVibe === vibe ? "default" : "secondary"}
                              className="cursor-pointer"
                              onClick={() => setSelectedVibe(vibe)}
                            >
                              {vibe}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium">Minimum Compatibility: {compatibilityRange[0]}%</label>
                        <Slider
                          value={compatibilityRange}
                          onValueChange={setCompatibilityRange}
                          max={100}
                          min={50}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="browse" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCrews.map((crew) => (
                      <Card key={crew.id} className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{crew.name}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">{crew.description}</p>
                            </div>
                            <Badge variant="outline">{crew.vibe}</Badge>
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            <div className="flex -space-x-2">
                              {crew.avatars.map((avatar, i) => (
                                <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                  <AvatarImage src={avatar || "/placeholder.svg"} />
                                  <AvatarFallback>U{i + 1}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {crew.members}/{crew.maxSize} people
                            </span>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Compatibility</span>
                              <span>{crew.compatibility}%</span>
                            </div>
                            <Progress value={crew.compatibility} className="h-2" />
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{crew.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{crew.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span>{crew.hostRating} host rating</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {crew.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <Button className="w-full" size="sm">
                            <Users className="h-4 w-4 mr-2" />
                            Join Crew
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WaitlistDialog open={showWaitlist} onOpenChange={setShowWaitlist} />
    </div>
  )
}
