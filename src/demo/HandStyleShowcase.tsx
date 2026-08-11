import { useState } from "react";
import {
  CuteTimePicker,
  type BuiltInThemeName,
  type ClockHandStyle,
} from "../index";

interface ShowcaseCard {
  theme: BuiltInThemeName;
  time: string;
  handStyle: ClockHandStyle;
  label: string;
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

function PickerCard({ theme, time: initial, handStyle, label }: ShowcaseCard) {
  const [time, setTime] = useState(initial);

  return (
    <article className="shot-card">
      <div className="shot-card-meta">
        <h3>{label}</h3>
      </div>
      <CuteTimePicker
        theme={theme}
        value={time}
        onChange={setTime}
        handStyle={handStyle}
        size="sm"
        showActions={false}
        showTitle={false}
        format="12h"
        minuteStep={5}
      />
      <p className="shot-time">{time}</p>
    </article>
  );
}

export function HandStyleShowcase() {
  return (
    <div className="shot-page">
      <header className="shot-hero">
        <p className="shot-brand">Cool Cute React Time Picker</p>
        <h1>Three hand styles. Same smooth clock.</h1>
        <p className="shot-sub">
          Round handle, arrow pointer, or clean line — pick the tip that fits your UI.
        </p>
      </header>

      <section className="shot-section">
        <div className="shot-section-head">
          <h2>Round handle</h2>
          <p>Circular tip that lands on the selected hour or minute.</p>
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
          <p>Slim stem with a pointed tip — no round highlight on numbers.</p>
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

      <footer className="shot-footer">
        <code>handStyle=&quot;round&quot;</code>
        <span aria-hidden="true">·</span>
        <code>handStyle=&quot;pointer&quot;</code>
        <span aria-hidden="true">·</span>
        <code>handStyle=&quot;line&quot;</code>
        <span aria-hidden="true">·</span>
        <span>npm i cool-cute-react-time-picker</span>
      </footer>
    </div>
  );
}
