import { memo } from "react";
import { pad2 } from "../../utils/time";
import type { SelectionMode } from "../../types";

interface TimeDisplayProps {
  hour: number;
  minute: number;
  second?: number;
  showSeconds?: boolean;
  mode: SelectionMode;
  onSelectHour: () => void;
  onSelectMinute: () => void;
  onSelectSecond?: () => void;
  disabled?: boolean;
}

export const TimeDisplay = memo(function TimeDisplay({
  hour,
  minute,
  second = 0,
  showSeconds = false,
  mode,
  onSelectHour,
  onSelectMinute,
  onSelectSecond,
  disabled,
}: TimeDisplayProps) {
  return (
    <div className="ctp-time-display" role="group" aria-label="Selected time">
      <button
        type="button"
        className="ctp-time-part"
        data-active={mode === "hour"}
        aria-pressed={mode === "hour"}
        aria-label={`Hour ${pad2(hour)}. Activate to edit hours.`}
        onClick={onSelectHour}
        disabled={disabled}
      >
        {pad2(hour)}
      </button>
      <span className="ctp-time-colon" aria-hidden="true">
        :
      </span>
      <button
        type="button"
        className="ctp-time-part"
        data-active={mode === "minute"}
        aria-pressed={mode === "minute"}
        aria-label={`Minute ${pad2(minute)}. Activate to edit minutes.`}
        onClick={onSelectMinute}
        disabled={disabled}
      >
        {pad2(minute)}
      </button>
      {showSeconds && (
        <>
          <span className="ctp-time-colon" aria-hidden="true">
            :
          </span>
          <button
            type="button"
            className="ctp-time-part"
            data-active={mode === "second"}
            aria-pressed={mode === "second"}
            aria-label={`Second ${pad2(second)}. Activate to edit seconds.`}
            onClick={onSelectSecond}
            disabled={disabled}
          >
            {pad2(second)}
          </button>
        </>
      )}
    </div>
  );
});
