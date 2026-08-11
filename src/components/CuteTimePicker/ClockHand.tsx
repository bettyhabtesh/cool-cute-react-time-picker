import { memo } from "react";
import type { ClockHandStyle } from "../../types";

interface ClockHandProps {
  angle: number;
  dragging: boolean;
  /** Tip style. Default: `"round"`. */
  handStyle?: ClockHandStyle;
}

/**
 * Full-face SVG hand pivoted at the clock center.
 * Angle is degrees clockwise from 12 o'clock.
 */
export const ClockHand = memo(function ClockHand({
  angle,
  dragging,
  handStyle = "round",
}: ClockHandProps) {
  return (
    <svg
      className="ctp-hand"
      data-dragging={dragging}
      data-hand-style={handStyle}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <g transform={`rotate(${angle} 50 50)`}>
        {handStyle === "round" && (
          <>
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
          </>
        )}

        {handStyle === "pointer" && (
          <>
            <line
              className="ctp-hand-stem"
              x1="50"
              y1="50"
              x2="50"
              y2="24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="butt"
            />
            <polygon
              className="ctp-hand-tip"
              points="50,16 46.5,25 53.5,25"
              fill="currentColor"
            />
          </>
        )}

        {handStyle === "line" && (
          <line
            className="ctp-hand-stem"
            x1="50"
            y1="50"
            x2="50"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="butt"
          />
        )}
      </g>
    </svg>
  );
});
