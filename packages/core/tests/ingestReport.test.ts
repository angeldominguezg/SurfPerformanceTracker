import { describe, it, expect } from "vitest";
import { ingestReport } from "../src/ingest/ingestReport";

const mockClient = {
  from: () => ({
    upsert: async () => ({ data: [{ id: "report-1" }], error: null })
  })
};

describe("ingestReport", () => {
  it("upserts a report", async () => {
    const id = await ingestReport(mockClient as any, {
      spotName: "Los Caracas",
      reportDate: "2026-03-25",
      waveHeightFt: 3.2
    });
    expect(id).toBe("report-1");
  });
});
