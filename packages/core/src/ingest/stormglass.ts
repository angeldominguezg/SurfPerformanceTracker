import { ingestReport } from "./ingestReport";

export async function ingestStormglass(client: any, input: any) {
  // TODO: map Stormglass payload to SurfReportInput
  return ingestReport(client, {
    spotName: input.spotName,
    reportDate: input.reportDate,
    source: "stormglass"
  } as any);
}
