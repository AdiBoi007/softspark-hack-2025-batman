import { NextResponse } from "next/server"

import { demoExtensions } from "@/lib/demo-showcase"

export function GET() {
  return NextResponse.json({ extensions: demoExtensions })
}
