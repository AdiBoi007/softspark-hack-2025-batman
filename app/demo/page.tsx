import type { Metadata } from "next"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { DemoHero } from "@/components/demo/demo-hero"
import { DemoDrive } from "@/components/demo/demo-drive"
import { DemoTimeline } from "@/components/demo/demo-timeline"
import { DemoConversation } from "@/components/demo/demo-conversation"
import { DemoIotDashboard } from "@/components/demo/demo-iot-dashboard"
import { DemoExtensions } from "@/components/demo/demo-extensions"
import { ImmersiveGallery } from "@/components/home/immersive-gallery"
import { ModeSwitchboard } from "@/components/home/mode-switchboard"
import { DiscoverNetworkDiagram } from "@/components/diagrams/discover-network-diagram"
import { SoloJourneyDiagram } from "@/components/diagrams/solo-journey-diagram"
import { BandsSchematic } from "@/components/bands/bands-schematic"
import { ExploreHeatmapDiagram } from "@/components/diagrams/explore-heatmap-diagram"
import { FriendsPollDiagram } from "@/components/diagrams/friends-poll-diagram"
import { CitySignalPanel } from "@/components/home/city-signal-panel"
import { QuickActions } from "@/components/home/quick-actions"
import { demoTimeline, demoConversation, demoExtensions } from "@/lib/demo-showcase"

export const metadata: Metadata = {
  title: "Waypoint Demo • Assemble AI social discovery",
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <DemoHero />

      <main className="space-y-20 pb-24">
        <DemoDrive stops={demoTimeline} />

        <section id="timeline" className="container space-y-10">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
            <DemoTimeline stops={demoTimeline} />
            <div id="conversation" className="rounded-3xl border border-border/40 bg-card/60 p-6">
              <h2 className="font-comfortaa text-2xl font-semibold text-foreground">Live chat with Assemble AI</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tap play to watch the AI weave logistics, logistics, and backup plans through the day.
              </p>
              <div className="mt-6 max-h-[420px] overflow-y-auto pr-2">
                <DemoConversation turns={demoConversation} />
              </div>
            </div>
          </div>
        </section>

        <section className="container space-y-12">
          <ImmersiveGallery />
          <ModeSwitchboard />
        </section>

        <section className="container grid gap-10 lg:grid-cols-2">
          <DiscoverNetworkDiagram />
          <SoloJourneyDiagram />
        </section>

        <section className="container grid gap-10 xl:grid-cols-[1.2fr_minmax(0,1fr)]">
          <BandsSchematic />
          <ExploreHeatmapDiagram />
        </section>

        <section className="container grid gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
          <FriendsPollDiagram />
          <CitySignalPanel />
        </section>

        <section id="extensions" className="container space-y-8">
          <DemoExtensions extensions={demoExtensions} />
          <DemoIotDashboard />
          <QuickActions />
        </section>
      </main>
      <Footer />
    </div>
  )
}
