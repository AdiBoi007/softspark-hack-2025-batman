import { NextResponse } from "next/server"

import { suggestionResponses } from "@/lib/assistant-data"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || !body.message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 })
  }

  const suggestion = typeof body.message === "string" ? suggestionResponses[body.message] : undefined

  const reply = suggestion?.assistant ?? {
    id: crypto.randomUUID(),
    role: "assistant" as const,
    content:
      "I’ve logged that. In the live product I’d fetch venues, crew availability, and calendars right now—connect your API key to go fully live.",
    createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }

  return NextResponse.json({ reply })
}
