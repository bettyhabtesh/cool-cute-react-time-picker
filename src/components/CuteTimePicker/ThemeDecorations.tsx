import { memo } from "react";
import type { DecorationKind } from "../../types";

interface ThemeDecorationsProps {
  kinds: DecorationKind[];
  enabled: boolean;
}

function Flowers() {
  return (
    <>
      <svg className="ctp-deco-svg ctp-deco-bottom-left" viewBox="0 0 110 90" aria-hidden="true">
        <ellipse className="ctp-flower" cx="28" cy="62" rx="14" ry="10" transform="rotate(-25 28 62)" />
        <ellipse className="ctp-flower" cx="42" cy="50" rx="12" ry="9" transform="rotate(15 42 50)" />
        <ellipse className="ctp-flower" cx="22" cy="48" rx="10" ry="8" transform="rotate(-10 22 48)" />
        <circle cx="32" cy="52" r="4" fill="#f7c4b8" />
        <path d="M48 70 C55 50, 70 45, 78 58" fill="none" stroke="#8fbf8a" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="62" cy="42" rx="8" ry="14" fill="#8fbf8a" opacity="0.75" transform="rotate(30 62 42)" />
        <ellipse cx="78" cy="55" rx="7" ry="12" fill="#7aaa75" opacity="0.7" transform="rotate(-20 78 55)" />
      </svg>
      <svg className="ctp-deco-svg ctp-deco-bottom-right" viewBox="0 0 110 90" aria-hidden="true">
        <ellipse className="ctp-flower" cx="78" cy="60" rx="13" ry="9" transform="rotate(20 78 60)" />
        <ellipse className="ctp-flower" cx="64" cy="48" rx="11" ry="8" transform="rotate(-18 64 48)" />
        <ellipse className="ctp-flower" cx="86" cy="46" rx="9" ry="7" />
        <circle cx="76" cy="50" r="3.5" fill="#f7c4b8" />
        <path d="M55 72 C48 55, 35 48, 28 60" fill="none" stroke="#8fbf8a" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="40" cy="40" rx="7" ry="13" fill="#8fbf8a" opacity="0.7" transform="rotate(-35 40 40)" />
      </svg>
    </>
  );
}

function Leaves() {
  return (
    <>
      <svg className="ctp-deco-svg ctp-deco-bottom-left" viewBox="0 0 110 90" aria-hidden="true">
        <path d="M20 80 C25 55, 45 40, 70 35 C50 45, 38 60, 34 80 Z" fill="#8fad84" opacity="0.55" />
        <path d="M35 82 C40 60, 58 48, 82 42 C62 55, 50 68, 48 82 Z" fill="#6b8f71" opacity="0.5" />
        <path d="M12 70 C18 50, 32 38, 50 32" fill="none" stroke="#6b8f71" strokeWidth="2" opacity="0.4" />
      </svg>
      <svg className="ctp-deco-svg ctp-deco-bottom-right" viewBox="0 0 110 90" aria-hidden="true">
        <path d="M90 80 C85 55, 65 40, 40 35 C60 45, 72 60, 76 80 Z" fill="#8fad84" opacity="0.55" />
        <path d="M75 82 C70 60, 52 48, 28 42 C48 55, 60 68, 62 82 Z" fill="#6b8f71" opacity="0.5" />
        <ellipse cx="95" cy="20" rx="28" ry="18" fill="#a8c4a0" opacity="0.25" />
      </svg>
      <svg className="ctp-deco-svg ctp-deco-top-left" viewBox="0 0 60 40" aria-hidden="true" style={{ width: 70, height: 46 }}>
        <ellipse cx="20" cy="18" rx="22" ry="14" fill="#a8c4a0" opacity="0.28" />
        <ellipse cx="42" cy="22" rx="16" ry="10" fill="#8fad84" opacity="0.22" />
      </svg>
    </>
  );
}

function Stars() {
  return (
    <svg className="ctp-deco-svg" viewBox="0 0 320 400" style={{ inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
      <circle className="ctp-star" cx="40" cy="70" r="1.5" />
      <circle className="ctp-star" cx="90" cy="40" r="1.2" />
      <circle className="ctp-star" cx="260" cy="55" r="1.8" />
      <circle className="ctp-star" cx="290" cy="100" r="1.1" />
      <circle className="ctp-star" cx="50" cy="140" r="1.3" />
      <circle className="ctp-star" cx="280" cy="160" r="1.4" />
      <circle className="ctp-star" cx="30" cy="220" r="1" />
      <path className="ctp-star" d="M70 100 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5z" />
      <path className="ctp-star" d="M240 80 l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2 -2.8 -2.8 -1.2 2.8 -1.2z" />
    </svg>
  );
}

function Moon() {
  return (
    <svg className="ctp-deco-svg ctp-deco-top-right" viewBox="0 0 36 36" aria-hidden="true">
      <path
        d="M22 4a14 14 0 1 0 10 22A11 11 0 0 1 22 4z"
        fill="#e8e6ff"
        opacity="0.9"
      />
    </svg>
  );
}

function Clouds() {
  return (
    <>
      <svg className="ctp-deco-svg ctp-deco-top-left" viewBox="0 0 80 40" aria-hidden="true" style={{ width: 72, height: 36 }}>
        <g className="ctp-cloud">
          <ellipse cx="28" cy="24" rx="22" ry="12" />
          <ellipse cx="44" cy="20" rx="16" ry="11" />
          <ellipse cx="18" cy="20" rx="12" ry="9" />
        </g>
      </svg>
      <svg className="ctp-deco-svg" viewBox="0 0 80 40" aria-hidden="true" style={{ right: 8, bottom: 72, width: 64, height: 32 }}>
        <g className="ctp-cloud">
          <ellipse cx="30" cy="24" rx="20" ry="11" />
          <ellipse cx="46" cy="21" rx="14" ry="10" />
          <ellipse cx="16" cy="22" rx="11" ry="8" />
        </g>
      </svg>
      <svg className="ctp-deco-svg" viewBox="0 0 70 35" aria-hidden="true" style={{ left: 20, bottom: 56, width: 56, height: 28, opacity: 0.85 }}>
        <g className="ctp-cloud">
          <ellipse cx="28" cy="22" rx="18" ry="10" />
          <ellipse cx="42" cy="19" rx="12" ry="9" />
        </g>
      </svg>
    </>
  );
}

function Sun({ sunset = false }: { sunset?: boolean }) {
  if (sunset) {
    return (
      <svg
        className="ctp-deco-svg"
        viewBox="0 0 40 40"
        aria-hidden="true"
        style={{ left: "58%", bottom: 48, width: 36, height: 36 }}
      >
        <circle className="ctp-horizon-sun" cx="20" cy="20" r="12" />
      </svg>
    );
  }
  return (
    <svg
      className="ctp-deco-svg"
      viewBox="0 0 40 40"
      aria-hidden="true"
      style={{ right: 18, top: "42%", width: 34, height: 34, animation: "ctp-float 4s ease-in-out infinite" }}
    >
      <circle cx="20" cy="20" r="9" fill="#f6c84c" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="20"
          y1="4"
          x2="20"
          y2="8"
          stroke="#f6c84c"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
      <circle cx="16" cy="18" r="1.2" fill="#c98a20" />
      <circle cx="24" cy="18" r="1.2" fill="#c98a20" />
      <path d="M16 23 Q20 26 24 23" fill="none" stroke="#c98a20" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function City() {
  return (
    <svg className="ctp-deco-svg ctp-city-strip" viewBox="0 0 320 64" preserveAspectRatio="none" aria-hidden="true">
      <g className="ctp-city">
        <rect x="0" y="36" width="28" height="28" />
        <rect x="30" y="22" width="36" height="42" />
        <rect x="70" y="30" width="24" height="34" />
        <rect x="98" y="14" width="40" height="50" />
        <polygon points="118,14 138,0 158,14" />
        <rect x="142" y="28" width="30" height="36" />
        <rect x="176" y="20" width="34" height="44" />
        <rect x="214" y="32" width="26" height="32" />
        <rect x="244" y="18" width="38" height="46" />
        <rect x="286" y="28" width="34" height="36" />
        <rect x="40" y="30" width="4" height="5" fill="#f0a060" opacity="0.5" />
        <rect x="50" y="30" width="4" height="5" fill="#f0a060" opacity="0.45" />
        <rect x="110" y="24" width="4" height="5" fill="#f0a060" opacity="0.5" />
        <rect x="122" y="24" width="4" height="5" fill="#f0a060" opacity="0.4" />
        <rect x="186" y="28" width="4" height="5" fill="#f0a060" opacity="0.45" />
        <rect x="256" y="26" width="4" height="5" fill="#f0a060" opacity="0.5" />
      </g>
    </svg>
  );
}

function Hearts() {
  return (
    <svg className="ctp-deco-svg" viewBox="0 0 320 400" style={{ inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
      <path className="ctp-heart" d="M40 80 C40 70, 52 66, 58 74 C64 66, 76 70, 76 80 C76 92, 58 104, 58 104 C58 104, 40 92, 40 80Z" style={{ transformOrigin: "58px 84px" }} />
      <path className="ctp-heart" d="M250 60 C250 52, 258 48, 263 54 C268 48, 276 52, 276 60 C276 70, 263 80, 263 80 C263 80, 250 70, 250 60Z" style={{ animationDelay: "0.8s" }} />
      <path className="ctp-heart" d="M280 200 C280 193, 287 190, 291 195 C295 190, 302 193, 302 200 C302 208, 291 216, 291 216 C291 216, 280 208, 280 200Z" style={{ animationDelay: "1.4s", opacity: 0.5 }} />
    </svg>
  );
}

function Sparkles() {
  return (
    <svg className="ctp-deco-svg" viewBox="0 0 320 400" style={{ inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
      <path className="ctp-star" fill="#f6d06a" d="M100 50 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" />
      <path className="ctp-star" fill="#f6d06a" d="M270 130 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z" />
      <path className="ctp-star" fill="#f4a4b8" d="M45 180 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2z" />
    </svg>
  );
}

function Bear() {
  return (
    <svg className="ctp-bear" viewBox="0 0 28 22" aria-hidden="true">
      <circle cx="7" cy="6" r="4" fill="#e8b89a" />
      <circle cx="21" cy="6" r="4" fill="#e8b89a" />
      <ellipse cx="14" cy="12" rx="10" ry="8" fill="#f0c8a8" />
      <circle cx="10" cy="11" r="1.3" fill="#5c3d36" />
      <circle cx="18" cy="11" r="1.3" fill="#5c3d36" />
      <ellipse cx="14" cy="14.5" rx="2.2" ry="1.5" fill="#e09a8a" />
    </svg>
  );
}

function Scallop() {
  return <div className="ctp-scallop" aria-hidden="true" />;
}

function Web() {
  return (
    <>
      <svg
        className="ctp-deco-svg ctp-web ctp-web-corner"
        viewBox="0 0 120 120"
        aria-hidden="true"
        style={{ left: -6, top: -6, width: 108, height: 108 }}
      >
        <path
          d="M8 8 L112 8 M8 8 L8 112 M8 8 L70 70 M8 8 L95 40 M8 8 L40 95"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.55"
        />
        <path
          d="M20 8 Q28 28 8 20 M40 8 Q52 42 8 40 M60 8 Q72 58 8 60 M80 8 Q90 72 8 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <circle cx="8" cy="8" r="3" fill="currentColor" opacity="0.7" />
      </svg>
      <svg
        className="ctp-deco-svg ctp-web ctp-web-corner"
        viewBox="0 0 120 120"
        aria-hidden="true"
        style={{ right: -6, bottom: -4, width: 120, height: 120, transform: "rotate(180deg)" }}
      >
        <path
          d="M8 8 L112 8 M8 8 L8 112 M8 8 L70 70 M8 8 L95 40 M8 8 L40 95"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.5"
        />
        <path
          d="M20 8 Q28 28 8 20 M40 8 Q52 42 8 40 M60 8 Q72 58 8 60 M80 8 Q90 72 8 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.45"
        />
      </svg>
      <svg
        className="ctp-deco-svg ctp-spider"
        viewBox="0 0 40 40"
        aria-hidden="true"
        style={{ right: 14, top: 12, width: 28, height: 28 }}
      >
        <ellipse cx="20" cy="18" rx="7" ry="8" fill="currentColor" />
        <circle cx="20" cy="10" r="4.5" fill="currentColor" />
        <path
          d="M13 14 L4 8 M12 18 L3 18 M13 22 L5 28 M27 14 L36 8 M28 18 L37 18 M27 22 L35 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="18" cy="9" r="0.9" fill="#60a5fa" />
        <circle cx="22" cy="9" r="0.9" fill="#60a5fa" />
      </svg>
    </>
  );
}

export const ThemeDecorations = memo(function ThemeDecorations({
  kinds,
  enabled,
}: ThemeDecorationsProps) {
  if (!enabled || kinds.length === 0) return null;

  const set = new Set(kinds);
  const isTwilight = set.has("city");

  return (
    <div className="ctp-decorations" aria-hidden="true">
      {set.has("flowers") && <Flowers />}
      {set.has("leaves") && <Leaves />}
      {set.has("stars") && <Stars />}
      {set.has("moon") && <Moon />}
      {set.has("clouds") && <Clouds />}
      {set.has("sun") && <Sun sunset={isTwilight} />}
      {set.has("city") && <City />}
      {set.has("hearts") && <Hearts />}
      {set.has("sparkles") && <Sparkles />}
      {set.has("bear") && <Bear />}
      {set.has("scallop") && <Scallop />}
      {set.has("web") && <Web />}
    </div>
  );
});