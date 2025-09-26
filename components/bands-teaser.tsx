"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Nfc, Users2, BarChart3, Sparkles, Bell, Building2, ArrowRight, Zap, Wifi, Battery, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

const features = [
  {
    icon: Users2,
    title: "Group Colors",
    description: "One color per crew for visibility",
    details:
      "Advanced LED matrix displays your crew's unique color signature. Visible from 50+ meters in low light conditions.",
    progress: 95,
  },
  {
    icon: Nfc,
    title: "Tap-to-Enter",
    description: "NFC check-in at gate sensors",
    details:
      "13.56MHz NFC chip with 4KB storage. Sub-second authentication with venue systems and payment integration.",
    progress: 88,
  },
  {
    icon: BarChart3,
    title: "Live Insights",
    description: "Crowd %, groups inside, wait time",
    details: "Real-time analytics dashboard showing venue capacity, demographic breakdown, and predictive wait times.",
    progress: 92,
  },
  {
    icon: Sparkles,
    title: "Icebreakers",
    description: "AI prompts on band displays + DJ sync",
    details: "Context-aware conversation starters and synchronized light shows that pulse with the music beat.",
    progress: 78,
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Vibrations for drinks ready, events, requests",
    details: "Haptic feedback system with customizable patterns for different notification types and urgency levels.",
    progress: 85,
  },
  {
    icon: Building2,
    title: "Venue Boost",
    description: "Throughput, engagement, data insights",
    details:
      "Comprehensive analytics suite helping venues optimize flow, reduce wait times, and increase customer satisfaction.",
    progress: 90,
  },
]

const techSpecs = [
  { label: "Battery Life", value: "72 hours", icon: Battery },
  { label: "Connectivity", value: "NFC + Bluetooth 5.2", icon: Wifi },
  { label: "Display", value: '1.3" OLED + LED Strip', icon: Zap },
  { label: "Water Rating", value: "IPX7", icon: Shield },
]

export function BandsTeaser() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <section id="bands" className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="bands" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">Waypoint Bands</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Wearable bands that sync your group's color, tap-to-enter venues, and power live games.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <Image
              src="/images/smart-bands-hero.png"
              alt="Group of friends wearing colorful smart bands"
              width={600}
              height={400}
              className="rounded-lg"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-background/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {techSpecs.map((spec) => {
                      const Icon = spec.icon
                      return (
                        <div key={spec.label} className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-accent" />
                          <span className="text-muted-foreground">{spec.label}:</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specs">Detailed Specs</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {features.map((feature) => (
                    <Card key={feature.title} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                          <feature.icon className="h-5 w-5 text-accent" />
                        </div>
                        <h3 className="font-comfortaa text-sm font-semibold mb-2">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{feature.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Ready</span>
                            <span>{feature.progress}%</span>
                          </div>
                          <Progress value={feature.progress} className="h-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  {features.map((feature, index) => (
                    <AccordionItem key={feature.title} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <feature.icon className="h-4 w-4 text-accent" />
                          {feature.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">{feature.details}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Badge className="mb-4 bg-accent/20 text-accent">Faster doors • Higher engagement • Real-time data</Badge>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/bands">
                Run Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
