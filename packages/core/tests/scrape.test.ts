import { describe, it, expect } from "vitest";
import { ingestScrape } from "../src/ingest/scrape";

const mockClient = { from: () => ({ upsert: async () => ({ data: [{ id: "r-1" }], error: null }) }) };

describe("ingestScrape", () => {
  it("normalizes and stores a report", async () => {
    const id = await ingestScrape(mockClient as any, { spotName: "Los Caracas", reportDate: "2026-03-25" } as any);
    expect(id).toBe("r-1");
  });
});
