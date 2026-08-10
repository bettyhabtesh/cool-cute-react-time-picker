import { describe, expect, it } from "vitest";
import {
  angleToHour,
  angleToMinute,
  hourToAngle,
  minuteToAngle,
  pointerToClockAngle,
} from "../utils/geometry";

describe("hour / minute angles", () => {
  it("maps hours to angles", () => {
    expect(hourToAngle(12)).toBe(0);
    expect(hourToAngle(3)).toBe(90);
    expect(hourToAngle(6)).toBe(180);
    expect(hourToAngle(9)).toBe(270);
  });

  it("maps minutes to angles", () => {
    expect(minuteToAngle(0)).toBe(0);
    expect(minuteToAngle(15)).toBe(90);
    expect(minuteToAngle(30)).toBe(180);
    expect(minuteToAngle(45)).toBe(270);
  });

  it("converts angles back to hours (12 at top)", () => {
    expect(angleToHour(0)).toBe(12);
    expect(angleToHour(90)).toBe(3);
    expect(angleToHour(180)).toBe(6);
    expect(angleToHour(270)).toBe(9);
  });

  it("converts angles back to minutes with step", () => {
    expect(angleToMinute(0)).toBe(0);
    expect(angleToMinute(90)).toBe(15);
    expect(angleToMinute(33, 5)).toBe(5);
    expect(angleToMinute(36, 5)).toBe(5);
  });
});

describe("pointerToClockAngle", () => {
  it("returns 0° for a point above center (12 o'clock)", () => {
    expect(pointerToClockAngle(100, 50, 100, 100)).toBeCloseTo(0, 5);
  });

  it("returns 90° for a point to the right (3 o'clock)", () => {
    expect(pointerToClockAngle(150, 100, 100, 100)).toBeCloseTo(90, 5);
  });

  it("returns 180° for a point below center (6 o'clock)", () => {
    expect(pointerToClockAngle(100, 150, 100, 100)).toBeCloseTo(180, 5);
  });
});
