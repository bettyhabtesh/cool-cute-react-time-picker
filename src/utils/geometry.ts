/**
 * Geometry helpers for analog clock interaction.
 *
 * Clock convention:
 * - 12 o'clock is at the top (-90° from standard math angles)
 * - Angles increase clockwise
 */

export interface Point {
  x: number;
  y: number;
}

/** Convert client pointer coords to angle in degrees (0 at 12 o'clock, clockwise). */
export function pointerToClockAngle(
  clientX: number,
  clientY: number,
  centerX: number,
  centerY: number,
): number {
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  // atan2: 0 at +x (3 o'clock), increasing counterclockwise
  const mathDegrees = (Math.atan2(dy, dx) * 180) / Math.PI;
  // Convert to clock degrees: 0 at 12 o'clock, clockwise
  let clockDegrees = (mathDegrees + 90 + 360) % 360;
  return clockDegrees;
}

/** Hour hand angle for a 12-hour face (0–11 map to 0–330°). */
export function hourToAngle(hour: number): number {
  const h = ((hour % 12) + 12) % 12;
  return h * 30;
}

/** Minute (or second) hand angle. */
export function minuteToAngle(minute: number): number {
  const m = ((minute % 60) + 60) % 60;
  return m * 6;
}

/** Convert clock angle to nearest hour on a 12-hour face (1–12, where 0° → 12). */
export function angleToHour(angle: number): number {
  const normalized = ((angle % 360) + 360) % 360;
  let hour = Math.round(normalized / 30) % 12;
  if (hour === 0) hour = 12;
  return hour;
}

/** Convert clock angle to minute 0–59. */
export function angleToMinute(angle: number, step = 1): number {
  const normalized = ((angle % 360) + 360) % 360;
  let minute = Math.round(normalized / 6) % 60;
  if (step > 1) {
    minute = Math.round(minute / step) * step;
    if (minute >= 60) minute = 0;
  }
  return minute;
}

/** Convert clock angle to 24h hour using radius for inner/outer ring (optional). */
export function angleToHour24(
  angle: number,
  options?: { isInnerRing?: boolean },
): number {
  const hour12 = angleToHour(angle);
  if (options?.isInnerRing) {
    // Inner ring: 13–23, 0
    if (hour12 === 12) return 0;
    return hour12 + 12;
  }
  // Outer ring: 1–12 where 12 stays 12 for afternoon UX when selecting daytime;
  // for 24h mode outer represents 1–12
  return hour12 === 12 ? 12 : hour12;
}

export function getClockCenter(element: HTMLElement): Point {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

export function distanceFromCenter(
  clientX: number,
  clientY: number,
  centerX: number,
  centerY: number,
): number {
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  return Math.hypot(dx, dy);
}

/** Polar position for a clock label (percentage of radius from center). */
export function polarToCartesian(
  angleDegrees: number,
  radiusPercent: number,
): { x: number; y: number } {
  const rad = ((angleDegrees - 90) * Math.PI) / 180;
  return {
    x: 50 + radiusPercent * Math.cos(rad),
    y: 50 + radiusPercent * Math.sin(rad),
  };
}
