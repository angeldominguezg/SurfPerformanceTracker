import { NextResponse } from "next/server";
import { ingestSession, ingestWatchMetrics, getSupabase } from "@surf/core";
import { validateSession } from "@surf/shared";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = validateSession(body);
    if (!validation.ok) {
      return NextResponse.json({ code: validation.code, message: validation.message }, { status: 400 });
    }
    const client = getSupabase();
    const sessionId = await ingestSession(client, body);
    if (body.watchMetrics) {
      await ingestWatchMetrics(client, sessionId, body.watchMetrics);
    }
    return NextResponse.json({ id: sessionId });
  } catch (err: any) {
    return NextResponse.json({ code: "INGEST_SESSION_ERROR", message: err?.message || "unknown" }, { status: 500 });
  }
}
