"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function BandsHero() {
  const scrollToDemo = () => {
    document.getElementById("bands-demo")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Waypoint Bands</h1>
            <p className="mt-6 text-xl text-muted-foreground">Make nights visible.</p>
            <p className="mt-4 text-lg text-muted-foreground">
              Colors, tap-in, live games. Smart wearable bands that sync your group's color, handle NFC venue entry, and
              power interactive experiences.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={scrollToDemo}>
                Run Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#features">See Features</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/band-display.png"
              alt="Smart band displaying welcome message"
              width={600}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
