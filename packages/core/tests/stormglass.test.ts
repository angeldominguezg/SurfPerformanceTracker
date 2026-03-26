import { describe, it, expect } from "vitest";
import { ingestStormglass } from "../src/ingest/stormglass";

const mockClient = { from: () => ({ upsert: async () => ({ data: [{ id: "r-1" }], error: null }) }) };

describe("ingestStormglass", () => {
  it("normalizes and stores a report", async () => {
    const id = await ingestStormglass(mockClient as any, { spotName: "Los Caracas", reportDate: "2026-03-25" } as any);
    expect(id).toBe("r-1");
  });
});
