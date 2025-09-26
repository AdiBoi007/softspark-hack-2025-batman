"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Users, MapPin, Clock, Star, TrendingUp, Shield } from "lucide-react"

const features = [
  {
    category: "Social",
    items: [
      {
        title: "Smart Matching",
        description: "AI pairs you with compatible groups",
        progress: 92,
        icon: Users,
        testimonial: "Found my crew in minutes!",
        user: { name: "Sarah M.", avatar: "/placeholder.svg?height=32&width=32" },
      },
      {
        title: "Live Coordination",
        description: "Real-time group chat and location sharing",
        progress: 88,
        icon: MapPin,
        testimonial: "Never lost track of friends again",
        user: { name: "Mike R.", avatar: "/placeholder.svg?height=32&width=32" },
      },
    ],
  },
  {
    category: "Experience",
    items: [
      {
        title: "Instant Planning",
        description: "AI suggests venues based on your vibe",
        progress: 85,
        icon: Clock,
        testimonial: "Saved hours of planning",
        user: { name: "Emma L.", avatar: "/placeholder.svg?height=32&width=32" },
      },
      {
        title: "Quality Curation",
        description: "Verified venues and trusted groups only",
        progress: 96,
        icon: Star,
        testimonial: "Every night has been amazing",
        user: { name: "Alex K.", avatar: "/placeholder.svg?height=32&width=32" },
      },
    ],
  },
  {
    category: "Safety",
    items: [
      {
        title: "Smart Insights",
        description: "Crowd levels, wait times, and safety scores",
        progress: 90,
        icon: TrendingUp,
        testimonial: "Always know what to expect",
        user: { name: "Jordan P.", avatar: "/placeholder.svg?height=32&width=32" },
      },
      {
        title: "Trust & Safety",
        description: "ID verification and community moderation",
        progress: 94,
        icon: Shield,
        testimonial: "Feel safe meeting new people",
        user: { name: "Taylor S.", avatar: "/placeholder.svg?height=32&width=32" },
      },
    ],
  },
]

export function EnhancedFeatures() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for the perfect night
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Powered by AI, designed for real connections</p>
        </div>

        <Tabs defaultValue="Social" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {features.map((category) => (
              <TabsTrigger key={category.category} value={category.category} className="text-sm">
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((category) => (
            <TabsContent key={category.category} value={category.category} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {category.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <Card key={item.title} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                              <Icon className="h-5 w-5 text-accent" />
                            </div>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {item.progress}%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{item.description}</p>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>User satisfaction</span>
                            <span>{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>

                        <Separator />

                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="flex items-center gap-3 cursor-pointer hover:bg-secondary/50 p-2 rounded-md transition-colors">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={item.user.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {item.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{item.user.name}</p>
                                <p className="text-xs text-muted-foreground italic">"{item.testimonial}"</p>
                              </div>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                              <Avatar>
                                <AvatarImage src={item.user.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {item.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{item.user.name}</h4>
                                <p className="text-sm text-muted-foreground">Beta tester since March 2024</p>
                                <div className="flex items-center pt-2">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="ml-2 text-xs text-muted-foreground">5.0</span>
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
