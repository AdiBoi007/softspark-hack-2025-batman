import { NextResponse } from "next/server"

import { uniTeasers } from "@/lib/waypoint-data"

export function GET() {
  return NextResponse.json({ teasers: uniTeasers })
}
