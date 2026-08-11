import {
  memo,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { clamp, pad2 } from "../../utils/time";
import type { SelectionMode, TimeFormat } from "../../types";

interface TimeDisplayProps {
  hour: number;
  minute: number;
  second?: number;
  showSeconds?: boolean;
  mode: SelectionMode;
  format: TimeFormat;
  onSelectHour: () => void;
  onSelectMinute: () => void;
  onSelectSecond?: () => void;
  onCommitHour: (hour: number) => void;
  onCommitMinute: (minute: number) => void;
  onCommitSecond?: (second: number) => void;
  disabled?: boolean;
}

type EditablePart = "hour" | "minute" | "second";

function parsePartInput(
  raw: string,
  part: EditablePart,
  format: TimeFormat,
): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n)) return null;

  if (part === "hour") {
    if (format === "12h") return clamp(Math.round(n), 1, 12);
    return clamp(Math.round(n), 0, 23);
  }
  return clamp(Math.round(n), 0, 59);
}

export const TimeDisplay = memo(function TimeDisplay({
  hour,
  minute,
  second = 0,
  showSeconds = false,
  mode,
  format,
  onSelectHour,
  onSelectMinute,
  onSelectSecond,
  onCommitHour,
  onCommitMinute,
  onCommitSecond,
  disabled,
}: TimeDisplayProps) {
  const [editing, setEditing] = useState<EditablePart | null>(null);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const editingRef = useRef<EditablePart | null>(null);
  const skipBlurCommit = useRef(false);

  const valueFor = (part: EditablePart) => {
    if (part === "hour") return hour;
    if (part === "minute") return minute;
    return second;
  };

  const startEdit = (part: EditablePart) => {
    if (disabled) return;
    if (part === "hour") onSelectHour();
    else if (part === "minute") onSelectMinute();
    else onSelectSecond?.();
    editingRef.current = part;
    setDraft(pad2(valueFor(part)));
    setEditing(part);
  };

  const cancelEdit = () => {
    skipBlurCommit.current = true;
    editingRef.current = null;
    setEditing(null);
    setDraft("");
  };

  const commitEdit = (part: EditablePart, raw: string) => {
    if (editingRef.current !== part) return;
    editingRef.current = null;

    const parsed = parsePartInput(raw, part, format);
    setEditing(null);
    setDraft("");
    if (parsed === null) return;

    if (part === "hour") onCommitHour(parsed);
    else if (part === "minute") onCommitMinute(parsed);
    else onCommitSecond?.(parsed);
  };

  useEffect(() => {
    if (!editing) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    el.select();
  }, [editing]);

  useEffect(() => {
    if (disabled && editing) {
      editingRef.current = null;
      setEditing(null);
      setDraft("");
    }
  }, [disabled, editing]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDraft(next);
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>, part: EditablePart) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      commitEdit(part, draft);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      cancelEdit();
      e.currentTarget.blur();
    }
  };

  const onInputBlur = (e: FocusEvent<HTMLInputElement>, part: EditablePart) => {
    if (skipBlurCommit.current) {
      skipBlurCommit.current = false;
      return;
    }
    commitEdit(part, e.currentTarget.value);
  };

  const renderPart = (part: EditablePart, active: boolean, label: string) => {
    if (editing === part) {
      return (
        <input
          ref={inputRef}
          className="ctp-time-part ctp-time-input"
          data-active="true"
          data-editing="true"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          value={draft}
          aria-label={`Type ${label}`}
          disabled={disabled}
          onChange={onInputChange}
          onKeyDown={(e) => onInputKeyDown(e, part)}
          onBlur={(e) => onInputBlur(e, part)}
          onClick={(e: MouseEvent) => e.stopPropagation()}
        />
      );
    }

    return (
      <button
        type="button"
        className="ctp-time-part"
        data-active={active}
        aria-pressed={active}
        aria-label={`${label}. Click to type a value.`}
        onClick={() => startEdit(part)}
        disabled={disabled}
      >
        {pad2(valueFor(part))}
      </button>
    );
  };

  return (
    <div className="ctp-time-display" role="group" aria-label="Selected time">
      {renderPart("hour", mode === "hour", `Hour ${pad2(hour)}`)}
      <span className="ctp-time-colon" aria-hidden="true">
        :
      </span>
      {renderPart("minute", mode === "minute", `Minute ${pad2(minute)}`)}
      {showSeconds && (
        <>
          <span className="ctp-time-colon" aria-hidden="true">
            :
          </span>
          {renderPart("second", mode === "second", `Second ${pad2(second)}`)}
        </>
      )}
    </div>
  );
});
