import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ClockHand, type HandTipRing } from "./ClockHand";
import { ClockNumbers } from "./ClockNumbers";
import {
  angleToHour,
  angleToHour24,
  angleToMinute,
  distanceFromCenter,
  getClockCenter,
  hourToAngle,
  minuteToAngle,
  pointerToClockAngle,
} from "../../utils/geometry";
import type {
  ClockHandStyle,
  ClockLabelStyle,
  MinuteStep,
  SelectionMode,
  TimeFormat,
} from "../../types";
import { getClockLabels } from "../../utils/time";

/** Fraction of clock radius: closer than this → inner 24h ring. */
const INNER_RING_THRESHOLD = 0.62;

interface AnalogClockProps {
  mode: SelectionMode;
  format: TimeFormat;
  /** 12h: 1–12 face hour. 24h: 0–23. */
  hourValue: number;
  minuteValue: number;
  secondValue?: number;
  minuteStep: MinuteStep;
  secondsStep?: number;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
  onSecondChange?: (second: number) => void;
  onHourCommit?: () => void;
  disabled?: boolean;
  labelStyle?: ClockLabelStyle;
  handStyle?: ClockHandStyle;
}

function isInnerHour24(hour: number): boolean {
  return hour === 0 || hour >= 13;
}

export const AnalogClock = memo(function AnalogClock({
  mode,
  format,
  hourValue,
  minuteValue,
  secondValue = 0,
  minuteStep,
  secondsStep = 1,
  onHourChange,
  onMinuteChange,
  onSecondChange,
  onHourCommit,
  disabled,
  labelStyle = "all",
  handStyle = "round",
}: AnalogClockProps) {
  const clockRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragMode = useRef(mode);

  const is24HourFace = format === "24h" && mode === "hour";
  const activeMode = mode === "second" ? "minute" : mode;
  const labels = getClockLabels(activeMode, { format, minuteStep });

  const angle =
    mode === "hour"
      ? hourToAngle(hourValue)
      : mode === "second"
        ? minuteToAngle(secondValue)
        : minuteToAngle(minuteValue);

  const tipRing: HandTipRing =
    is24HourFace && isInnerHour24(hourValue) ? "inner" : "outer";

  const selectedNumber =
    mode === "hour"
      ? hourValue
      : mode === "second"
        ? secondValue
        : minuteValue;

  const applyAngle = useCallback(
    (clientX: number, clientY: number, commitHour = false) => {
      const el = clockRef.current;
      if (!el) return;
      const center = getClockCenter(el);
      const a = pointerToClockAngle(clientX, clientY, center.x, center.y);
      const current = dragMode.current;

      if (current === "hour") {
        if (format === "24h") {
          const half = el.getBoundingClientRect().width / 2;
          const dist = distanceFromCenter(clientX, clientY, center.x, center.y);
          const isInnerRing = dist < half * INNER_RING_THRESHOLD;
          onHourChange(angleToHour24(a, { isInnerRing }));
        } else {
          onHourChange(angleToHour(a));
        }
        if (commitHour) onHourCommit?.();
      } else if (current === "second") {
        onSecondChange?.(angleToMinute(a, secondsStep));
      } else {
        onMinuteChange(angleToMinute(a, 1));
      }
    },
    [
      format,
      secondsStep,
      onHourChange,
      onMinuteChange,
      onSecondChange,
      onHourCommit,
    ],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest(".ctp-number")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragMode.current = mode;
    setDragging(true);
    applyAngle(e.clientX, e.clientY);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || disabled) return;
    applyAngle(e.clientX, e.clientY);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    applyAngle(e.clientX, e.clientY, dragMode.current === "hour");
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const handleNumberSelect = (value: number) => {
    if (mode === "hour") {
      onHourChange(value);
      onHourCommit?.();
    } else if (mode === "second") {
      onSecondChange?.(value);
    } else {
      onMinuteChange(value);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const step = mode === "hour" ? 1 : mode === "second" ? secondsStep : minuteStep;

    const bump = (delta: number) => {
      e.preventDefault();
      if (mode === "hour") {
        if (format === "24h") {
          onHourChange((hourValue + delta + 24) % 24);
        } else {
          let h = hourValue % 12;
          if (hourValue === 12 || hourValue === 0) h = 0;
          h = (h + delta + 12) % 12;
          onHourChange(h === 0 ? 12 : h);
        }
      } else if (mode === "second") {
        const s = (secondValue + delta * step + 60) % 60;
        onSecondChange?.(s);
      } else {
        let m = (minuteValue + delta * step + 60) % 60;
        if (minuteStep > 1) {
          m = Math.round(m / minuteStep) * minuteStep;
          if (m >= 60) m = 0;
        }
        onMinuteChange(m);
      }
    };

    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        bump(1);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        bump(-1);
        break;
      case "Home":
        e.preventDefault();
        if (mode === "hour") onHourChange(format === "24h" ? 0 : 12);
        else if (mode === "second") onSecondChange?.(0);
        else onMinuteChange(0);
        break;
      case "End":
        e.preventDefault();
        if (mode === "hour") onHourChange(format === "24h" ? 23 : 6);
        else if (mode === "second")
          onSecondChange?.(Math.max(0, 60 - secondsStep));
        else onMinuteChange(Math.max(0, 60 - minuteStep));
        break;
      case "Enter":
      case " ":
        if (mode === "hour") {
          e.preventDefault();
          onHourCommit?.();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!dragging) dragMode.current = mode;
  }, [mode, dragging]);

  const ticks =
    activeMode === "minute"
      ? Array.from({ length: 12 }, (_, i) => i * 30)
      : [];

  const ariaHourNow =
    format === "24h"
      ? hourValue
      : hourValue === 0
        ? 12
        : hourValue > 12
          ? hourValue - 12
          : hourValue;

  return (
    <div className="ctp-clock-wrap">
      <div
        ref={clockRef}
        className="ctp-clock"
        data-mode={mode}
        data-format={format}
        data-hand-style={handStyle}
        data-tip-ring={tipRing}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={mode === "hour" ? (format === "24h" ? 0 : 1) : 0}
        aria-valuemax={mode === "hour" ? (format === "24h" ? 23 : 12) : 59}
        aria-valuenow={
          mode === "hour"
            ? ariaHourNow
            : mode === "second"
              ? secondValue
              : minuteValue
        }
        aria-valuetext={
          mode === "hour"
            ? `Hour ${hourValue}`
            : mode === "second"
              ? `Second ${secondValue}`
              : `Minute ${minuteValue}`
        }
        aria-label={
          mode === "hour"
            ? "Hour selection clock"
            : mode === "second"
              ? "Second selection clock"
              : "Minute selection clock"
        }
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        {ticks.map((tickAngle) => (
          <span
            key={tickAngle}
            className="ctp-tick"
            style={{ transform: `rotate(${tickAngle}deg)` }}
            aria-hidden="true"
          />
        ))}
        <ClockHand
          angle={angle}
          dragging={dragging}
          handStyle={handStyle}
          tipRing={tipRing}
        />
        <span className="ctp-clock-center" aria-hidden="true" />
        <ClockNumbers
          labels={labels}
          selected={selectedNumber}
          mode={activeMode}
          onSelect={handleNumberSelect}
          disabled={disabled}
          labelStyle={labelStyle}
          format={format}
        />
      </div>
    </div>
  );
});
