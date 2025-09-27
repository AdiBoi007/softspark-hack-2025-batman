"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users2, BookOpen, MapPin, ArrowUpRight } from "lucide-react"

const nodes = [
  {
    id: "societies",
    label: "Societies",
    description: "Verified club events",
    icon: Users2,
    x: 40,
    y: 36,
  },
  {
    id: "study",
    label: "Study Buddy",
    description: "Match by major + pace",
    icon: BookOpen,
    x: 70,
    y: 80,
  },
  {
    id: "deals",
    label: "Campus Deals",
    description: "Cafés, copy shops, thrift",
    icon: MapPin,
    x: 24,
    y: 76,
  },
]

export function UniCampusDiagram() {
  const [activeNode, setActiveNode] = useState("societies")

  return (
    <div className="rounded-3xl border border-border/40 bg-card/60 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md space-y-3">
          <Badge className="border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Campus map
          </Badge>
          <h3 className="font-comfortaa text-2xl font-semibold text-foreground">Waypoint Uni links every campus touchpoint</h3>
          <p className="text-sm text-muted-foreground">
            Hover the nodes to preview what’s verified inside the Uni mode. Everything stays tied to .edu emails and
            public meetups.
          </p>
          <Button variant="ghost" className="gap-2 px-0 text-foreground hover:text-foreground/80" asChild>
            <a href="/uni">
              Join Uni waitlist
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="relative mt-6 h-64 w-full max-w-md overflow-hidden rounded-3xl border border-border/40 bg-background/70 lg:mt-0">
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <circle cx={60} cy={60} r={28} className="fill-emerald-500/10 stroke-emerald-400/40" strokeWidth={2} />
            <circle cx={60} cy={60} r={46} className="fill-transparent stroke-emerald-400/20" strokeWidth={1.5} strokeDasharray="6 6" />

            {nodes.map((node) => {
              const Icon = node.icon
              const isActive = node.id === activeNode
              return (
                <g key={node.id} onMouseEnter={() => setActiveNode(node.id)} className="cursor-pointer">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 10 : 8}
                    className={isActive ? "fill-emerald-400" : "fill-emerald-400/60"}
                  />
                  <foreignObject x={node.x - 8} y={node.y - 8} width={16} height={16}>
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-white">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                  </foreignObject>
                </g>
              )
            })}

            <circle cx={60} cy={60} r={16} className="fill-emerald-500" />
            <foreignObject x={48} y={48} width={24} height={24}>
              <div className="flex h-full w-full items-center justify-center text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
            </foreignObject>
            <text x={60} y={90} textAnchor="middle" className="text-xs font-semibold fill-foreground">
              .edu verified hub
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {nodes.map((node) => {
          const Icon = node.icon
          const isActive = node.id === activeNode
          return (
            <button
              key={`uni-${node.id}`}
              onMouseEnter={() => setActiveNode(node.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                isActive ? "border-emerald-500/60 bg-emerald-500/10 text-foreground" : "border-border/40 bg-background/60 text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                <div>
                  <p className="text-sm font-semibold">{node.label}</p>
                  <p className="text-xs opacity-80">{node.description}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
