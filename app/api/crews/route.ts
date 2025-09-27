import { NextResponse } from "next/server"

import { discoverCrews } from "@/lib/waypoint-data"

export function GET() {
  return NextResponse.json({ crews: discoverCrews })
}
