import { NextResponse } from "next/server";
import { ProfileSchema, SchemesResponseSchema, buildUserMessage } from "@/lib/schema";
import { callDeepInfra, extractJson } from "@/lib/deepinfra";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";
import { getRatelimit, getClientIp } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const limiter = getRatelimit();
  if (limiter) {
    const ip = getClientIp(req);
    const { success, reset } = await limiter.limit(ip);
    if (!success) {
      const retryAfterSec = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return NextResponse.json(
        {
          error:
            "Rate limit reached — 5 lookups per hour per IP. Please try again later.",
          retryAfter: retryAfterSec,
        },
        { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
      );
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = ProfileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Profile validation failed.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const userMessage = buildUserMessage(parsed.data);

  let raw: string;
  try {
    raw = await callDeepInfra(SYSTEM_PROMPT, userMessage);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upstream call failed";
    return NextResponse.json(
      { error: "Could not reach scheme advisor. Please try again.", detail: msg.replace(/Bearer\s+[^\s]+/g, "Bearer [redacted]") },
      { status: 502 }
    );
  }

  let json: unknown;
  try {
    json = extractJson(raw);
  } catch {
    return NextResponse.json(
      { error: "Advisor returned malformed output. Please retry." },
      { status: 502 }
    );
  }

  const result = SchemesResponseSchema.safeParse(json);
  if (!result.success) {
    return NextResponse.json(
      { error: "Advisor output did not match expected shape. Please retry." },
      { status: 502 }
    );
  }

  const sorted = {
    summary: result.data.summary,
    schemes: [...result.data.schemes].sort((a, b) => b.match_score - a.match_score),
  };

  return NextResponse.json(sorted, { status: 200 });
}
