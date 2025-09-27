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
            <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Waypoint Bands: Plug-&-Play Crowd Magic
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Festivals, campus fairs, beach meetups, thrift markets — handheld in minutes, priced to slip into any budget.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              The band kit ships ready with NFC entry, crew lighting, live stats, and sponsor moments. No bulky hardware, no
              hidden costs: a single $40 purchase powers every experience you run.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={scrollToDemo}>
                See the $40 kit demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#features">Download pricing kit</a>
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
