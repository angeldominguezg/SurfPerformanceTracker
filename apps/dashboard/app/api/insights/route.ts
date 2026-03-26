import { NextResponse } from "next/server";
import { buildInsights } from "@surf/core";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const spot = url.searchParams.get("spot");
    if (!spot) {
      return NextResponse.json({ code: "SPOT_REQUIRED", message: "spot is required" }, { status: 400 });
    }
    // TODO: compute from real data by spot
    const result = buildInsights({ bestWindows: { [spot]: [{ avgWind: 6, avgPeriod: 10 }] } });
    return NextResponse.json({ spot, ...result });
  } catch (err: any) {
    return NextResponse.json({ code: "INSIGHTS_ERROR", message: err?.message || "unknown" }, { status: 500 });
  }
}
