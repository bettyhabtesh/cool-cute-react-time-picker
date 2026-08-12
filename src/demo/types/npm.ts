export interface NpmDownloadsPoint {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export interface NpmDailyDownload {
  day: string;
  downloads: number;
}

export interface NpmDownloadsRange {
  downloads: NpmDailyDownload[];
  start: string;
  end: string;
  package: string;
}

export interface NpmPackageVersionMeta {
  version: string;
  publishedAt: string;
}

export interface NpmPackageInfo {
  name: string;
  latestVersion: string;
  versionCount: number;
  versions: NpmPackageVersionMeta[];
  npmUrl: string;
  githubUrl: string;
}

export type ChartPeriod = "7d" | "30d" | "90d" | "1y";

export interface PeriodComparison {
  label: string;
  currentLabel: string;
  previousLabel: string;
  current: number;
  previous: number;
  percentChange: number | null;
}

export interface NpmStatsSnapshot {
  today: number;
  thisWeek: number;
  thisMonth: number;
  selectedPeriod: number;
  comparisons: PeriodComparison[];
  packageInfo: NpmPackageInfo;
  fetchedAt: Date;
}
