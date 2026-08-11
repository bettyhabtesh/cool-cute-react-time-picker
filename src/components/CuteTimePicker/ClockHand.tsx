import { memo } from "react";
import type { ClockHandStyle } from "../../types";

export type HandTipRing = "outer" | "inner";

interface ClockHandProps {
  angle: number;
  dragging: boolean;
  /** Tip style. Default: `"round"`. */
  handStyle?: ClockHandStyle;
  /**
   * How far the tip sits from center.
   * Outer = 1–12 / minute labels; inner = 13–23 / 00 on 24h faces.
   */
  tipRing?: HandTipRing;
}

/** Tip center Y in the 100×100 viewBox (center is 50). */
const TIP_Y: Record<HandTipRing, number> = {
  outer: 12,
  inner: 26,
};

/**
 * Full-face SVG hand pivoted at the clock center.
 * Angle is degrees clockwise from 12 o'clock.
 */
export const ClockHand = memo(function ClockHand({
  angle,
  dragging,
  handStyle = "round",
  tipRing = "outer",
}: ClockHandProps) {
  const tipY = TIP_Y[tipRing];

  return (
    <svg
      className="ctp-hand"
      data-dragging={dragging}
      data-hand-style={handStyle}
      data-tip-ring={tipRing}
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
              y2={tipY}
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
            <circle
              className="ctp-handle"
              cx="50"
              cy={tipY}
              r="8.5"
              fill="currentColor"
            />
          </>
        )}

        {handStyle === "pointer" && (
          <>
            <line
              className="ctp-hand-stem"
              x1="50"
              y1="50"
              x2="50"
              y2={tipY + 8}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="butt"
            />
            <polygon
              className="ctp-hand-tip"
              points={`50,${tipY} 46.5,${tipY + 9} 53.5,${tipY + 9}`}
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
            y2={tipY + 2}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="butt"
          />
        )}
      </g>
    </svg>
  );
});
