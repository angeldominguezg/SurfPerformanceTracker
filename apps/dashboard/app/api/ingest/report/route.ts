import { NextResponse } from "next/server";
import { ingestReport, getSupabase } from "@surf/core";
import { validateSurfReport } from "@surf/shared";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = validateSurfReport(body);
    if (!validation.ok) {
      return NextResponse.json({ code: validation.code, message: validation.message }, { status: 400 });
    }
    const client = getSupabase();
    const id = await ingestReport(client, body);
    return NextResponse.json({ id });
  } catch (err: any) {
    return NextResponse.json({ code: "INGEST_REPORT_ERROR", message: err?.message || "unknown" }, { status: 500 });
  }
}
