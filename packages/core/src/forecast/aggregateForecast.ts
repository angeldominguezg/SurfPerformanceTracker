export function aggregateForecast(rows: { waveHeightFt: number }[]) {
  const avg = rows.reduce((s, r) => s + r.waveHeightFt, 0) / (rows.length || 1);
  return { avgWaveHeightFt: avg };
}
