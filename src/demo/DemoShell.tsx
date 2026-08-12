import { useEffect, useState } from "react";
import { DemoApp } from "./DemoApp";
import { DemoNav } from "./DemoNav";
import { StatsPage } from "./analytics/StatsPage";

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

function resolveView(pathname: string): "demo" | "stats" {
  const path = normalizePath(pathname);
  if (path === "/stats" || path === "/analytics") {
    return "stats";
  }
  return "demo";
}

export function DemoShell() {
  const [path, setPath] = useState(() =>
    normalizePath(window.location.pathname),
  );

  useEffect(() => {
    const onPopState = () => {
      setPath(normalizePath(window.location.pathname));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const view = resolveView(path);
    document.title =
      view === "stats"
        ? "npm Stats — Cool Cute React Time Picker"
        : "Cool Cute React Time Picker — Demo";
  }, [path]);

  function navigate(to: string) {
    const next = normalizePath(to);
    if (next === path) return;
    window.history.pushState({}, "", next);
    setPath(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const view = resolveView(path);

  return (
    <>
      <DemoNav current={view} onNavigate={navigate} />
      {view === "stats" ? <StatsPage /> : <DemoApp />}
    </>
  );
}
