"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Wifi, Users, Zap, Play, Pause } from "lucide-react"
import { useState, useEffect } from "react"

const flowSteps = [
  {
    id: 1,
    title: "Tap to Enter",
    description: "NFC band syncs with venue",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-500",
    gradientColors: ["#3b82f6", "#06b6d4"], // Added explicit gradient colors
    position: { x: 50, y: 100 },
  },
  {
    id: 2,
    title: "AI Analysis",
    description: "Real-time crowd matching",
    icon: Zap,
    color: "from-accent to-orange-500",
    gradientColors: ["#f59e0b", "#f97316"], // Added explicit gradient colors
    position: { x: 200, y: 50 },
  },
  {
    id: 3,
    title: "Group Formation",
    description: "Smart crew assembly",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    gradientColors: ["#a855f7", "#ec4899"], // Added explicit gradient colors
    position: { x: 350, y: 100 },
  },
  {
    id: 4,
    title: "Live Sync",
    description: "Connected experience",
    icon: Wifi,
    color: "from-green-500 to-emerald-500",
    gradientColors: ["#22c55e", "#10b981"], // Added explicit gradient colors
    position: { x: 500, y: 50 },
  },
]

export function InteractiveFlowDiagram() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-comfortaa text-4xl font-bold mb-6">How Waypoint Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the seamless flow from arrival to connection through our smart band ecosystem
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Play"} Demo
            </Button>
            <Badge variant="secondary">Interactive Demo</Badge>
          </div>
        </div>

        <Card className="max-w-6xl mx-auto bg-gradient-to-br from-background/50 to-secondary/20 backdrop-blur-sm border-accent/20">
          <CardHeader>
            <CardTitle className="text-center">Live Flow Visualization</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Interactive SVG Diagram */}
            <div className="relative h-64 mb-8">
              <svg className="w-full h-full" viewBox="0 0 600 200">
                <defs>
                  <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
                    <stop offset="33%" stopColor="rgb(251, 191, 36)" stopOpacity="0.8" />
                    <stop offset="66%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.8" />
                  </linearGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {flowSteps.map((step) => (
                    <linearGradient
                      key={`gradient-${step.id}`}
                      id={`gradient-${step.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={step.gradientColors[0]} />
                      <stop offset="100%" stopColor={step.gradientColors[1]} />
                    </linearGradient>
                  ))}
                </defs>

                {/* Connection lines */}
                <path
                  d="M75 125 Q150 75 225 125 Q300 75 375 125 Q450 75 525 125"
                  stroke="url(#flowLine)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="10,5"
                  className="animate-pulse"
                />

                {/* Flow steps */}
                {flowSteps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === activeStep

                  return (
                    <g key={step.id}>
                      {/* Step circle */}
                      <circle
                        cx={step.position.x}
                        cy={step.position.y}
                        r={isActive ? "35" : "30"}
                        fill={`url(#gradient-${step.id})`}
                        filter={isActive ? "url(#glow)" : "none"}
                        className={`transition-all duration-500 ${isActive ? "animate-pulse" : ""}`}
                        onClick={() => setActiveStep(index)}
                        style={{ cursor: "pointer" }}
                      />

                      {/* Step number */}
                      <text
                        x={step.position.x}
                        y={step.position.y + 5}
                        textAnchor="middle"
                        className="fill-white font-bold text-sm"
                      >
                        {step.id}
                      </text>

                      {/* Animated particles for active step */}
                      {isActive && (
                        <>
                          <circle
                            cx={step.position.x - 20}
                            cy={step.position.y - 20}
                            r="2"
                            fill="rgb(251, 191, 36)"
                            className="animate-ping"
                          />
                          <circle
                            cx={step.position.x + 20}
                            cy={step.position.y + 20}
                            r="2"
                            fill="rgb(251, 191, 36)"
                            className="animate-ping delay-300"
                          />
                          <circle
                            cx={step.position.x + 25}
                            cy={step.position.y - 15}
                            r="1.5"
                            fill="rgb(251, 191, 36)"
                            className="animate-ping delay-700"
                          />
                        </>
                      )}
                    </g>
                  )
                })}

                {/* Progress indicator */}
                <rect x="50" y="180" width="500" height="4" rx="2" fill="rgb(30, 41, 59)" />
                <rect
                  x="50"
                  y="180"
                  width={`${((activeStep + 1) / flowSteps.length) * 500}`}
                  height="4"
                  rx="2"
                  fill="url(#flowLine)"
                  className="transition-all duration-500"
                />
              </svg>
            </div>

            {/* Step details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {flowSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === activeStep

                return (
                  <Card
                    key={step.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "ring-2 ring-accent shadow-xl bg-gradient-to-br from-accent/10 to-transparent scale-105"
                        : "hover:bg-secondary/50 hover:scale-102"
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`mx-auto mb-3 w-10 h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center ${isActive ? "animate-pulse" : ""}`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
