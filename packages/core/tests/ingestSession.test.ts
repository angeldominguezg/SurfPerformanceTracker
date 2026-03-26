import { describe, it, expect } from "vitest";
import { ingestSession } from "../src/ingest/ingestSession";

const mockClient = {
  from: () => ({
    insert: async () => ({ data: [{ id: "row-1" }], error: null })
  })
};

describe("ingestSession", () => {
  it("creates a session", async () => {
    const id = await ingestSession(mockClient as any, {
      spotName: "Los Caracas",
      sessionDate: "2026-03-25",
      subjectiveScore: 8
    });
    expect(id).toBe("row-1");
  });
});
