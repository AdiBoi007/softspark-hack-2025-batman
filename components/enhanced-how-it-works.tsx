"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Users2, Calendar, ArrowRight, CheckCircle } from "lucide-react"

const steps = [
  {
    id: "vibe",
    icon: MessageSquare,
    title: "Tell us your vibe",
    description: "Radius, budget, vibes, availability",
    details: "Set your preferences for the perfect night out experience",
    progress: 100,
    features: ["Location radius", "Budget range", "Music preferences", "Availability windows"],
  },
  {
    id: "mode",
    icon: Users2,
    title: "Pick your mode",
    description: "Friends / Discover / Blind Date",
    details: "Choose how you want to connect with others tonight",
    progress: 85,
    features: ["Friends mode", "Discover groups", "Blind date matching", "Solo adventures"],
  },
  {
    id: "flow",
    icon: Calendar,
    title: "Nightflow unlocked",
    description: "Pre-drinks → main → afters, timed & booked",
    details: "Your complete night journey, perfectly orchestrated",
    progress: 92,
    features: ["Pre-drinks venues", "Main event booking", "After-party options", "Smart timing"],
  },
]

export function EnhancedHowItWorks() {
  const [activeStep, setActiveStep] = useState("vibe")

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-4">
            How It Works
          </Badge>
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">
            Three simple steps to your perfect night out
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">From planning to partying, we've got you covered</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 max-w-2xl mx-auto">
              {steps.map((step) => (
                <TabsTrigger key={step.id} value={step.id} className="flex items-center gap-2">
                  <step.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{step.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {steps.map((step, index) => (
              <TabsContent key={step.id} value={step.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <Card className="relative overflow-hidden w-full">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                          <step.icon className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-comfortaa text-2xl font-semibold">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>

                      <p className="text-lg mb-6">{step.details}</p>

                      <div className="space-y-3 mb-6">
                        {step.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Development Progress</span>
                          <span>{step.progress}%</span>
                        </div>
                        <Progress value={step.progress} />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="relative w-full">
                    <div className="flex flex-col items-center space-y-4 max-w-md mx-auto">
                      {steps.map((s, i) => (
                        <div key={s.id} className="flex items-center w-full max-w-md">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                              i <= index
                                ? "bg-accent border-accent text-accent-foreground"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {i < index ? <CheckCircle className="h-5 w-5" /> : <span>{i + 1}</span>}
                          </div>
                          <div className="flex-1 ml-4">
                            <div
                              className={`h-2 rounded-full transition-all ${i <= index ? "bg-accent" : "bg-muted"}`}
                            />
                          </div>
                          {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground ml-2" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
