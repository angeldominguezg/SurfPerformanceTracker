-- CreateEnum
CREATE TYPE "SourceProvider" AS ENUM ('WINDGURU', 'SURFLINE', 'SURF_FORECAST', 'OTHER');

-- CreateEnum
CREATE TYPE "WindType" AS ENUM ('GLASSY', 'OFFSHORE', 'ONSHORE', 'CROSSSHORE');

-- CreateTable
CREATE TABLE "Spot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT,
    "country" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotSourceUrl" (
    "id" TEXT NOT NULL,
    "spotId" TEXT NOT NULL,
    "source" "SourceProvider" NOT NULL,
    "url" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpotSourceUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "spotId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "analysisBrief" TEXT,
    "energyKj" DOUBLE PRECISION,
    "swellHeight" DOUBLE PRECISION,
    "swellPeriod" DOUBLE PRECISION,
    "swellDirection" TEXT,
    "windSpeed" DOUBLE PRECISION,
    "windDirection" TEXT,
    "windType" "WindType",
    "tide" TEXT,
    "bestWindowStart" TIMESTAMP(3),
    "bestWindowEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceReport" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "source" "SourceProvider" NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SourceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceBlock" (
    "id" TEXT NOT NULL,
    "sourceReportId" TEXT NOT NULL,
    "timeStart" TIMESTAMP(3) NOT NULL,
    "timeEnd" TIMESTAMP(3) NOT NULL,
    "energyKj" DOUBLE PRECISION,
    "swellHeight" DOUBLE PRECISION,
    "swellPeriod" DOUBLE PRECISION,
    "swellDirection" TEXT,
    "windSpeed" DOUBLE PRECISION,
    "windDirection" TEXT,
    "windType" "WindType",
    "tide" TEXT,
    "rawPayload" JSONB,

    CONSTRAINT "SourceBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsolidatedBlock" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "timeStart" TIMESTAMP(3) NOT NULL,
    "timeEnd" TIMESTAMP(3) NOT NULL,
    "energyKj" DOUBLE PRECISION,
    "swellHeight" DOUBLE PRECISION,
    "swellPeriod" DOUBLE PRECISION,
    "swellDirection" TEXT,
    "windSpeed" DOUBLE PRECISION,
    "windDirection" TEXT,
    "windType" "WindType",
    "tide" TEXT,
    "sourcesUsed" JSONB,

    CONSTRAINT "ConsolidatedBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "spotId" TEXT NOT NULL,
    "reportId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "rating" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SpotSourceUrl_spotId_idx" ON "SpotSourceUrl"("spotId");

-- CreateIndex
CREATE INDEX "Report_spotId_date_idx" ON "Report"("spotId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Report_spotId_date_key" ON "Report"("spotId", "date");

-- CreateIndex
CREATE INDEX "SourceReport_reportId_idx" ON "SourceReport"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "SourceReport_reportId_source_key" ON "SourceReport"("reportId", "source");

-- CreateIndex
CREATE INDEX "SourceBlock_sourceReportId_timeStart_idx" ON "SourceBlock"("sourceReportId", "timeStart");

-- CreateIndex
CREATE UNIQUE INDEX "SourceBlock_sourceReportId_timeStart_timeEnd_key" ON "SourceBlock"("sourceReportId", "timeStart", "timeEnd");

-- CreateIndex
CREATE INDEX "ConsolidatedBlock_reportId_timeStart_idx" ON "ConsolidatedBlock"("reportId", "timeStart");

-- CreateIndex
CREATE UNIQUE INDEX "ConsolidatedBlock_reportId_timeStart_timeEnd_key" ON "ConsolidatedBlock"("reportId", "timeStart", "timeEnd");

-- CreateIndex
CREATE INDEX "Session_spotId_date_idx" ON "Session"("spotId", "date");

-- AddForeignKey
ALTER TABLE "SpotSourceUrl" ADD CONSTRAINT "SpotSourceUrl_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SourceReport" ADD CONSTRAINT "SourceReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SourceBlock" ADD CONSTRAINT "SourceBlock_sourceReportId_fkey" FOREIGN KEY ("sourceReportId") REFERENCES "SourceReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsolidatedBlock" ADD CONSTRAINT "ConsolidatedBlock_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
