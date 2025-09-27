import { NextResponse } from "next/server"
import { z } from "zod"

const waitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().optional().default(""),
  city: z.string().optional().default(""),
  ageRange: z.string().optional().default(""),
  interests: z.array(z.string()).optional().default([]),
  budget: z.string().optional().default(""),
  availability: z.string().optional().default(""),
  mode: z.string().min(2),
  categories: z.array(z.string()).optional().default([]),
  crewId: z.string().optional().default(""),
  campus: z.string().optional().default(""),
  degree: z.string().optional().default(""),
  year: z.string().optional().default(""),
  idealDays: z.string().optional().default(""),
  notes: z.string().optional().default(""),
})

/**
 * SQL delta reference (Supabase / Postgres):
 *
 * alter table public.waitlist_submissions
 *   add column if not exists categories text[],
 *   add column if not exists campus text,
 *   add column if not exists degree text,
 *   add column if not exists year text;
 */

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null)

  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const result = waitlistSchema.safeParse(payload)
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 422 })
  }

  const submission = {
    ...result.data,
    submittedAt: new Date().toISOString(),
  }

  // TODO: Persist to database or CRM. For now, log to server console so teams can hook into log drains.
  console.info("[waitlist] submission", submission)

  return NextResponse.json({ ok: true })
}
