import { WatchMetricsInput } from "@surf/shared";

export async function ingestWatchMetrics(client: any, sessionId: string, input: WatchMetricsInput) {
  const result = await client.from("watch_metrics").insert({
    session_id: sessionId,
    duration_min: input.durationMin,
    active_calories: input.activeCalories,
    avg_heart_rate: input.avgHeartRate,
    distance_km: input.distanceKm
  });
  const { data, error } = typeof result.select === "function" ? await result.select("id") : result;
  if (error) throw error;
  return data?.[0]?.id;
}
