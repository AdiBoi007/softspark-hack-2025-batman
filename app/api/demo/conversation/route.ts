import { NextResponse } from "next/server"

import { demoConversation } from "@/lib/demo-showcase"

export function GET() {
  return NextResponse.json({ conversation: demoConversation })
}
