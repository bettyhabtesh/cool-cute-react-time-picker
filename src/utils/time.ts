import type { Meridiem, MinuteStep, ParsedTime, TimeFormat } from "../types";

const TIME_RE = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;

/** Parse `HH:mm` or `HH:mm:ss` into a normalized 24h ParsedTime. */
export function parseTime(value: string | undefined | null): ParsedTime {
  if (!value) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const match = TIME_RE.exec(value.trim());
  if (!match) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = clamp(Number(match[1]), 0, 23);
  const minutes = clamp(Number(match[2]), 0, 59);
  const seconds = clamp(Number(match[3] ?? 0), 0, 59);

  return { hours, minutes, seconds };
}

export function formatTime(
  time: ParsedTime,
  options: { showSeconds?: boolean } = {},
): string {
  const hh = pad2(clamp(time.hours, 0, 23));
  const mm = pad2(clamp(time.minutes, 0, 59));
  if (options.showSeconds) {
    return `${hh}:${mm}:${pad2(clamp(time.seconds, 0, 59))}`;
  }
  return `${hh}:${mm}`;
}

export function to12Hour(hours24: number): { hour12: number; meridiem: Meridiem } {
  const meridiem: Meridiem = hours24 >= 12 ? "PM" : "AM";
  let hour12 = hours24 % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12, meridiem };
}

export function to24Hour(hour12: number, meridiem: Meridiem): number {
  const h = clamp(hour12, 1, 12);
  if (meridiem === "AM") {
    return h === 12 ? 0 : h;
  }
  return h === 12 ? 12 : h + 12;
}

export function displayHour(hours24: number, format: TimeFormat): number {
  if (format === "24h") return hours24;
  return to12Hour(hours24).hour12;
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function snapToStep(value: number, step: number, maxExclusive = 60): number {
  if (step <= 1) return clamp(Math.round(value) % maxExclusive, 0, maxExclusive - 1);
  const snapped = Math.round(value / step) * step;
  if (snapped >= maxExclusive) return 0;
  return clamp(snapped, 0, maxExclusive - step);
}

export function getMinuteLabels(step: MinuteStep): number[] {
  const labels: number[] = [];
  for (let m = 0; m < 60; m += step) {
    labels.push(m);
  }
  return labels;
}

/** Clock face labels for hour mode (1–12) or minute mode (step labels). */
export function getClockLabels(
  mode: "hour" | "minute",
  options: { format: TimeFormat; minuteStep: MinuteStep },
): number[] {
  if (mode === "hour") {
    if (options.format === "24h") {
      // Outer ring style still uses 1–12 for primary interaction; 0/13–23 via drag angle
      return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }
    return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }

  // For minuteStep 1, show every 5 for readability; drag still selects any minute
  const step = options.minuteStep === 1 ? 5 : options.minuteStep;
  return getMinuteLabels(step as MinuteStep);
}

export function timeToMinutes(time: ParsedTime): number {
  return time.hours * 60 + time.minutes;
}

export function isTimeInRange(
  time: ParsedTime,
  minTime?: string,
  maxTime?: string,
): boolean {
  const current = timeToMinutes(time);
  if (minTime) {
    const min = timeToMinutes(parseTime(minTime));
    if (current < min) return false;
  }
  if (maxTime) {
    const max = timeToMinutes(parseTime(maxTime));
    if (current > max) return false;
  }
  return true;
}

export function clampTimeToRange(
  time: ParsedTime,
  minTime?: string,
  maxTime?: string,
): ParsedTime {
  let result = { ...time };
  if (minTime) {
    const min = parseTime(minTime);
    if (timeToMinutes(result) < timeToMinutes(min)) {
      result = { ...min, seconds: result.seconds };
    }
  }
  if (maxTime) {
    const max = parseTime(maxTime);
    if (timeToMinutes(result) > timeToMinutes(max)) {
      result = { ...max, seconds: result.seconds };
    }
  }
  return result;
}

export function compareTimes(a: ParsedTime, b: ParsedTime): number {
  return timeToMinutes(a) - timeToMinutes(b);
}

export function withHour(time: ParsedTime, hours: number): ParsedTime {
  return { ...time, hours: clamp(hours, 0, 23) };
}

export function withMinute(time: ParsedTime, minutes: number): ParsedTime {
  return { ...time, minutes: clamp(minutes, 0, 59) };
}

export function withMeridiem(time: ParsedTime, meridiem: Meridiem): ParsedTime {
  const { hour12 } = to12Hour(time.hours);
  return { ...time, hours: to24Hour(hour12, meridiem) };
}
