"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { WaitlistDialog } from "@/components/waitlist-dialog"

export function FinalCTA() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  return (
    <section id="join" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">Be in the first wave.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Early members shape how Waypoint runs cities—solo rituals, crew adventures, campus meetups, and everything in
            between.
          </p>

          <div className="mt-8">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8"
              onClick={() => setShowWaitlist(true)}
            >
              Join the beta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <WaitlistDialog
        open={showWaitlist}
        onOpenChange={setShowWaitlist}
        initialMode="Discover"
        initialCategories={["Nightlife", "Events", "Restaurants"]}
      />
    </section>
  )
}
