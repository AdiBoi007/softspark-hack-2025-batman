"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Users, Map, Gift, Wifi, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const nodes = [
  {
    id: "kit",
    label: "$40 Kit",
    description: "Reusable bands + reader puck",
    icon: CheckCircle2,
    x: 50,
    y: 50,
  },
  {
    id: "crew",
    label: "Crew Glow",
    description: "Sync colours per group",
    icon: Users,
    x: 220,
    y: 32,
  },
  {
    id: "entry",
    label: "Tap Entry",
    description: "NFC access + welcome",
    icon: Map,
    x: 360,
    y: 60,
  },
  {
    id: "intel",
    label: "Live Intel",
    description: "Capacity + spend",
    icon: Wifi,
    x: 220,
    y: 96,
  },
  {
    id: "moments",
    label: "Sponsor Moments",
    description: "Timed drops + perks",
    icon: Gift,
    x: 100,
    y: 110,
  },
  {
    id: "energy",
    label: "Energy Sync",
    description: "Lights + audio pulse",
    icon: Zap,
    x: 330,
    y: 120,
  },
]

const connections: Array<[string, string]> = [
  ["kit", "crew"],
  ["kit", "entry"],
  ["kit", "intel"],
  ["crew", "moments"],
  ["intel", "moments"],
  ["entry", "energy"],
  ["moments", "energy"],
]

export function BandsSchematic() {
  const [active, setActive] = useState("kit")

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => {
        const index = nodes.findIndex((node) => node.id === prev)
        return nodes[(index + 1) % nodes.length].id
      })
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="border-border/40 bg-card/50">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge className="border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Kit schematic
          </Badge>
          <CardTitle className="mt-2 text-2xl text-foreground">How the $40 kit powers every moment</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
        <div className="relative h-[260px] overflow-hidden rounded-3xl border border-border/40 bg-background/70 p-6">
          <svg viewBox="0 0 420 180" className="h-full w-full">
            <defs>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(232,204,126,0.8)" />
                <stop offset="100%" stopColor="rgba(138,229,255,0)" />
              </radialGradient>
            </defs>

            {connections.map(([from, to]) => {
              const start = nodes.find((node) => node.id === from)!
              const end = nodes.find((node) => node.id === to)!
              const isActive = start.id === active || end.id === active
              return (
                <line
                  key={`${from}-${to}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={isActive ? "url(#nodeGlow)" : "rgba(75,85,99,0.35)"}
                  strokeWidth={isActive ? 3 : 2}
                  strokeDasharray={isActive ? "" : "6 6"}
                />
              )
            })}

            {nodes.map((node) => {
              const Icon = node.icon
              const isActive = node.id === active
              return (
                <g key={node.id} onMouseEnter={() => setActive(node.id)} className="cursor-pointer">
                  {isActive && (
                    <circle cx={node.x} cy={node.y} r={24} fill="url(#nodeGlow)" opacity={0.6} />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    fill={isActive ? "rgba(232,204,126,0.9)" : "rgba(30,41,59,0.9)"}
                    stroke="rgba(148,163,184,0.5)"
                    strokeWidth={1.5}
                  />
                  <foreignObject x={node.x - 12} y={node.y - 12} width="24" height="24">
                    <div className="flex h-full w-full items-center justify-center">
                      <Icon className={isActive ? "h-4 w-4 text-background" : "h-4 w-4 text-muted-foreground"} />
                    </div>
                  </foreignObject>
                  <text
                    x={node.x}
                    y={node.y + 36}
                    textAnchor="middle"
                    className={`text-xs ${isActive ? "fill-foreground" : "fill-muted-foreground"}`}
                  >
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="space-y-4">
          {nodes.map((node) => (
            <button
              key={`detail-${node.id}`}
              onMouseEnter={() => setActive(node.id)}
              className={cn(
                "w-full rounded-2xl border px-4 py-3 text-left transition-all",
                active === node.id
                  ? "border-accent/60 bg-accent/10 text-foreground"
                  : "border-border/40 bg-background/60 text-muted-foreground hover:border-border",
              )}
            >
              <div className="flex items-center gap-3">
                <node.icon className="h-4 w-4" />
                <div>
                  <p className="text-sm font-semibold leading-tight">{node.label}</p>
                  <p className="text-xs opacity-80">{node.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
