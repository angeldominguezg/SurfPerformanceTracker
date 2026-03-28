import { describe, it, expect } from "vitest";
import { prisma } from "../../src/db/prisma";
import { upsertReportSummary } from "../../src/db/reportRepository";

describe("report repository", () => {
  it("upserts report by spot + date", async () => {
    const spot = await prisma.spot.create({
      data: { name: "Los Pocitos" },
    });
    const date = new Date("2026-03-28T00:00:00.000Z");

    const report = await upsertReportSummary({
      spotId: spot.id,
      date,
      analysisBrief: "ok",
    });

    expect(report.spotId).toBe(spot.id);
  });
});
