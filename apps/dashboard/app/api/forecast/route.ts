import { NextResponse } from "next/server";
import { aggregateForecast } from "@surf/core";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const spot = url.searchParams.get("spot");
    const range = url.searchParams.get("range");
    if (!spot) {
      return NextResponse.json({ code: "SPOT_REQUIRED", message: "spot is required" }, { status: 400 });
    }
    // TODO: fetch real rows for spot+range
    const sample = [{ waveHeightFt: 3.0 }, { waveHeightFt: 2.6 }];
    const result = aggregateForecast(sample as any);
    return NextResponse.json({ spot, range, ...result });
  } catch (err: any) {
    return NextResponse.json({ code: "FORECAST_ERROR", message: err?.message || "unknown" }, { status: 500 });
  }
}
