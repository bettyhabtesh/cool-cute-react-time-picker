interface StatCardProps {
  label: string;
  value: number | null;
  hint?: string;
  loading?: boolean;
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function StatCard({ label, value, hint, loading }: StatCardProps) {
  return (
    <article className="stats-card">
      <p className="stats-card-label">{label}</p>
      <p className="stats-card-value" aria-live="polite">
        {loading || value === null ? "…" : formatCount(value)}
      </p>
      {hint ? <p className="stats-card-hint">{hint}</p> : null}
    </article>
  );
}
