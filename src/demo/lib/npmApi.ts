import type {
  ChartPeriod,
  NpmDownloadsPoint,
  NpmDownloadsRange,
  NpmPackageInfo,
  NpmPackageVersionMeta,
  PeriodComparison,
} from "../types/npm";

export const PACKAGE_NAME = "cool-cute-react-time-picker";
export const NPM_PACKAGE_URL = `https://www.npmjs.com/package/${PACKAGE_NAME}`;
export const GITHUB_URL =
  "https://github.com/bettyhabtesh/cool-cute-react-time-picker";

const DOWNLOADS_BASE = "https://api.npmjs.org/downloads";
const REGISTRY_URL = `https://registry.npmjs.org/${PACKAGE_NAME}`;

function formatDateUTC(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function parseDay(day: string): Date {
  return new Date(`${day}T00:00:00.000Z`);
}

function addDays(day: string, delta: number): string {
  const date = parseDay(day);
  date.setUTCDate(date.getUTCDate() + delta);
  return formatDateUTC(date);
}

function sumDownloads(range: NpmDownloadsRange): number {
  return range.downloads.reduce((total, entry) => total + entry.downloads, 0);
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`npm API request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function fetchDownloadsPoint(
  period: string,
): Promise<NpmDownloadsPoint> {
  return fetchJson<NpmDownloadsPoint>(
    `${DOWNLOADS_BASE}/point/${period}/${PACKAGE_NAME}`,
  );
}

export async function fetchDownloadsRange(
  start: string,
  end: string,
): Promise<NpmDownloadsRange> {
  return fetchJson<NpmDownloadsRange>(
    `${DOWNLOADS_BASE}/range/${start}:${end}/${PACKAGE_NAME}`,
  );
}

export async function fetchDownloadsPeriod(
  period: "last-week" | "last-month" | "last-year",
): Promise<NpmDownloadsRange> {
  return fetchJson<NpmDownloadsRange>(
    `${DOWNLOADS_BASE}/range/${period}/${PACKAGE_NAME}`,
  );
}

export function getChartDateRange(period: ChartPeriod): {
  start: string;
  end: string;
} {
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  // npm download data often lags by ~1 day; end at yesterday UTC
  end.setUTCDate(end.getUTCDate() - 1);

  const start = new Date(end);
  const daysBack =
    period === "7d" ? 6 : period === "30d" ? 29 : period === "90d" ? 89 : 364;
  start.setUTCDate(start.getUTCDate() - daysBack);

  return {
    start: formatDateUTC(start),
    end: formatDateUTC(end),
  };
}

export async function fetchChartDownloads(
  period: ChartPeriod,
): Promise<NpmDownloadsRange> {
  if (period === "7d") {
    return fetchDownloadsPeriod("last-week");
  }
  if (period === "30d") {
    return fetchDownloadsPeriod("last-month");
  }
  if (period === "1y") {
    return fetchDownloadsPeriod("last-year");
  }
  const { start, end } = getChartDateRange(period);
  return fetchDownloadsRange(start, end);
}

interface RegistryResponse {
  name: string;
  "dist-tags"?: { latest?: string };
  versions?: Record<string, unknown>;
  time?: Record<string, string>;
}

export async function fetchPackageInfo(): Promise<NpmPackageInfo> {
  const data = await fetchJson<RegistryResponse>(REGISTRY_URL);
  const time = data.time ?? {};
  const versionIds = Object.keys(data.versions ?? {}).filter(
    (key) => key !== "created" && key !== "modified",
  );

  const versions: NpmPackageVersionMeta[] = versionIds
    .map((version) => ({
      version,
      publishedAt: time[version] ?? "",
    }))
    .filter((entry) => Boolean(entry.publishedAt))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  return {
    name: data.name || PACKAGE_NAME,
    latestVersion: data["dist-tags"]?.latest ?? versions[0]?.version ?? "—",
    versionCount: versions.length,
    versions,
    npmUrl: NPM_PACKAGE_URL,
    githubUrl: GITHUB_URL,
  };
}

export function percentChange(
  current: number,
  previous: number,
): number | null {
  if (previous === 0) {
    return current === 0 ? 0 : null;
  }
  return ((current - previous) / previous) * 100;
}

export async function fetchPeriodComparisons(
  todayPoint: NpmDownloadsPoint,
): Promise<PeriodComparison[]> {
  const today = todayPoint.end;
  const yesterday = addDays(today, -1);

  // Rolling windows anchored to the latest available download day from npm
  const thisWeekStart = addDays(today, -6);
  const prevWeekEnd = addDays(thisWeekStart, -1);
  const prevWeekStart = addDays(prevWeekEnd, -6);

  const thisMonthStart = addDays(today, -29);
  const prevMonthEnd = addDays(thisMonthStart, -1);
  const prevMonthStart = addDays(prevMonthEnd, -29);

  const [yesterdayPoint, thisWeek, prevWeek, thisMonth, prevMonth] =
    await Promise.all([
      fetchDownloadsPoint(yesterday),
      fetchDownloadsRange(thisWeekStart, today),
      fetchDownloadsRange(prevWeekStart, prevWeekEnd),
      fetchDownloadsRange(thisMonthStart, today),
      fetchDownloadsRange(prevMonthStart, prevMonthEnd),
    ]);

  const thisWeekTotal = sumDownloads(thisWeek);
  const prevWeekTotal = sumDownloads(prevWeek);
  const thisMonthTotal = sumDownloads(thisMonth);
  const prevMonthTotal = sumDownloads(prevMonth);

  return [
    {
      label: "Today vs Yesterday",
      currentLabel: "Today",
      previousLabel: "Yesterday",
      current: todayPoint.downloads,
      previous: yesterdayPoint.downloads,
      percentChange: percentChange(
        todayPoint.downloads,
        yesterdayPoint.downloads,
      ),
    },
    {
      label: "This Week vs Previous Week",
      currentLabel: "This week",
      previousLabel: "Previous week",
      current: thisWeekTotal,
      previous: prevWeekTotal,
      percentChange: percentChange(thisWeekTotal, prevWeekTotal),
    },
    {
      label: "This Month vs Previous Month",
      currentLabel: "This month",
      previousLabel: "Previous month",
      current: thisMonthTotal,
      previous: prevMonthTotal,
      percentChange: percentChange(thisMonthTotal, prevMonthTotal),
    },
  ];
}

export interface DashboardData {
  today: number;
  thisWeek: number;
  thisMonth: number;
  selectedPeriod: number;
  chart: NpmDownloadsRange;
  comparisons: PeriodComparison[];
  packageInfo: NpmPackageInfo;
  fetchedAt: Date;
}

export async function fetchDashboardData(
  period: ChartPeriod,
): Promise<DashboardData> {
  const [today, thisWeek, thisMonth, chart, packageInfo] = await Promise.all([
    fetchDownloadsPoint("last-day"),
    fetchDownloadsPoint("last-week"),
    fetchDownloadsPoint("last-month"),
    fetchChartDownloads(period),
    fetchPackageInfo(),
  ]);

  const comparisons = await fetchPeriodComparisons(today);

  return {
    today: today.downloads,
    thisWeek: thisWeek.downloads,
    thisMonth: thisMonth.downloads,
    selectedPeriod: sumDownloads(chart),
    chart,
    comparisons,
    packageInfo,
    fetchedAt: new Date(),
  };
}
