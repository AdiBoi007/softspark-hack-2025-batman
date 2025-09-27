import { NextResponse } from "next/server"

import { trendingByCategory } from "@/lib/waypoint-data"

export function GET() {
  return NextResponse.json({ categories: trendingByCategory })
}
