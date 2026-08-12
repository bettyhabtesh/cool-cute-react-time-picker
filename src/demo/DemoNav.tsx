interface DemoNavProps {
  current: "demo" | "stats" | "showcase";
  onNavigate?: (path: string) => void;
}

const LINKS: {
  id: DemoNavProps["current"];
  label: string;
  href: string;
  external?: boolean;
}[] = [
  { id: "demo", label: "Time Picker", href: "/" },
  { id: "showcase", label: "Hand Styles", href: "/showcase.html" },
  { id: "stats", label: "Stats", href: "/stats" },
];

export function DemoNav({ current, onNavigate }: DemoNavProps) {
  return (
    <nav className="demo-nav" aria-label="Site">
      {LINKS.map((link) => {
        const isActive = link.id === current;
        const useClientNav = Boolean(onNavigate) && link.id !== "showcase";

        if (useClientNav) {
          return (
            <button
              key={link.id}
              type="button"
              className="demo-nav-link"
              data-active={isActive}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onNavigate?.(link.href)}
            >
              {link.label}
            </button>
          );
        }

        return (
          <a
            key={link.id}
            href={link.href}
            className="demo-nav-link"
            data-active={isActive}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
