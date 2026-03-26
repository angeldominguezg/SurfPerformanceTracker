export type SurfReportInput = {
  spotName: string;
  reportDate: string; // YYYY-MM-DD
  waveHeightFt?: number;
  swellPeriodS?: number;
  swellDirectionDeg?: number;
  windSpeedKmh?: number;
  windDirectionDeg?: number;
  tideState?: string;
  source?: string;
};

export type SessionInput = {
  spotName: string;
  sessionDate: string; // YYYY-MM-DD
  boardType?: string;
  subjectiveScore?: number; // 1-10
  notes?: string;
  watchMetrics?: WatchMetricsInput;
};

export type WatchMetricsInput = {
  durationMin?: number;
  activeCalories?: number;
  avgHeartRate?: number;
  distanceKm?: number;
};

export type ForecastSource = "open-meteo" | "stormglass" | "scrape";
