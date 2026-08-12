import type { NpmPackageInfo } from "../types/npm";

interface PackageInfoProps {
  info: NpmPackageInfo | null;
  loading?: boolean;
}

function formatPublishedDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function PackageInfo({ info, loading }: PackageInfoProps) {
  return (
    <section className="stats-section">
      <h2 className="demo-section-title">Package information</h2>
      <p className="demo-section-copy">
        Live metadata from the public npm registry.
      </p>

      <div className="stats-package">
        <dl className="stats-package-meta">
          <div>
            <dt>Package name</dt>
            <dd>
              <code>{info?.name ?? "cool-cute-react-time-picker"}</code>
            </dd>
          </div>
          <div>
            <dt>Latest version</dt>
            <dd>{loading || !info ? "…" : info.latestVersion}</dd>
          </div>
          <div>
            <dt>Published versions</dt>
            <dd>{loading || !info ? "…" : info.versionCount}</dd>
          </div>
          <div>
            <dt>npm</dt>
            <dd>
              <a
                href={
                  info?.npmUrl ??
                  "https://www.npmjs.com/package/cool-cute-react-time-picker"
                }
                target="_blank"
                rel="noreferrer"
              >
                View on npm
              </a>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a
                href={
                  info?.githubUrl ??
                  "https://github.com/bettyhabtesh/cool-cute-react-time-picker"
                }
                target="_blank"
                rel="noreferrer"
              >
                bettyhabtesh/cool-cute-react-time-picker
              </a>
            </dd>
          </div>
        </dl>

        <div className="stats-versions">
          <h3>Published versions</h3>
          {loading || !info ? (
            <p className="stats-muted">Loading version history…</p>
          ) : info.versions.length === 0 ? (
            <p className="stats-muted">No version timestamps available.</p>
          ) : (
            <ul className="stats-version-list">
              {info.versions.map((entry) => (
                <li key={entry.version}>
                  <code>v{entry.version}</code>
                  <span>{formatPublishedDate(entry.publishedAt)}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="stats-note">
            npm&apos;s public downloads API does not expose download counts per
            version, so version-specific download stats are not shown here.
          </p>
        </div>
      </div>
    </section>
  );
}
