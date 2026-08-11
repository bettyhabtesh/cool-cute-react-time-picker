import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { CuteTimePickerProps, Meridiem, ParsedTime, SelectionMode } from "../../types";
import { builtInThemes, defaultTheme } from "../../themes";
import { resolveTheme, themeToCssVars } from "../../utils/theme";
import {
  clampTimeToRange,
  displayHour,
  formatDisplayTime,
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
import { TimeSelectorTrigger } from "./TimeSelectorTrigger";

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
  showTitle = true,
  title = "Select Time",
  handStyle: handStyleProp,
  labelStyle: labelStyleProp,
  selector = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
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
  const selectorId = useId();
  const fieldRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef<ParsedTime | null>(null);

  const { time, setTime } = useControllableTime(
    value,
    defaultValue,
    onChange,
    showSeconds,
    minTime,
    maxTime,
  );

  const [mode, setMode] = useState<SelectionMode>("hour");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpenControlled = openProp !== undefined;
  const open = selector ? (isOpenControlled ? openProp : internalOpen) : true;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!selector) return;
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [selector, isOpenControlled, onOpenChange],
  );

  const theme = useMemo(
    () => resolveTheme(themeInput, builtInThemes, defaultTheme),
    [themeInput],
  );

  const cssVars = useMemo(() => themeToCssVars(theme), [theme]);
  const { hour12, meridiem } = to12Hour(time.hours);
  const shownHour = displayHour(time.hours, format);
  const displayLabel = formatDisplayTime(time, { format, showSeconds });

  const emit = useCallback(
    (next: ParsedTime) => {
      setTime(next);
    },
    [setTime],
  );

  const openPicker = useCallback(() => {
    if (disabled) return;
    snapshotRef.current = { ...time };
    setMode("hour");
    setOpen(true);
  }, [disabled, time, setOpen]);

  const closePicker = useCallback(
    (restore: boolean) => {
      if (restore && snapshotRef.current) {
        emit(snapshotRef.current);
      }
      snapshotRef.current = null;
      setOpen(false);
    },
    [emit, setOpen],
  );

  const handleHourChange = useCallback(
    (hourFace: number) => {
      if (format === "12h") {
        emit(
          withHour(time, (() => {
            const { meridiem: m } = to12Hour(time.hours);
            if (m === "AM") return hourFace === 12 ? 0 : hourFace;
            return hourFace === 12 ? 12 : hourFace + 12;
          })()),
        );
      } else {
        emit(withHour(time, hourFace));
      }
    },
    [emit, format, time],
  );

  const handleMinuteChange = useCallback(
    (minute: number) => {
      emit(withMinute(time, minute));
    },
    [emit, time],
  );

  const handleTypedHour = useCallback(
    (display: number) => {
      if (format === "12h") {
        const { meridiem: m } = to12Hour(time.hours);
        emit(
          withHour(time, (() => {
            if (m === "AM") return display === 12 ? 0 : display;
            return display === 12 ? 12 : display + 12;
          })()),
        );
      } else {
        emit(withHour(time, display));
      }
      setMode("hour");
    },
    [emit, format, time],
  );

  const handleTypedMinute = useCallback(
    (minute: number) => {
      emit(withMinute(time, minute));
      setMode("minute");
    },
    [emit, time],
  );

  const handleTypedSecond = useCallback(
    (second: number) => {
      emit({ ...time, seconds: snapToStep(second, 1) });
      setMode("second");
    },
    [emit, time],
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
    if (selector) closePicker(false);
  }, [onConfirm, showSeconds, time, selector, closePicker]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    if (selector) closePicker(true);
  }, [onCancel, selector, closePicker]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onEscape?.();
      if (selector && open) {
        closePicker(true);
        onCancel?.();
      } else {
        onCancel?.();
      }
    }
  };

  useEffect(() => {
    if (!selector || !open || disabled) return;

    const onPointerDown = (event: PointerEvent) => {
      const root = fieldRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        closePicker(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [selector, open, disabled, closePicker]);

  const picker = (
    <div
      className={selector ? "ctp-root ctp-root--popover" : ["ctp-root", className].filter(Boolean).join(" ")}
      style={selector ? undefined : { ...cssVars, ...style }}
      data-theme={theme.id}
      data-size={size}
      data-disabled={disabled}
      data-format={format}
      role={selector ? "dialog" : "group"}
      aria-modal={selector ? true : undefined}
      aria-label={ariaLabel}
      aria-labelledby={showTitle ? titleId : undefined}
      onKeyDown={onKeyDown}
    >
      <ThemeDecorations
        kinds={theme.decorations ?? []}
        enabled={decorations}
      />

      {showTitle && (
        <div className="ctp-header">
          <h2 className="ctp-title" id={titleId}>
            {title}
          </h2>
        </div>
      )}

      <div className="ctp-body">
        <div className="ctp-top-row">
          <TimeDisplay
            hour={shownHour}
            minute={time.minutes}
            second={time.seconds}
            showSeconds={showSeconds}
            mode={mode}
            format={format}
            onSelectHour={() => setMode("hour")}
            onSelectMinute={() => setMode("minute")}
            onSelectSecond={() => setMode("second")}
            onCommitHour={handleTypedHour}
            onCommitMinute={handleTypedMinute}
            onCommitSecond={showSeconds ? handleTypedSecond : undefined}
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
          {mode === "hour"
            ? "Select hour"
            : mode === "minute"
              ? "Select minute"
              : "Select second"}
        </span>

        <AnalogClock
          mode={mode}
          format={format}
          hourValue={format === "12h" ? hour12 : time.hours}
          minuteValue={time.minutes}
          secondValue={time.seconds}
          minuteStep={minuteStep}
          secondsStep={secondsStep}
          onHourChange={handleHourChange}
          onMinuteChange={handleMinuteChange}
          onSecondChange={showSeconds ? handleSecondChange : undefined}
          onHourCommit={handleHourCommit}
          disabled={disabled}
          labelStyle={labelStyleProp ?? theme.labelStyle ?? "all"}
          handStyle={handStyleProp ?? theme.handStyle ?? "round"}
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

  if (!selector) {
    return picker;
  }

  return (
    <div
      ref={fieldRef}
      className={["ctp-field", className].filter(Boolean).join(" ")}
      style={{ ...cssVars, ...style }}
      data-theme={theme.id}
      data-size={size}
      data-disabled={disabled}
      data-open={open}
    >
      <TimeSelectorTrigger
        id={selectorId}
        label={displayLabel}
        open={open}
        disabled={disabled}
        onClick={() => (open ? closePicker(false) : openPicker())}
      />
      {open && picker}
    </div>
  );
}
