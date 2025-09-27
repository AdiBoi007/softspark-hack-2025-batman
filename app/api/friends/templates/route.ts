import { NextResponse } from "next/server"

import { friendsTemplates } from "@/lib/waypoint-data"

export function GET() {
  return NextResponse.json({ templates: friendsTemplates })
}
