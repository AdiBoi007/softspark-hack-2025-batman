"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Zap, Wifi, Shield, Users, Radio, Smartphone } from "lucide-react"

const techFeatures = [
  { icon: Zap, label: "NFC Tap", color: "from-yellow-400 to-orange-500", progress: 95 },
  { icon: Wifi, label: "Bluetooth 5.0", color: "from-blue-400 to-cyan-500", progress: 88 },
  { icon: Shield, label: "Encrypted", color: "from-green-400 to-emerald-500", progress: 100 },
  { icon: Users, label: "Group Sync", color: "from-purple-400 to-pink-500", progress: 92 },
  { icon: Radio, label: "LED Matrix", color: "from-red-400 to-rose-500", progress: 85 },
  { icon: Smartphone, label: "App Control", color: "from-indigo-400 to-blue-500", progress: 90 },
]

export function CircularTechDiagram() {
  const [rotation, setRotation] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.05)
      setActiveFeature((prev) => (prev + 1) % techFeatures.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-4">
            Technology
          </Badge>
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">Advanced Band Technology</h2>
          <p className="mt-4 text-lg text-muted-foreground">Six core technologies working in perfect harmony</p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-center">
            <div className="relative h-96 w-96">
              {/* Central hub */}
              <div className="absolute inset-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/20 to-accent/40 border-2 border-accent/30 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-accent/60 animate-pulse" />
              </div>

              {/* Rotating features */}
              {techFeatures.map((feature, index) => {
                const angle = index * 60 + rotation
                const x = Math.cos((angle * Math.PI) / 180) * 140
                const y = Math.sin((angle * Math.PI) / 180) * 140
                const isActive = index === activeFeature

                return (
                  <TooltipProvider key={feature.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                            isActive ? "scale-125 z-10" : "scale-100"
                          }`}
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                          }}
                        >
                          <div className={`h-full w-full rounded-full bg-gradient-to-br ${feature.color} p-0.5`}>
                            <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                              <feature.icon
                                className={`h-6 w-6 ${isActive ? "text-accent" : "text-muted-foreground"}`}
                              />
                            </div>
                          </div>
                          {/* Connection line */}
                          <div
                            className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-accent/30 to-transparent origin-left"
                            style={{
                              width: "140px",
                              transform: `translate(-50%, -50%) rotate(${angle + 180}deg)`,
                            }}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-center">
                          <p className="font-semibold">{feature.label}</p>
                          <Progress value={feature.progress} className="w-20 mt-1" />
                          <p className="text-xs text-muted-foreground mt-1">{feature.progress}% ready</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techFeatures.map((feature, index) => (
              <Card
                key={feature.label}
                className={`transition-all duration-300 ${
                  index === activeFeature ? "ring-2 ring-accent/50 bg-accent/5" : ""
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto mb-3 h-10 w-10 rounded-full bg-gradient-to-br ${feature.color} p-0.5`}>
                    <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                      <feature.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-semibold">{feature.label}</h3>
                  <Progress value={feature.progress} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">{feature.progress}% ready</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
