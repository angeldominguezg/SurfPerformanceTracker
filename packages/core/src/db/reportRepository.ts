import { prisma } from "./prisma";

export async function upsertReportSummary(input: {
  spotId: string;
  date: Date;
  analysisBrief?: string;
}) {
  return prisma.report.upsert({
    where: { spotId_date: { spotId: input.spotId, date: input.date } },
    create: input,
    update: input,
  });
}
