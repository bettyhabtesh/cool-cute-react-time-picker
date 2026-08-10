import { describe, expect, it } from "vitest";
import {
  clampTimeToRange,
  displayHour,
  formatTime,
  isTimeInRange,
  parseTime,
  snapToStep,
  to12Hour,
  to24Hour,
  withMeridiem,
} from "../utils/time";

describe("parseTime", () => {
  it("parses HH:mm", () => {
    expect(parseTime("07:30")).toEqual({ hours: 7, minutes: 30, seconds: 0 });
  });

  it("parses HH:mm:ss", () => {
    expect(parseTime("19:05:09")).toEqual({ hours: 19, minutes: 5, seconds: 9 });
  });

  it("falls back for invalid input", () => {
    expect(parseTime("nope")).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    expect(parseTime(undefined)).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });
});

describe("formatTime", () => {
  it("formats without seconds", () => {
    expect(formatTime({ hours: 7, minutes: 5, seconds: 0 })).toBe("07:05");
  });

  it("formats with seconds", () => {
    expect(
      formatTime({ hours: 19, minutes: 30, seconds: 8 }, { showSeconds: true }),
    ).toBe("19:30:08");
  });
});

describe("12h / 24h conversion", () => {
  it("converts to 12-hour", () => {
    expect(to12Hour(0)).toEqual({ hour12: 12, meridiem: "AM" });
    expect(to12Hour(7)).toEqual({ hour12: 7, meridiem: "AM" });
    expect(to12Hour(12)).toEqual({ hour12: 12, meridiem: "PM" });
    expect(to12Hour(19)).toEqual({ hour12: 7, meridiem: "PM" });
  });

  it("converts to 24-hour", () => {
    expect(to24Hour(12, "AM")).toBe(0);
    expect(to24Hour(7, "AM")).toBe(7);
    expect(to24Hour(12, "PM")).toBe(12);
    expect(to24Hour(7, "PM")).toBe(19);
  });

  it("displayHour respects format", () => {
    expect(displayHour(19, "12h")).toBe(7);
    expect(displayHour(19, "24h")).toBe(19);
    expect(displayHour(0, "12h")).toBe(12);
  });

  it("withMeridiem flips period", () => {
    expect(withMeridiem({ hours: 7, minutes: 30, seconds: 0 }, "PM")).toEqual({
      hours: 19,
      minutes: 30,
      seconds: 0,
    });
  });
});

describe("snapToStep / minuteStep", () => {
  it("snaps to 5-minute steps", () => {
    expect(snapToStep(7, 5)).toBe(5);
    expect(snapToStep(8, 5)).toBe(10);
    expect(snapToStep(58, 5)).toBe(0);
  });

  it("keeps exact minutes for step 1", () => {
    expect(snapToStep(17, 1)).toBe(17);
  });
});

describe("minTime / maxTime", () => {
  it("detects range membership", () => {
    const t = parseTime("10:00");
    expect(isTimeInRange(t, "09:00", "17:00")).toBe(true);
    expect(isTimeInRange(t, "11:00", "17:00")).toBe(false);
  });

  it("clamps into range", () => {
    expect(clampTimeToRange(parseTime("08:00"), "09:00", "17:00")).toEqual({
      hours: 9,
      minutes: 0,
      seconds: 0,
    });
    expect(clampTimeToRange(parseTime("20:00"), "09:00", "17:00")).toEqual({
      hours: 17,
      minutes: 0,
      seconds: 0,
    });
  });
});
