import { useState } from "react";
import {
  CuteTimePicker,
  type BuiltInThemeName,
  type ClockHandStyle,
  type ClockLabelStyle,
  type TimeFormat,
} from "../index";
import { DemoNav } from "./DemoNav";

interface ShowcaseCard {
  theme: BuiltInThemeName;
  time: string;
  handStyle?: ClockHandStyle;
  labelStyle?: ClockLabelStyle;
  format?: TimeFormat;
  selector?: boolean;
  label: string;
  note?: string;
}

const ROUND_CARDS: ShowcaseCard[] = [
  { theme: "blush-bloom", time: "07:30", handStyle: "round", label: "Blush Bloom" },
  { theme: "midnight-orbit", time: "10:15", handStyle: "round", label: "Midnight Orbit" },
  { theme: "sugar-cloud", time: "02:45", handStyle: "round", label: "Sugar Cloud" },
  { theme: "spiderman", time: "09:00", handStyle: "round", label: "Spiderman" },
];

const POINTER_CARDS: ShowcaseCard[] = [
  { theme: "clean-modern", time: "03:20", handStyle: "pointer", label: "Clean Modern" },
  { theme: "gilded-noir", time: "08:40", handStyle: "pointer", label: "Gilded Noir" },
  { theme: "italic", time: "11:05", handStyle: "pointer", label: "Italic" },
  { theme: "sage-garden", time: "05:55", handStyle: "pointer", label: "Sage Garden" },
];

const LINE_CARDS: ShowcaseCard[] = [
  { theme: "latte-glow", time: "04:10", handStyle: "line", label: "Latte Glow" },
  { theme: "violet-dream", time: "06:25", handStyle: "line", label: "Violet Dream" },
  { theme: "sky-daydream", time: "01:50", handStyle: "line", label: "Sky Daydream" },
  { theme: "twilight-city", time: "09:35", handStyle: "line", label: "Twilight City" },
];

const SELECTOR_CARDS: ShowcaseCard[] = [
  {
    theme: "gilded-noir",
    time: "12:00",
    handStyle: "pointer",
    selector: true,
    label: "Gilded Noir",
    note: "selector + pointer",
  },
  {
    theme: "clean-modern",
    time: "09:30",
    handStyle: "pointer",
    selector: true,
    label: "Clean Modern",
    note: "selector + pointer",
  },
  {
    theme: "blush-bloom",
    time: "07:15",
    handStyle: "round",
    selector: true,
    label: "Blush Bloom",
    note: "selector + round",
  },
  {
    theme: "midnight-orbit",
    time: "18:45",
    handStyle: "round",
    selector: true,
    label: "Midnight Orbit",
    note: "selector + round",
  },
];

const FORMAT_24H_CARDS: ShowcaseCard[] = [
  {
    theme: "violet-dream",
    time: "14:20",
    handStyle: "round",
    format: "24h",
    label: "Violet Dream",
    note: "dual-ring 24h",
  },
  {
    theme: "clean-modern",
    time: "00:00",
    handStyle: "pointer",
    format: "24h",
    label: "Clean Modern",
    note: "inner 00",
  },
  {
    theme: "sky-daydream",
    time: "21:05",
    handStyle: "line",
    format: "24h",
    label: "Sky Daydream",
    note: "inner 21",
  },
  {
    theme: "spiderman",
    time: "12:00",
    handStyle: "round",
    format: "24h",
    label: "Spiderman",
    note: "outer 12",
  },
];

const LABEL_CARDS: ShowcaseCard[] = [
  {
    theme: "clean-modern",
    time: "03:15",
    handStyle: "pointer",
    labelStyle: "all",
    label: "Full numbers",
    note: 'labelStyle="all"',
  },
  {
    theme: "clean-modern",
    time: "03:15",
    handStyle: "pointer",
    labelStyle: "cardinal",
    label: "Major only",
    note: 'labelStyle="cardinal"',
  },
  {
    theme: "italic",
    time: "09:00",
    handStyle: "line",
    labelStyle: "all",
    label: "Italic · full",
    note: 'labelStyle="all"',
  },
  {
    theme: "gilded-noir",
    time: "06:30",
    handStyle: "pointer",
    labelStyle: "cardinal",
    label: "Noir · major",
    note: 'labelStyle="cardinal"',
  },
];

function PickerCard({
  theme,
  time: initial,
  handStyle,
  labelStyle,
  format = "12h",
  selector = false,
  label,
  note,
}: ShowcaseCard) {
  const [time, setTime] = useState(initial);

  return (
    <article className="shot-card" data-selector={selector || undefined}>
      <div className="shot-card-meta">
        <h3>{label}</h3>
        {note && <span className="shot-card-note">{note}</span>}
      </div>
      <CuteTimePicker
        theme={theme}
        value={time}
        onChange={setTime}
        handStyle={handStyle}
        labelStyle={labelStyle}
        format={format}
        selector={selector}
        size="sm"
        showActions={selector}
        showTitle={false}
        minuteStep={5}
        decorations
      />
      <p className="shot-time">{time}</p>
    </article>
  );
}

export function HandStyleShowcase() {
  return (
    <>
      <DemoNav current="showcase" />
      <div className="shot-page">
        <header className="shot-hero">
          <p className="shot-brand">Cool Cute React Time Picker</p>
          <h1>Hands, labels, selectors, and 24h.</h1>
          <p className="shot-sub">
            Every current API surface in one screenshot-ready page — tips,
            density, compact fields, and dual-ring hours.
          </p>
        </header>

        <section className="shot-section">
          <div className="shot-section-head">
            <h2>Round handle</h2>
            <p>
              Circular tip · full face numbers · any minute via drag or type.
            </p>
          </div>
          <div className="shot-grid">
            {ROUND_CARDS.map((card) => (
              <PickerCard key={`round-${card.theme}`} {...card} />
            ))}
          </div>
        </section>

        <section className="shot-section">
          <div className="shot-section-head">
            <h2>Arrow pointer</h2>
            <p>
              Pointed tip · no round number highlight · hand stops short of the
              rim.
            </p>
          </div>
          <div className="shot-grid">
            {POINTER_CARDS.map((card) => (
              <PickerCard key={`pointer-${card.theme}`} {...card} />
            ))}
          </div>
        </section>

        <section className="shot-section">
          <div className="shot-section-head">
            <h2>Line</h2>
            <p>Stem only — no circle, no arrow.</p>
          </div>
          <div className="shot-grid">
            {LINE_CARDS.map((card) => (
              <PickerCard key={`line-${card.theme}`} {...card} />
            ))}
          </div>
        </section>

        <section className="shot-section">
          <div className="shot-section-head">
            <h2>Time selector field</h2>
            <p>Compact themed field — click to open the full picker.</p>
          </div>
          <div className="shot-grid">
            {SELECTOR_CARDS.map((card) => (
              <PickerCard key={`selector-${card.theme}`} {...card} />
            ))}
          </div>
        </section>

        <section className="shot-section">
          <div className="shot-section-head">
            <h2>24-hour dual ring</h2>
            <p>Outer 1–12, inner 13–23 / 00 — tip moves between rings.</p>
          </div>
          <div className="shot-grid">
            {FORMAT_24H_CARDS.map((card) => (
              <PickerCard key={`24h-${card.theme}-${card.time}`} {...card} />
            ))}
          </div>
        </section>

        <section className="shot-section">
          <div className="shot-section-head">
            <h2>Label density</h2>
            <p>
              Full digits or major markers only (`12/3/6/9` · `00/15/30/45`).
            </p>
          </div>
          <div className="shot-grid">
            {LABEL_CARDS.map((card) => (
              <PickerCard key={`label-${card.label}`} {...card} />
            ))}
          </div>
        </section>

        <footer className="shot-footer">
          <a href="/">← Full demo</a>
          <span aria-hidden="true">·</span>
          <a href="/stats">npm stats</a>
          <span aria-hidden="true">·</span>
          <code>handStyle</code>
          <span aria-hidden="true">·</span>
          <code>labelStyle</code>
          <span aria-hidden="true">·</span>
          <code>selector</code>
          <span aria-hidden="true">·</span>
          <code>format=&quot;24h&quot;</code>
          <span aria-hidden="true">·</span>
          <span>npm i cool-cute-react-time-picker</span>
        </footer>
      </div>
    </>
  );
}
