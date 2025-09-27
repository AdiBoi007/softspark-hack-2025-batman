"use client"

import { useEffect, useState, type ComponentType } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Bell, Wifi, Waves, Sparkles } from "lucide-react"

interface Metrics {
  bandsOnline: number
  checkIns: number
  queueMinutes: number
  vibeScore: number
  safetyPings: number
  energy: number
}

const icons = {
  bands: Users,
  checkins: Bell,
  queue: Activity,
  vibe: Sparkles,
  safety: Wifi,
  energy: Waves,
}

export function DemoIotDashboard() {
  const [metrics, setMetrics] = useState<Metrics>({
    bandsOnline: 142,
    checkIns: 28,
    queueMinutes: 4,
    vibeScore: 86,
    safetyPings: 0,
    energy: 78,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        bandsOnline: prev.bandsOnline + Math.floor(Math.random() * 3 - 1),
        checkIns: prev.checkIns + Math.floor(Math.random() * 4),
        queueMinutes: Math.max(0, prev.queueMinutes + Math.floor(Math.random() * 3 - 1)),
        vibeScore: Math.min(100, Math.max(60, prev.vibeScore + Math.floor(Math.random() * 5 - 2))),
        safetyPings: Math.max(0, prev.safetyPings + (Math.random() > 0.92 ? 1 : 0)),
        energy: Math.min(100, Math.max(50, prev.energy + Math.floor(Math.random() * 5 - 2))),
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-border/40 bg-card/60">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Badge className="border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Bands & sensors
          </Badge>
          <CardTitle className="text-2xl">Live operational dashboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Simulated feed from Waypoint Bands + Assemble AI showing how the demo run is orchestrated.
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardTile
          label="Bands online"
          value={`${metrics.bandsOnline}`}
          caption="Reusable wristbands active"
          Icon={icons.bands}
        />
        <DashboardTile
          label="Check-ins"
          value={`${metrics.checkIns}`}
          caption="Crew check-ins in last hour"
          Icon={icons.checkins}
        />
        <DashboardTile
          label="Queue time"
          value={`${metrics.queueMinutes} min`}
          caption="Longest venue queue right now"
          Icon={icons.queue}
        />
        <DashboardTile
          label="Vibe score"
          value={`${metrics.vibeScore}`}
          caption="Composite energy + sentiment"
          Icon={icons.vibe}
        />
        <DashboardTile
          label="Safety pings"
          value={`${metrics.safetyPings}`}
          caption="SOS prompts in last 24h"
          Icon={icons.safety}
        />
        <DashboardTile
          label="Energy sync"
          value={`${metrics.energy}%`}
          caption="Music & lighting sync performance"
          Icon={icons.energy}
        />
      </CardContent>
    </Card>
  )
}

function DashboardTile({
  label,
  value,
  caption,
  Icon,
}: {
  label: string
  value: string
  caption: string
  Icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/60 p-5">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{caption}</p>
    </div>
  )
}
