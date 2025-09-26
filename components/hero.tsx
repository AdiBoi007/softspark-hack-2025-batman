"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { WaitlistDialog } from "@/components/waitlist-dialog"

export function Hero() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/98" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-comfortaa text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl text-balance mb-6">
            Tonight, sorted.
          </h1>

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground text-pretty mb-12">
            AI plans it, you just show up.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 transition-all duration-300"
              onClick={() => setShowWaitlist(true)}
            >
              Join Beta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="text-muted-foreground hover:text-foreground px-8 py-3 transition-all duration-300"
            >
              <a href="#how-it-works">Learn more</a>
            </Button>
          </div>
        </div>
      </div>

      <WaitlistDialog open={showWaitlist} onOpenChange={setShowWaitlist} />
    </section>
  )
}
