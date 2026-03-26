import { describe, it, expect } from "vitest";
import { ingestWatchMetrics } from "../src/ingest/ingestWatchMetrics";

const mockClient = {
  from: () => ({
    insert: async () => ({ data: [{ id: "row-1" }], error: null })
  })
};

describe("ingestWatchMetrics", () => {
  it("creates watch metrics", async () => {
    const id = await ingestWatchMetrics(mockClient as any, "session-1", {
      durationMin: 62,
      avgHeartRate: 128
    });
    expect(id).toBe("row-1");
  });
});
