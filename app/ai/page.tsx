import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Waypoint AI Concierge",
  description: "Chat with Assemble AI to plan anything across the city.",
}

export default function AIPage() {
  redirect("/assistant")
}
