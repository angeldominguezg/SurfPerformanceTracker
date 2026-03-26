import { describe, it, expect } from "vitest";
import { aggregateForecast } from "../src/forecast/aggregateForecast";

const rows = [
  { spot: "Los Caracas", date: "2026-03-25", waveHeightFt: 3.2 },
  { spot: "Los Caracas", date: "2026-03-25", waveHeightFt: 2.8 }
];

describe("aggregateForecast", () => {
  it("averages wave height", () => {
    const result = aggregateForecast(rows as any);
    expect(result.avgWaveHeightFt).toBeCloseTo(3.0, 1);
  });
});
