import { describe, it, expect } from "vitest";
import { ingestOpenMeteo } from "../src/ingest/openMeteo";

const mockClient = { from: () => ({ upsert: async () => ({ data: [{ id: "r-1" }], error: null }) }) };

describe("ingestOpenMeteo", () => {
  it("normalizes and stores a report", async () => {
    const id = await ingestOpenMeteo(mockClient as any, { spotName: "Los Caracas", reportDate: "2026-03-25" } as any);
    expect(id).toBe("r-1");
  });
});
