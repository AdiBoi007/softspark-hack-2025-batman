import type { Metadata } from "next"

import { AssistantInterface } from "@/components/assistant/assistant-interface"

export const metadata: Metadata = {
  title: "Waypoint • AI Concierge",
  description: "Chat with Assemble AI to plan events, nights out, hikes, travel, and campus meetups in one place.",
}

export default function AssistantPage() {
  return <AssistantInterface />
}
