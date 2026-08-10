import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ClockHand } from "./ClockHand";
import { ClockNumbers } from "./ClockNumbers";
import {
  angleToHour,
  angleToMinute,
  getClockCenter,
  hourToAngle,
  minuteToAngle,
  pointerToClockAngle,
} from "../../utils/geometry";
import type { MinuteStep, SelectionMode, TimeFormat } from "../../types";
import { getClockLabels } from "../../utils/time";

interface AnalogClockProps {
  mode: SelectionMode;
  format: TimeFormat;
  hourValue: number; // display hour (1-12 or 0-23)
  minuteValue: number;
  secondValue?: number;
  minuteStep: MinuteStep;
  secondsStep?: number;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
  onSecondChange?: (second: number) => void;
  onHourCommit?: () => void;
  disabled?: boolean;
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
}: AnalogClockProps) {
  const clockRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragMode = useRef(mode);

  const activeMode = mode === "second" ? "minute" : mode;
  const labels = getClockLabels(activeMode, { format, minuteStep });

  const angle =
    mode === "hour"
      ? hourToAngle(hourValue)
      : mode === "second"
        ? minuteToAngle(secondValue)
        : minuteToAngle(minuteValue);

  const selectedNumber =
    mode === "hour"
      ? hourValue === 0
        ? 12
        : format === "24h" && hourValue > 12
          ? hourValue - 12
          : hourValue > 12
            ? hourValue - 12
            : hourValue
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
        const h = angleToHour(a);
        onHourChange(h);
        if (commitHour) onHourCommit?.();
      } else if (current === "second") {
        onSecondChange?.(angleToMinute(a, secondsStep));
      } else {
        onMinuteChange(angleToMinute(a, minuteStep));
      }
    },
    [minuteStep, secondsStep, onHourChange, onMinuteChange, onSecondChange, onHourCommit],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    // Ignore presses that originate on clock number buttons — they handle selection themselves.
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
        let h = hourValue % 12;
        if (hourValue === 12 || hourValue === 0) h = 0;
        h = (h + delta + 12) % 12;
        onHourChange(h === 0 ? 12 : h);
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
        if (mode === "hour") onHourChange(12);
        else if (mode === "second") onSecondChange?.(0);
        else onMinuteChange(0);
        break;
      case "End":
        e.preventDefault();
        if (mode === "hour") onHourChange(6);
        else if (mode === "second") onSecondChange?.(Math.max(0, 60 - secondsStep));
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

  // Sync drag mode when mode prop changes while not dragging
  useEffect(() => {
    if (!dragging) dragMode.current = mode;
  }, [mode, dragging]);

  const ticks =
    activeMode === "minute"
      ? Array.from({ length: 12 }, (_, i) => i * 30)
      : [];

  return (
    <div className="ctp-clock-wrap">
      <div
        ref={clockRef}
        className="ctp-clock"
        data-mode={mode}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={mode === "hour" ? 1 : 0}
        aria-valuemax={mode === "hour" ? 12 : 59}
        aria-valuenow={
          mode === "hour"
            ? hourValue === 0
              ? 12
              : hourValue > 12
                ? hourValue - 12
                : hourValue
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
        <ClockHand angle={angle} dragging={dragging} />
        <span className="ctp-clock-center" aria-hidden="true" />
        <ClockNumbers
          labels={labels}
          selected={selectedNumber}
          mode={activeMode}
          onSelect={handleNumberSelect}
          disabled={disabled}
        />
      </div>
    </div>
  );
});
