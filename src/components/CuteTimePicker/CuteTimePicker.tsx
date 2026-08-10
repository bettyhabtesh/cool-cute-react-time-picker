import {
  useCallback,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import type { CuteTimePickerProps, Meridiem, ParsedTime, SelectionMode } from "../../types";
import { builtInThemes, defaultTheme } from "../../themes";
import { resolveTheme, themeToCssVars } from "../../utils/theme";
import {
  clampTimeToRange,
  displayHour,
  formatTime,
  parseTime,
  snapToStep,
  to12Hour,
  withHour,
  withMeridiem,
  withMinute,
} from "../../utils/time";
import { AnalogClock } from "./AnalogClock";
import { AmPmSelector } from "./AmPmSelector";
import { TimeDisplay } from "./TimeDisplay";
import { TimePickerActions } from "./TimePickerActions";
import { ThemeDecorations } from "./ThemeDecorations";

import "../../styles/base.css";
import "../../styles/themes.css";

function useControllableTime(
  value: string | undefined,
  defaultValue: string | undefined,
  onChange: ((time: string) => void) | undefined,
  showSeconds: boolean,
  minTime?: string,
  maxTime?: string,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<ParsedTime>(() =>
    parseTime(defaultValue ?? value ?? "07:30"),
  );

  const parsed = isControlled ? parseTime(value) : internal;

  const setTime = useCallback(
    (next: ParsedTime) => {
      const clamped = clampTimeToRange(next, minTime, maxTime);
      if (!isControlled) setInternal(clamped);
      onChange?.(formatTime(clamped, { showSeconds }));
    },
    [isControlled, minTime, maxTime, onChange, showSeconds],
  );

  return { time: parsed, setTime, isControlled };
}

export function CuteTimePicker({
  value,
  defaultValue = "07:30",
  onChange,
  onConfirm,
  onCancel,
  theme: themeInput = "blush-bloom",
  format = "12h",
  minuteStep = 5,
  showActions = true,
  cancelLabel = "Cancel",
  confirmLabel = "Done",
  disabled = false,
  minTime,
  maxTime,
  className,
  style,
  size = "md",
  showSeconds = false,
  secondsStep = 1,
  decorations = true,
  "aria-label": ariaLabel = "Time picker",
  onEscape,
}: CuteTimePickerProps) {
  const titleId = useId();
  const { time, setTime } = useControllableTime(
    value,
    defaultValue,
    onChange,
    showSeconds,
    minTime,
    maxTime,
  );

  const [mode, setMode] = useState<SelectionMode>("hour");

  const theme = useMemo(
    () => resolveTheme(themeInput, builtInThemes, defaultTheme),
    [themeInput],
  );

  const cssVars = useMemo(() => themeToCssVars(theme), [theme]);
  const { hour12, meridiem } = to12Hour(time.hours);
  const shownHour = displayHour(time.hours, format);

  const emit = useCallback(
    (next: ParsedTime) => {
      setTime(next);
    },
    [setTime],
  );

  const handleHourChange = useCallback(
    (hourFace: number) => {
      // hourFace is 1–12 from clock
      if (format === "12h") {
        emit(withHour(time, (() => {
          const { meridiem: m } = to12Hour(time.hours);
          if (m === "AM") return hourFace === 12 ? 0 : hourFace;
          return hourFace === 12 ? 12 : hourFace + 12;
        })()));
      } else {
        // Preserve afternoon/night offset when picking on 12-face in 24h
        const wasPm = time.hours >= 12;
        let h = hourFace === 12 ? 0 : hourFace;
        if (wasPm && h !== 0) h = h + 12;
        if (wasPm && hourFace === 12) h = 12;
        if (!wasPm && hourFace === 12) h = 0;
        // For daytime 12h face in 24h mode, noon/midnight are ambiguous — use current period
        emit(withHour(time, h));
      }
    },
    [emit, format, time],
  );

  const handleMinuteChange = useCallback(
    (minute: number) => {
      emit(withMinute(time, snapToStep(minute, minuteStep)));
    },
    [emit, minuteStep, time],
  );

  const handleSecondChange = useCallback(
    (second: number) => {
      emit({ ...time, seconds: snapToStep(second, secondsStep) });
    },
    [emit, secondsStep, time],
  );

  const handleHourCommit = useCallback(() => {
    setMode("minute");
  }, []);

  const handleMeridiem = useCallback(
    (next: Meridiem) => {
      emit(withMeridiem(time, next));
    },
    [emit, time],
  );

  const handleConfirm = useCallback(() => {
    const formatted = formatTime(time, { showSeconds });
    onConfirm?.(formatted);
  }, [onConfirm, showSeconds, time]);

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onEscape?.();
      onCancel?.();
    }
  };

  const rootClass = ["ctp-root", className].filter(Boolean).join(" ");

  return (
    <div
      className={rootClass}
      style={{ ...cssVars, ...style }}
      data-theme={theme.id}
      data-size={size}
      data-disabled={disabled}
      data-format={format}
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={titleId}
      onKeyDown={onKeyDown}
    >
      <ThemeDecorations
        kinds={theme.decorations ?? []}
        enabled={decorations}
      />

      <div className="ctp-header">
        <h2 className="ctp-title" id={titleId}>
          Select Time
        </h2>
      </div>

      <div className="ctp-body">
        <div className="ctp-top-row">
          <TimeDisplay
            hour={shownHour}
            minute={time.minutes}
            second={time.seconds}
            showSeconds={showSeconds}
            mode={mode}
            onSelectHour={() => setMode("hour")}
            onSelectMinute={() => setMode("minute")}
            onSelectSecond={() => setMode("second")}
            disabled={disabled}
          />
          {format === "12h" && (
            <AmPmSelector
              value={meridiem}
              onChange={handleMeridiem}
              disabled={disabled}
            />
          )}
        </div>

        <span className="ctp-mode-hint">
          {mode === "hour" ? "Select hour" : mode === "minute" ? "Select minute" : "Select second"}
        </span>

        <AnalogClock
          mode={mode}
          format={format}
          hourValue={format === "12h" ? hour12 : shownHour === 0 ? 12 : shownHour > 12 ? shownHour - 12 : shownHour}
          minuteValue={time.minutes}
          secondValue={time.seconds}
          minuteStep={minuteStep}
          secondsStep={secondsStep}
          onHourChange={handleHourChange}
          onMinuteChange={handleMinuteChange}
          onSecondChange={showSeconds ? handleSecondChange : undefined}
          onHourCommit={handleHourCommit}
          disabled={disabled}
          labelStyle={theme.labelStyle ?? "all"}
        />

        {showActions && (
          <TimePickerActions
            cancelLabel={cancelLabel}
            confirmLabel={confirmLabel}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            disabled={disabled}
            showCancel
          />
        )}
      </div>
    </div>
  );
}
