import { memo } from "react";

interface TimeSelectorTriggerProps {
  label: string;
  open: boolean;
  disabled?: boolean;
  onClick: () => void;
  id?: string;
}

/** Compact themed field that opens the full picker. */
export const TimeSelectorTrigger = memo(function TimeSelectorTrigger({
  label,
  open,
  disabled,
  onClick,
  id,
}: TimeSelectorTriggerProps) {
  return (
    <button
      id={id}
      type="button"
      className="ctp-selector"
      data-open={open}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-label={`Selected time ${label}. Click to open time picker.`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="ctp-selector-value">{label}</span>
    </button>
  );
});
