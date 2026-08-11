import { memo } from "react";
import { hourToAngle, polarToCartesian } from "../../utils/geometry";
import { pad2 } from "../../utils/time";
import type { ClockLabelStyle, TimeFormat } from "../../types";

interface ClockNumbersProps {
  labels: number[];
  selected: number;
  mode: "hour" | "minute";
  onSelect: (value: number) => void;
  disabled?: boolean;
  /** Radius as % of clock face from center (single-ring modes). */
  radius?: number;
  labelStyle?: ClockLabelStyle;
  /** When `"24h"` and hour mode, render outer 1–12 + inner 13–23/00. */
  format?: TimeFormat;
}

const CARDINAL_HOURS = new Set([12, 3, 6, 9]);
const CARDINAL_MINUTES = new Set([0, 15, 30, 45]);
const CARDINAL_HOURS_INNER = new Set([0, 15, 18, 21]);

/** Outer ring hours (1–12). */
const OUTER_HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
/** Inner ring hours (13–23, 00) aligned under 1–12. */
const INNER_HOURS = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

export const OUTER_HOUR_RADIUS = 38;
export const INNER_HOUR_RADIUS = 24;

function isCardinalLabel(
  mode: "hour" | "minute",
  label: number,
  ring: "outer" | "inner" | "single",
): boolean {
  if (mode === "minute") return CARDINAL_MINUTES.has(label);
  if (ring === "inner") return CARDINAL_HOURS_INNER.has(label);
  return CARDINAL_HOURS.has(label === 0 ? 12 : label);
}

function formatHourLabel(label: number): string {
  if (label === 0) return "00";
  return String(label);
}

export const ClockNumbers = memo(function ClockNumbers({
  labels,
  selected,
  mode,
  onSelect,
  disabled,
  radius = OUTER_HOUR_RADIUS,
  labelStyle = "all",
  format = "12h",
}: ClockNumbersProps) {
  const dualRing = mode === "hour" && format === "24h";

  if (dualRing) {
    return (
      <>
        {OUTER_HOURS.map((label) => {
          const angle = hourToAngle(label);
          const { x, y } = polarToCartesian(angle, OUTER_HOUR_RADIUS);
          const showDigit =
            labelStyle === "all" || isCardinalLabel("hour", label, "outer");
          const isSelected = selected === label;

          return (
            <button
              key={`hour-outer-${label}`}
              type="button"
              className={[
                "ctp-number",
                "ctp-number-outer",
                labelStyle === "cardinal" && !showDigit ? "ctp-number-mark" : "",
                labelStyle === "cardinal" && showDigit ? "ctp-number-cardinal" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ left: `${x}%`, top: `${y}%` }}
              aria-label={`Hour ${label}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(label);
              }}
            >
              {showDigit ? formatHourLabel(label) : "–"}
            </button>
          );
        })}
        {INNER_HOURS.map((label) => {
          const angle = hourToAngle(label === 0 ? 12 : label);
          const { x, y } = polarToCartesian(angle, INNER_HOUR_RADIUS);
          const showDigit =
            labelStyle === "all" || isCardinalLabel("hour", label, "inner");
          const isSelected = selected === label;

          return (
            <button
              key={`hour-inner-${label}`}
              type="button"
              className={[
                "ctp-number",
                "ctp-number-inner",
                labelStyle === "cardinal" && !showDigit ? "ctp-number-mark" : "",
                labelStyle === "cardinal" && showDigit ? "ctp-number-cardinal" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ left: `${x}%`, top: `${y}%` }}
              aria-label={`Hour ${pad2(label)}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(label);
              }}
            >
              {showDigit ? formatHourLabel(label) : "–"}
            </button>
          );
        })}
      </>
    );
  }

  const highlighted =
    mode === "hour"
      ? selected === 0
        ? 12
        : ((selected - 1) % 12) + 1
      : labels.includes(selected)
        ? selected
        : null;

  return (
    <>
      {labels.map((label) => {
        const angle = mode === "hour" ? hourToAngle(label) : label * 6;
        const { x, y } = polarToCartesian(angle, radius);
        const isSelected =
          mode === "hour"
            ? selected % 12 === label % 12 || (selected === 0 && label === 12)
            : highlighted === label;

        const showDigit =
          labelStyle === "all" || isCardinalLabel(mode, label, "single");

        const display = showDigit
          ? mode === "minute"
            ? pad2(label)
            : formatHourLabel(label)
          : "–";

        return (
          <button
            key={`${mode}-${label}`}
            type="button"
            className={[
              "ctp-number",
              labelStyle === "cardinal" && !showDigit ? "ctp-number-mark" : "",
              labelStyle === "cardinal" && showDigit ? "ctp-number-cardinal" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-label={
              mode === "hour" ? `Hour ${label}` : `Minute ${pad2(label)}`
            }
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(label);
            }}
          >
            {display}
          </button>
        );
      })}
    </>
  );
});
