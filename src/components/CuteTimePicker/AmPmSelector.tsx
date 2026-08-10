import { memo } from "react";
import type { Meridiem } from "../../types";

interface AmPmSelectorProps {
  value: Meridiem;
  onChange: (value: Meridiem) => void;
  disabled?: boolean;
}

export const AmPmSelector = memo(function AmPmSelector({
  value,
  onChange,
  disabled,
}: AmPmSelectorProps) {
  return (
    <div className="ctp-ampm" role="group" aria-label="AM or PM">
      {(["AM", "PM"] as const).map((period) => (
        <button
          key={period}
          type="button"
          className="ctp-ampm-btn"
          aria-pressed={value === period}
          aria-label={period}
          disabled={disabled}
          onClick={() => onChange(period)}
        >
          {period}
        </button>
      ))}
    </div>
  );
});
