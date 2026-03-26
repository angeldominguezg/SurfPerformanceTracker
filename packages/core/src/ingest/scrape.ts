import { ingestReport } from "./ingestReport";

export async function ingestScrape(client: any, input: any) {
  // TODO: map scraper payload to SurfReportInput
  return ingestReport(client, {
    spotName: input.spotName,
    reportDate: input.reportDate,
    source: "scrape"
  } as any);
}
