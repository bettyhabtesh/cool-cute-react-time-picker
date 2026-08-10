import { memo } from "react";
import { polarToCartesian } from "../../utils/geometry";
import { pad2 } from "../../utils/time";
import type { ClockLabelStyle } from "../../types";

interface ClockNumbersProps {
  labels: number[];
  selected: number;
  mode: "hour" | "minute";
  onSelect: (value: number) => void;
  disabled?: boolean;
  /** Radius as % of clock face from center. */
  radius?: number;
  labelStyle?: ClockLabelStyle;
}

const CARDINAL_HOURS = new Set([12, 3, 6, 9]);
const CARDINAL_MINUTES = new Set([0, 15, 30, 45]);

function nearestLabel(labels: number[], selected: number): number {
  return labels.reduce((best, cur) =>
    Math.abs(cur - selected) < Math.abs(best - selected) ? cur : best,
  );
}

function isCardinalLabel(mode: "hour" | "minute", label: number): boolean {
  if (mode === "hour") {
    return CARDINAL_HOURS.has(label === 0 ? 12 : label);
  }
  return CARDINAL_MINUTES.has(label);
}

export const ClockNumbers = memo(function ClockNumbers({
  labels,
  selected,
  mode,
  onSelect,
  disabled,
  radius = 38,
  labelStyle = "all",
}: ClockNumbersProps) {
  const highlighted =
    mode === "hour"
      ? selected === 0
        ? 12
        : ((selected - 1) % 12) + 1
      : labels.includes(selected)
        ? selected
        : nearestLabel(labels, selected);

  return (
    <>
      {labels.map((label) => {
        const angle = mode === "hour" ? (label % 12) * 30 : label * 6;
        const { x, y } = polarToCartesian(angle, radius);
        const isSelected =
          mode === "hour"
            ? selected % 12 === label % 12 || (selected === 0 && label === 12)
            : highlighted === label;

        const showDigit =
          labelStyle === "all" || isCardinalLabel(mode, label);

        const display = showDigit
          ? mode === "minute"
            ? pad2(label)
            : String(label)
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
            aria-label={mode === "hour" ? `Hour ${label}` : `Minute ${pad2(label)}`}
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
