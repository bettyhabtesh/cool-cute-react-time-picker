import { formatCount } from "./StatCard";
import type { PeriodComparison } from "../types/npm";

interface PeriodComparisonProps {
  comparisons: PeriodComparison[];
  loading?: boolean;
}

function formatPercent(value: number | null): string {
  if (value === null) {
    return "New activity";
  }
  const rounded = Math.abs(value).toFixed(1);
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${rounded}%`;
}

function trendClass(value: number | null): string {
  if (value === null) return "stats-trend--flat";
  if (value > 0) return "stats-trend--up";
  if (value < 0) return "stats-trend--down";
  return "stats-trend--flat";
}

function trendArrow(value: number | null): string {
  if (value === null || value === 0) return "→";
  return value > 0 ? "↑" : "↓";
}

export function PeriodComparisonSection({
  comparisons,
  loading,
}: PeriodComparisonProps) {
  return (
    <section className="stats-section">
      <h2 className="demo-section-title">Period comparison</h2>
      <p className="demo-section-copy">
        How recent download activity compares to the previous window of the same
        length.
      </p>
      <div className="stats-compare-grid">
        {(loading ? placeholderComparisons : comparisons).map((item) => (
          <article key={item.label} className="stats-compare-card">
            <h3>{item.label}</h3>
            <p className="stats-compare-current">
              {loading ? "…" : formatCount(item.current)}{" "}
              <span>downloads</span>
            </p>
            <p className={`stats-trend ${trendClass(item.percentChange)}`}>
              <span aria-hidden="true">{trendArrow(item.percentChange)}</span>
              {loading ? "…" : formatPercent(item.percentChange)} vs{" "}
              {item.previousLabel.toLowerCase()}
            </p>
            <p className="stats-compare-prev">
              {item.previousLabel}:{" "}
              {loading ? "…" : formatCount(item.previous)} downloads
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

const placeholderComparisons: PeriodComparison[] = [
  {
    label: "Today vs Yesterday",
    currentLabel: "Today",
    previousLabel: "Yesterday",
    current: 0,
    previous: 0,
    percentChange: 0,
  },
  {
    label: "This Week vs Previous Week",
    currentLabel: "This week",
    previousLabel: "Previous week",
    current: 0,
    previous: 0,
    percentChange: 0,
  },
  {
    label: "This Month vs Previous Month",
    currentLabel: "This month",
    previousLabel: "Previous month",
    current: 0,
    previous: 0,
    percentChange: 0,
  },
];
