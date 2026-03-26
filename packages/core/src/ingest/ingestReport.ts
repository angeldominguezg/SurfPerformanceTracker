import { SurfReportInput } from "@surf/shared";

export async function ingestReport(client: any, input: SurfReportInput) {
  const result = await client.from("surf_reports").upsert(
    {
      spot_name: input.spotName,
      report_date: input.reportDate,
      wave_height_ft: input.waveHeightFt,
      swell_period_s: input.swellPeriodS,
      swell_direction_deg: input.swellDirectionDeg,
      wind_speed_kmh: input.windSpeedKmh,
      wind_direction_deg: input.windDirectionDeg,
      tide_state: input.tideState,
      source: input.source
    },
    { onConflict: "spot_name,report_date" }
  );
  const { data, error } = typeof result.select === "function" ? await result.select("id") : result;
  if (error) throw error;
  return data?.[0]?.id;
}
