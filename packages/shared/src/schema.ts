export type ValidationResult = { ok: true } | { ok: false; code: string; message: string };

export function isDateString(value: string) {
  return /\d{4}-\d{2}-\d{2}/.test(value);
}

export function validateSurfReport(input: any): ValidationResult {
  if (!input?.spotName) return { ok: false, code: "SPOT_REQUIRED", message: "spotName is required" };
  if (!input?.reportDate || !isDateString(input.reportDate)) {
    return { ok: false, code: "REPORT_DATE_INVALID", message: "reportDate must be YYYY-MM-DD" };
  }
  return { ok: true };
}

export function validateSession(input: any): ValidationResult {
  if (!input?.spotName) return { ok: false, code: "SPOT_REQUIRED", message: "spotName is required" };
  if (!input?.sessionDate || !isDateString(input.sessionDate)) {
    return { ok: false, code: "SESSION_DATE_INVALID", message: "sessionDate must be YYYY-MM-DD" };
  }
  return { ok: true };
}
