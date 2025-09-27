import { NextResponse } from "next/server"

import { smartJourneys } from "@/lib/waypoint-data"

export function GET() {
  return NextResponse.json({ journeys: smartJourneys })
}
