import { describe, it, expect } from "vitest";
import { prisma } from "../../src/db/prisma";

const now = new Date();

const sampleSpot = {
  name: "Los Pocitos",
  region: "VE - La Guaira",
  country: "VE",
};

describe("prisma smoke", () => {
  it("can create spot/report/session", async () => {
    const spot = await prisma.spot.create({ data: sampleSpot });
    const report = await prisma.report.create({
      data: {
        spotId: spot.id,
        date: now,
        analysisBrief: "ok",
      },
    });
    const session = await prisma.session.create({
      data: {
        spotId: spot.id,
        reportId: report.id,
        date: now,
        rating: 4,
      },
    });

    expect(spot.id).toBeTruthy();
    expect(report.id).toBeTruthy();
    expect(session.id).toBeTruthy();
  });
});
