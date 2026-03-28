# Prisma + Postgres ORM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Prisma ORM with a Postgres schema to persist spots, daily reports, per-source 2h blocks, consolidated blocks, and user sessions.

**Architecture:** A centralized Prisma schema at repo root models Spot → Report (per day) with SourceReport/SourceBlock and ConsolidatedBlock for 2‑hour intervals, plus Session for user logs. Migrations are managed with Prisma CLI and Postgres `DATABASE_URL`.

**Tech Stack:** Node.js (pnpm monorepo), Prisma, PostgreSQL

---

## File Structure (planned changes)

- Create: `prisma/schema.prisma`
- Create: `prisma/migrations/*` (generated)
- Modify: `package.json` (root) — add Prisma scripts & deps
- Create: `packages/core/src/db/prisma.ts` (Prisma client singleton)
- Create: `packages/core/src/db/schema.ts` (exported model types/helpers)
- Create: `packages/core/tests/prisma/schema.test.ts` (schema sanity tests)
- Create: `packages/core/tests/prisma/seed.test.ts` (CRUD smoke tests)
- Modify: `packages/core/package.json` (add prisma client usage if needed)
- Modify: `apps/dashboard/.env.example` (document DATABASE_URL usage)

---

### Task 1: Add Prisma tooling to the monorepo

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add dev dependencies**

```json
{
  "devDependencies": {
    "prisma": "^5.15.0"
  },
  "dependencies": {
    "@prisma/client": "^5.15.0"
  }
}
```

- [ ] **Step 2: Add Prisma scripts**

```json
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  }
}
```

- [ ] **Step 3: Install deps**

Run: `COREPACK_HOME=/home/node/.corepack pnpm install`
Expected: no errors, prisma added.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
 git commit -m "chore: add prisma tooling"
```

---

### Task 2: Define Prisma schema (models + enums)

**Files:**
- Create: `prisma/schema.prisma`

- [ ] **Step 1: Write failing schema test (placeholder)**

```ts
// packages/core/tests/prisma/schema.test.ts
import { describe, it, expect } from "vitest";
import { PrismaClient } from "@prisma/client";

describe("prisma schema", () => {
  it("exposes expected models", () => {
    const client = new PrismaClient();
    expect(client).toHaveProperty("spot");
    expect(client).toHaveProperty("report");
    expect(client).toHaveProperty("sourceReport");
    expect(client).toHaveProperty("sourceBlock");
    expect(client).toHaveProperty("consolidatedBlock");
    expect(client).toHaveProperty("session");
  });
});
```

- [ ] **Step 2: Create Prisma schema**

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum SourceProvider {
  WINDGURU
  SURFLINE
  SURF_FORECAST
  OTHER
}

enum WindType {
  GLASSY
  OFFSHORE
  ONSHORE
  CROSSSHORE
}

model Spot {
  id          String          @id @default(cuid())
  name        String
  region      String?
  country     String?
  isActive    Boolean         @default(true)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  sourceUrls  SpotSourceUrl[]
  reports     Report[]
  sessions    Session[]
}

model SpotSourceUrl {
  id        String         @id @default(cuid())
  spotId    String
  source    SourceProvider
  url       String
  isActive  Boolean        @default(true)
  createdAt DateTime       @default(now())

  spot      Spot           @relation(fields: [spotId], references: [id])

  @@index([spotId])
}

model Report {
  id              String               @id @default(cuid())
  spotId          String
  date            DateTime
  analysisBrief   String?

  energyKj        Float?
  swellHeight     Float?
  swellPeriod     Float?
  swellDirection  String?

  windSpeed       Float?
  windDirection   String?
  windType        WindType?

  tide            String?
  bestWindowStart DateTime?
  bestWindowEnd   DateTime?

  createdAt       DateTime             @default(now())
  updatedAt       DateTime             @updatedAt

  spot            Spot                 @relation(fields: [spotId], references: [id])
  sourceReports   SourceReport[]
  consolidated    ConsolidatedBlock[]
  sessions        Session[]

  @@unique([spotId, date])
  @@index([spotId, date])
}

model SourceReport {
  id        String         @id @default(cuid())
  reportId  String
  source    SourceProvider
  sourceUrl String
  notes     String?
  createdAt DateTime       @default(now())

  report    Report         @relation(fields: [reportId], references: [id])
  blocks    SourceBlock[]

  @@unique([reportId, source])
  @@index([reportId])
}

model SourceBlock {
  id             String       @id @default(cuid())
  sourceReportId String
  timeStart      DateTime
  timeEnd        DateTime

  energyKj       Float?
  swellHeight    Float?
  swellPeriod    Float?
  swellDirection String?

  windSpeed      Float?
  windDirection  String?
  windType       WindType?

  tide           String?
  rawPayload     Json?

  sourceReport   SourceReport @relation(fields: [sourceReportId], references: [id])

  @@unique([sourceReportId, timeStart, timeEnd])
  @@index([sourceReportId, timeStart])
}

model ConsolidatedBlock {
  id             String      @id @default(cuid())
  reportId       String
  timeStart      DateTime
  timeEnd        DateTime

  energyKj       Float?
  swellHeight    Float?
  swellPeriod    Float?
  swellDirection String?

  windSpeed      Float?
  windDirection  String?
  windType       WindType?

  tide           String?
  sourcesUsed    Json?

  report         Report       @relation(fields: [reportId], references: [id])

  @@unique([reportId, timeStart, timeEnd])
  @@index([reportId, timeStart])
}

model Session {
  id        String   @id @default(cuid())
  spotId    String
  reportId  String?
  date      DateTime
  startTime DateTime?
  endTime   DateTime?
  rating    Int?
  notes     String?
  createdAt DateTime @default(now())

  spot      Spot     @relation(fields: [spotId], references: [id])
  report    Report?  @relation(fields: [reportId], references: [id])

  @@index([spotId, date])
}
```

- [ ] **Step 3: Generate Prisma client**

Run: `pnpm prisma:generate`
Expected: Prisma client generated.

- [ ] **Step 4: Run schema tests (expect fail until client generated)**

Run: `pnpm --filter @surf/core test tests/prisma/schema.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma packages/core/tests/prisma/schema.test.ts
 git commit -m "feat: add prisma schema"
```

---

### Task 3: Add Prisma client singleton in core

**Files:**
- Create: `packages/core/src/db/prisma.ts`
- Create: `packages/core/src/db/schema.ts`

- [ ] **Step 1: Add Prisma client singleton**

```ts
// packages/core/src/db/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
```

- [ ] **Step 2: Export basic types/helpers**

```ts
// packages/core/src/db/schema.ts
export { Prisma, WindType, SourceProvider } from "@prisma/client";
```

- [ ] **Step 3: Add minimal smoke test**

```ts
// packages/core/tests/prisma/seed.test.ts
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
```

- [ ] **Step 4: Run tests**

Run: `pnpm --filter @surf/core test tests/prisma/seed.test.ts`
Expected: PASS (requires DATABASE_URL pointing to test db).

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/db packages/core/tests/prisma/seed.test.ts
 git commit -m "feat(core): add prisma client"
```

---

### Task 4: Add migration and env documentation

**Files:**
- Create: `prisma/migrations/*`
- Modify: `apps/dashboard/.env.example`

- [ ] **Step 1: Add DATABASE_URL to example env**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/surf_performance"
```

- [ ] **Step 2: Run migration**

Run: `pnpm prisma:migrate --name init`
Expected: new migration folder under `prisma/migrations/`.

- [ ] **Step 3: Commit**

```bash
git add prisma/migrations apps/dashboard/.env.example
 git commit -m "chore: add initial prisma migration"
```

---

### Task 5: Add basic DB read/write helpers (minimal)

**Files:**
- Create: `packages/core/src/db/reportRepository.ts`
- Create: `packages/core/tests/prisma/repository.test.ts`

- [ ] **Step 1: Add repository functions**

```ts
// packages/core/src/db/reportRepository.ts
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
```

- [ ] **Step 2: Test repository**

```ts
// packages/core/tests/prisma/repository.test.ts
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
```

- [ ] **Step 3: Run tests**

Run: `pnpm --filter @surf/core test tests/prisma/repository.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add packages/core/src/db/reportRepository.ts packages/core/tests/prisma/repository.test.ts
 git commit -m "feat(core): add report repository"
```

---

## Notes / Preconditions
- A running Postgres instance is required for integration tests.
- Set `DATABASE_URL` in the environment before running Prisma or DB tests.

---

## Verification (full)
Run: `COREPACK_HOME=/home/node/.corepack pnpm test`
Expected: PASS (core + dashboard)
