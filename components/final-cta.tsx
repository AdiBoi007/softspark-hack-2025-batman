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
          <p className="mt-4 text-lg text-muted-foreground">Join the beta and help shape the future of nightlife</p>

          <div className="mt-8">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8"
              onClick={() => setShowWaitlist(true)}
            >
              Join the Beta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <WaitlistDialog open={showWaitlist} onOpenChange={setShowWaitlist} />
    </section>
  )
}
