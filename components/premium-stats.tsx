"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Heart, MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"

type PlatformStat = {
  label: string
  value: number
  change: string
  icon: typeof Users
  color: string
  gradient: string
  suffix?: string
}

const stats: PlatformStat[] = [
  {
    label: "Active Users",
    value: 12847,
    change: "+23%",
    icon: Users,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    label: "Successful Matches",
    value: 8934,
    change: "+18%",
    icon: Heart,
    color: "text-pink-500",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    label: "Venues Connected",
    value: 156,
    change: "+31%",
    icon: MapPin,
    color: "text-purple-500",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    label: "Avg Response Time",
    value: 2.3,
    suffix: "s",
    change: "-12%",
    icon: Clock,
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
  },
]

export function PremiumStats() {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})

  useEffect(() => {
    stats.forEach((stat, index) => {
      let current = 0
      const decimals = stat.suffix ? 1 : 0
      const increment = stat.value / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setAnimatedValues((prev) => ({ ...prev, [stat.label]: Number(current.toFixed(decimals)) }))
      }, 30)

      setTimeout(
        () => {
          clearInterval(timer)
          setAnimatedValues((prev) => ({ ...prev, [stat.label]: Number(stat.value.toFixed(decimals)) }))
        },
        index * 200 + 1500,
      )
    })
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-comfortaa text-3xl font-bold mb-4">Real-time Platform Stats</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Live data from our beta community showing the power of connected nightlife
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const animatedValue = animatedValues[stat.label] ?? 0
            const displayValue = animatedValue.toLocaleString(undefined, {
              minimumFractionDigits: stat.suffix ? 1 : 0,
              maximumFractionDigits: stat.suffix ? 1 : 0,
            })
            const progressValue = stat.value === 0 ? 0 : Math.min(100, (animatedValue / stat.value) * 100)

            return (
              <Card
                key={stat.label}
                className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105 w-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-2xl font-bold font-mono">
                      {displayValue}
                      {stat.suffix}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>

                    <Progress value={progressValue} className="h-1 mt-3" />
                  </div>

                  {/* Animated background glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
