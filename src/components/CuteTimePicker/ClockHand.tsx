import { memo } from "react";

interface ClockHandProps {
  angle: number;
  dragging: boolean;
}

/**
 * Full-face SVG hand pivoted at the clock center.
 * Angle is degrees clockwise from 12 o'clock.
 */
export const ClockHand = memo(function ClockHand({ angle, dragging }: ClockHandProps) {
  return (
    <svg
      className="ctp-hand"
      data-dragging={dragging}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      {/*
        SVG attribute rotate(angle cx cy) is the most reliable pivot.
        Tip sits on the number ring (~radius 36 in a 0–100 viewBox).
      */}
      <g transform={`rotate(${angle} 50 50)`}>
        <line
          className="ctp-hand-stem"
          x1="50"
          y1="50"
          x2="50"
          y2="14"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <circle className="ctp-handle" cx="50" cy="14" r="8.5" fill="currentColor" />
      </g>
    </svg>
  );
});
