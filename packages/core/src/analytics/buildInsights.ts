export function buildInsights(input: any) {
  const recs: string[] = [];
  for (const [spot, windows] of Object.entries(input.bestWindows || {})) {
    const w: any = (windows as any[])[0];
    recs.push(`${spot}: buscar vientos <= ${Math.round(w.avgWind)} km/h y periodo ~${Math.round(w.avgPeriod)}s`);
  }
  return { recommendations: recs };
}
