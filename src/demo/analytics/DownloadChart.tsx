import { useMemo, useRef, useState, type MouseEvent } from "react";
import type { ChartPeriod, NpmDailyDownload } from "../types/npm";
import { formatCount } from "./StatCard";

interface DownloadChartProps {
  data: NpmDailyDownload[];
  period: ChartPeriod;
  onPeriodChange: (period: ChartPeriod) => void;
  loading?: boolean;
}

const PERIODS: { id: ChartPeriod; label: string }[] = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
  { id: "1y", label: "1 year" },
];

const WIDTH = 720;
const HEIGHT = 280;
const PAD = { top: 24, right: 16, bottom: 40, left: 48 };

function formatAxisDate(day: string, period: ChartPeriod): string {
  const date = new Date(`${day}T00:00:00.000Z`);
  if (period === "1y") {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatTooltipDate(day: string): string {
  const date = new Date(`${day}T00:00:00.000Z`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function buildPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ");
}

export function DownloadChart({
  data,
  period,
  onPeriodChange,
  loading,
}: DownloadChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const chart = useMemo(() => {
    const innerW = WIDTH - PAD.left - PAD.right;
    const innerH = HEIGHT - PAD.top - PAD.bottom;
    const max = Math.max(1, ...data.map((d) => d.downloads));
    const points = data.map((entry, index) => {
      const x =
        data.length === 1
          ? PAD.left + innerW / 2
          : PAD.left + (index / (data.length - 1)) * innerW;
      const y = PAD.top + innerH - (entry.downloads / max) * innerH;
      return { x, y, ...entry };
    });

    const area =
      points.length === 0
        ? ""
        : `${buildPath(points)} L${points[points.length - 1].x},${PAD.top + innerH} L${points[0].x},${PAD.top + innerH} Z`;

    const tickCount = period === "7d" ? 7 : period === "30d" ? 6 : 5;
    const tickIndexes = Array.from({ length: Math.min(tickCount, data.length) }, (_, i) => {
      if (data.length <= 1) return 0;
      return Math.round((i / (tickCount - 1)) * (data.length - 1));
    });

    const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
      value: Math.round(max * ratio),
      y: PAD.top + innerH - ratio * innerH,
    }));

    return { points, area, tickIndexes, yTicks, max, innerH };
  }, [data, period]);

  const hovered = hoverIndex !== null ? chart.points[hoverIndex] : null;

  function handleMove(event: MouseEvent<SVGSVGElement>) {
    if (!svgRef.current || chart.points.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * WIDTH;
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    chart.points.forEach((point, index) => {
      const dist = Math.abs(point.x - x);
      if (dist < best) {
        best = dist;
        nearest = index;
      }
    });
    setHoverIndex(nearest);
  }

  return (
    <section className="stats-section">
      <div className="stats-chart-header">
        <div>
          <h2 className="demo-section-title">Daily downloads</h2>
          <p className="demo-section-copy">
            npm package download events over the selected period.
          </p>
        </div>
        <div className="stats-period-pills" role="group" aria-label="Chart period">
          {PERIODS.map((option) => (
            <button
              key={option.id}
              type="button"
              className="demo-pill"
              data-active={period === option.id}
              onClick={() => onPeriodChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-chart-panel">
        {loading && data.length === 0 ? (
          <p className="stats-chart-status">Loading chart…</p>
        ) : data.length === 0 ? (
          <p className="stats-chart-status">No download data for this period.</p>
        ) : (
          <div className="stats-chart-wrap">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              className="stats-chart-svg"
              role="img"
              aria-label="Daily npm downloads chart"
              onMouseMove={handleMove}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id="statsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d9786a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#d9786a" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {chart.yTicks.map((tick) => (
                <g key={tick.value}>
                  <line
                    x1={PAD.left}
                    x2={WIDTH - PAD.right}
                    y1={tick.y}
                    y2={tick.y}
                    className="stats-chart-grid"
                  />
                  <text
                    x={PAD.left - 8}
                    y={tick.y + 4}
                    textAnchor="end"
                    className="stats-chart-axis"
                  >
                    {formatCount(tick.value)}
                  </text>
                </g>
              ))}

              <path d={chart.area} fill="url(#statsFill)" />
              <path
                d={buildPath(chart.points)}
                className="stats-chart-line"
                fill="none"
              />

              {chart.tickIndexes.map((index) => {
                const point = chart.points[index];
                if (!point) return null;
                return (
                  <text
                    key={`${point.day}-${index}`}
                    x={point.x}
                    y={HEIGHT - 12}
                    textAnchor="middle"
                    className="stats-chart-axis"
                  >
                    {formatAxisDate(point.day, period)}
                  </text>
                );
              })}

              {hovered ? (
                <>
                  <line
                    x1={hovered.x}
                    x2={hovered.x}
                    y1={PAD.top}
                    y2={PAD.top + chart.innerH}
                    className="stats-chart-hover-line"
                  />
                  <circle
                    cx={hovered.x}
                    cy={hovered.y}
                    r={5}
                    className="stats-chart-dot"
                  />
                </>
              ) : null}
            </svg>

            {hovered ? (
              <div
                className="stats-tooltip"
                style={{
                  left: `${(hovered.x / WIDTH) * 100}%`,
                }}
              >
                <strong>{formatCount(hovered.downloads)}</strong> downloads
                <span>{formatTooltipDate(hovered.day)}</span>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
