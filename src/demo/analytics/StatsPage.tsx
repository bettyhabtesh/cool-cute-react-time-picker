import { useCallback, useEffect, useState } from "react";
import { DownloadChart } from "./DownloadChart";
import { PackageInfo } from "./PackageInfo";
import { PeriodComparisonSection } from "./PeriodComparison";
import { StatCard } from "./StatCard";
import { fetchDashboardData, type DashboardData } from "../lib/npmApi";
import type { ChartPeriod } from "../types/npm";

function formatUpdatedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function StatsPage() {
  const [period, setPeriod] = useState<ChartPeriod>("30d");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (nextPeriod: ChartPeriod) => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await fetchDashboardData(nextPeriod);
      setData(snapshot);
    } catch {
      setError("Unable to load npm statistics. Try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(period);
  }, [load, period]);

  return (
    <div className="demo-page stats-page">
      <header className="demo-hero stats-hero">
        <h1 className="demo-brand">npm Stats</h1>
        <p className="demo-subtitle">
          Live download analytics for cool-cute-react-time-picker.
        </p>
        <p className="stats-disclaimer">
          Downloads are npm package download events and do not represent unique
          users.
        </p>
        <div className="stats-toolbar">
          <button
            type="button"
            className="stats-refresh"
            onClick={() => void load(period)}
            disabled={loading}
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <span className="stats-updated">
            {data
              ? `Last updated: ${formatUpdatedAt(data.fetchedAt)}`
              : loading
                ? "Loading npm statistics…"
                : "Not updated yet"}
          </span>
        </div>
      </header>

      {error ? (
        <div className="stats-error" role="alert">
          <p>{error}</p>
          <button
            type="button"
            className="stats-refresh"
            onClick={() => void load(period)}
          >
            Try again
          </button>
        </div>
      ) : null}

      <section className="stats-section">
        <div className="stats-cards">
          <StatCard
            label="Downloads Today"
            value={data?.today ?? null}
            loading={loading && !data}
          />
          <StatCard
            label="Downloads This Week"
            value={data?.thisWeek ?? null}
            loading={loading && !data}
          />
          <StatCard
            label="Downloads This Month"
            value={data?.thisMonth ?? null}
            loading={loading && !data}
          />
          <StatCard
            label="Downloads in the Selected Period"
            value={data?.selectedPeriod ?? null}
            hint="Matches the chart range below"
            loading={loading && !data}
          />
        </div>
      </section>

      <DownloadChart
        data={data?.chart.downloads ?? []}
        period={period}
        onPeriodChange={setPeriod}
        loading={loading}
      />

      <PeriodComparisonSection
        comparisons={data?.comparisons ?? []}
        loading={loading && !data}
      />

      <PackageInfo info={data?.packageInfo ?? null} loading={loading && !data} />
    </div>
  );
}
