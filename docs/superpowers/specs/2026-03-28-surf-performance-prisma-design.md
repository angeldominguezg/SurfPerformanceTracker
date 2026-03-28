# Surf Performance Tracker — Prisma + Postgres Design

## Summary
Implement Prisma ORM backed by Postgres to persist surf forecast history, source-level data, 2‑hour blocks, consolidated blocks, and user sessions. The data model centers on **Spot → Report (per day)** with per‑source and consolidated block detail.

## Goals
- Persist daily reports per spot with summary metrics and analysis.
- Store per‑source data blocks in 2‑hour intervals.
- Store consolidated 2‑hour blocks derived from multiple sources.
- Persist user surf sessions linked to a report/day.
- Support queries for historico (by spot/date) and session tracking.

## Non‑Goals
- Implement the scraper/ETL logic for each provider (handled separately).
- Build the UI for historico/registro (future work).
- Implement advanced analytics or recommendation logic beyond storage.

## Entities & Relationships

### Spot
Represents a surf spot.
- Fields: `id`, `name`, `region`, `country`, `isActive`, `createdAt`, `updatedAt`
- Relations: `SpotSourceUrl[]`, `Report[]`, `Session[]`

### SpotSourceUrl
Stores reference URLs per spot and provider.
- Fields: `id`, `spotId`, `source` (enum), `url`, `isActive`, `createdAt`
- Relation: belongs to `Spot`

### Report (per spot, per day)
Daily summary for a spot.
- Fields: `id`, `spotId`, `date`, `analysisBrief`
- Summary metrics: `energyKj`, `swellHeight`, `swellPeriod`, `swellDirection`, `windSpeed`, `windDirection`, `windType`, `tide`, `bestWindowStart`, `bestWindowEnd`
- Relations: `SourceReport[]`, `ConsolidatedBlock[]`, `Session[]`

### SourceReport (per source, per day)
Stores a provider’s data for a given spot/day.
- Fields: `id`, `reportId`, `source`, `sourceUrl`, `notes`, `createdAt`
- Relations: `SourceBlock[]`

### SourceBlock (2‑hour blocks per source)
Raw 2‑hour blocks for a source.
- Fields: `id`, `sourceReportId`, `timeStart`, `timeEnd`
- Metrics: `energyKj`, `swellHeight`, `swellPeriod`, `swellDirection`, `windSpeed`, `windDirection`, `windType`, `tide`
- `rawPayload` (JSONB optional for extra provider fields)

### ConsolidatedBlock (2‑hour blocks per day)
Merged 2‑hour blocks from multiple sources.
- Fields: `id`, `reportId`, `timeStart`, `timeEnd`
- Metrics: same as `SourceBlock`
- `sourcesUsed` (JSONB list of sources + confidence)

### Session
A user surf session.
- Fields: `id`, `spotId`, `reportId`, `date`, `startTime`, `endTime`, `rating`, `notes`, `createdAt`

## Constraints & Indexes
- Unique:
  - `Report`: (`spotId`, `date`)
  - `SourceReport`: (`reportId`, `source`)
  - `SourceBlock`: (`sourceReportId`, `timeStart`, `timeEnd`)
  - `ConsolidatedBlock`: (`reportId`, `timeStart`, `timeEnd`)
- Indexes:
  - `Report(spotId, date)`
  - `ConsolidatedBlock(reportId, timeStart)`
  - `SourceBlock(sourceReportId, timeStart)`
  - `Session(spotId, date)`

## Data Flow (Storage)
1. **Ingest per source**: for each spot/day, create or update `SourceReport` and its `SourceBlock` rows (2‑hour intervals).
2. **Consolidation**: for each 2‑hour window, compute consolidated values and store `ConsolidatedBlock` with `sourcesUsed`.
3. **Daily summary**: compute day‑level metrics and store in `Report` with `analysisBrief` and best window.
4. **Session logging**: user registers a surf session; link `Session` to `Spot` and the day’s `Report`.

## Prisma Integration
- Use Postgres via `DATABASE_URL`.
- Install `prisma` and `@prisma/client` at the workspace root (monorepo).
- Create `prisma/schema.prisma` with the models above.
- Run migrations from repo root.

## Open Questions (for implementation phase)
- Consolidation algorithm details (e.g., priority or weighting by source).
- Whether to persist raw HTML/JSON snapshots for debugging.

## Acceptance Criteria
- Prisma schema reflects the entities/relations above.
- Migrations create all tables with the specified constraints and indexes.
- Able to create:
  - a `Spot` with URLs,
  - a daily `Report`,
  - `SourceReport` + `SourceBlock` rows,
  - `ConsolidatedBlock` rows,
  - a `Session` linked to the `Report`.
