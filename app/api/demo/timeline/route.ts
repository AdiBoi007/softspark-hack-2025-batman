import { NextResponse } from "next/server"

import { demoTimeline } from "@/lib/demo-showcase"

export function GET() {
  return NextResponse.json({ timeline: demoTimeline })
}
