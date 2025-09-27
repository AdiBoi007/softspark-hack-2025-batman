import { NextResponse } from "next/server"

import { explorePlaces } from "@/lib/waypoint-data"

export function GET() {
  return NextResponse.json({ places: explorePlaces })
}
