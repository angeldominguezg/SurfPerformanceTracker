import { describe, it, expect } from "vitest";
import { buildInsights } from "../src/analytics/buildInsights";

const input = { bestWindows: { "Los Caracas": [{ avgWind: 6, avgPeriod: 10 }] } };

describe("buildInsights", () => {
  it("returns recommendations", () => {
    const result = buildInsights(input as any);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });
});
