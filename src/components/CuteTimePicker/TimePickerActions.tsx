import { memo } from "react";

interface TimePickerActionsProps {
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  disabled?: boolean;
  showCancel?: boolean;
}

export const TimePickerActions = memo(function TimePickerActions({
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  disabled,
  showCancel = true,
}: TimePickerActionsProps) {
  return (
    <div className="ctp-actions">
      {showCancel && (
        <button
          type="button"
          className="ctp-btn ctp-btn-cancel"
          onClick={onCancel}
          disabled={disabled}
        >
          {cancelLabel}
        </button>
      )}
      <button
        type="button"
        className="ctp-btn ctp-btn-confirm"
        onClick={onConfirm}
        disabled={disabled}
      >
        {confirmLabel}
      </button>
    </div>
  );
});
