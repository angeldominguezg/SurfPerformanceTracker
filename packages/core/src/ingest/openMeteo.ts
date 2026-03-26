import { ingestReport } from "./ingestReport";

export async function ingestOpenMeteo(client: any, input: any) {
  // TODO: map Open-Meteo payload to SurfReportInput
  return ingestReport(client, {
    spotName: input.spotName,
    reportDate: input.reportDate,
    source: "open-meteo"
  } as any);
}
