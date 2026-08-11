# Cool Cute React Time Picker

A beautiful, themed analog React time picker with cute built-in styles, TypeScript support, and a clean customizable API.

**Time picking, but make it cute.**

Analog clock selection, twelve distinctive built-in themes, full TypeScript support, and a polished API you can drop into any React web app.

## Installation

```bash
npm install cool-cute-react-time-picker
```

```bash
pnpm add cool-cute-react-time-picker
```

```bash
yarn add cool-cute-react-time-picker
```

### CSS (required)

Styles are **not** injected automatically. Import the package stylesheet once in your app entry (or beside the component):

```ts
import "cool-cute-react-time-picker/styles.css";
```

Without this import, the picker will render unstyled.

Alternative path (same file):

```ts
import "cool-cute-react-time-picker/dist/cool-cute-react-time-picker.css";
```

Prefer the `styles.css` export — it is the stable public path.

## Basic usage

```tsx
import { useState } from "react";
import { CuteTimePicker } from "cool-cute-react-time-picker";
import "cool-cute-react-time-picker/styles.css";

export function Example() {
  const [time, setTime] = useState("07:30");

  return (
    <CuteTimePicker
      value={time}
      onChange={setTime}
      theme="blush-bloom"
    />
  );
}
```

## Themes

Change personality with a single prop:

```tsx
<CuteTimePicker theme="blush-bloom" />
<CuteTimePicker theme="midnight-orbit" />
<CuteTimePicker theme="sugar-cloud" />
<CuteTimePicker theme="sage-garden" />
<CuteTimePicker theme="violet-dream" />
<CuteTimePicker theme="latte-glow" />
<CuteTimePicker theme="sky-daydream" />
<CuteTimePicker theme="twilight-city" />
<CuteTimePicker theme="spiderman" />
<CuteTimePicker theme="clean-modern" />
<CuteTimePicker theme="gilded-noir" />
<CuteTimePicker theme="italic" />
```

| Theme id | Name | Personality |
| --- | --- | --- |
| `blush-bloom` | Blush Bloom | Soft floral romance, cream + coral |
| `midnight-orbit` | Midnight Orbit | Cosmic navy with purple glow |
| `sugar-cloud` | Sugar Cloud | Cozy pastel cream and pink |
| `sage-garden` | Sage Garden | Botanical greens and calm cream |
| `violet-dream` | Violet Dream | Magical lavender glow |
| `latte-glow` | Latte Glow | Warm coffee-shop beige |
| `sky-daydream` | Sky Daydream | Bright sky, clouds, and sun |
| `twilight-city` | Twilight City | Sunset skyline romance |
| `spiderman` | Spiderman | Comic red & navy with web energy |
| `clean-modern` | Clean Modern | Minimal slate face; 12/3/6/9 only |
| `gilded-noir` | Gilded Noir | Luxurious black & gold |
| `italic` | Italic | Editorial ink & paper with italic type |

Theme metadata is also available as `themeList` / `builtInThemes`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Controlled time (`HH:mm` or `HH:mm:ss`) |
| `defaultValue` | `string` | `"07:30"` | Uncontrolled initial time |
| `onChange` | `(time: string) => void` | — | Fires on every time change |
| `onConfirm` | `(time: string) => void` | — | Fires when Done is pressed |
| `onCancel` | `() => void` | — | Fires on Cancel / Escape |
| `theme` | `BuiltInThemeName \| CuteTimePickerTheme` | `"blush-bloom"` | Built-in id or custom theme object |
| `format` | `"12h" \| "24h"` | `"12h"` | Clock format |
| `minuteStep` | `1 \| 5 \| 10 \| 15 \| 30` | `5` | Minute snap interval |
| `showActions` | `boolean` | `true` | Show Cancel / Done |
| `cancelLabel` | `string` | `"Cancel"` | Cancel button label |
| `confirmLabel` | `string` | `"Done"` | Confirm button label |
| `showTitle` | `boolean` | `true` | Show the header title |
| `title` | `string` | `"Select Time"` | Header title text |
| `handStyle` | `"round" \| "pointer" \| "line"` | `"round"` | Hand tip: round handle, arrow pointer, or slim line |
| `disabled` | `boolean` | `false` | Disable interaction |
| `minTime` | `string` | — | Minimum allowed time |
| `maxTime` | `string` | — | Maximum allowed time |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Visual size |
| `decorations` | `boolean` | `true` | Theme illustrations (SVG/CSS) |
| `showSeconds` | `boolean` | `false` | Include seconds |
| `secondsStep` | `number` | `1` | Second snap interval |
| `className` | `string` | — | Extra class on root |
| `style` | `CSSProperties` | — | Inline styles (merged after theme vars) |
| `aria-label` | `string` | `"Time picker"` | Accessible name |

## Controlled usage

```tsx
const [time, setTime] = useState("07:30");

<CuteTimePicker value={time} onChange={setTime} />
```

## Uncontrolled usage

```tsx
<CuteTimePicker defaultValue="07:30" onChange={console.log} />
```

## 12-hour and 24-hour formats

```tsx
<CuteTimePicker format="12h" /> // shows AM / PM
<CuteTimePicker format="24h" /> // no AM / PM
```

Values are always emitted in 24-hour `HH:mm` (or `HH:mm:ss`) form.

## Minute step

```tsx
<CuteTimePicker minuteStep={5} />
<CuteTimePicker minuteStep={1} />
<CuteTimePicker minuteStep={15} />
```

After choosing an hour, the picker advances to minute selection automatically. Click the hour or minute digits in the display to jump modes.

## Custom themes

```tsx
import {
  CuteTimePicker,
  type CuteTimePickerTheme,
} from "cool-cute-react-time-picker";

const myTheme: CuteTimePickerTheme = {
  id: "my-theme",
  name: "My Theme",
  colors: {
    background: "#fff8f5",
    surface: "#ffffff",
    surfaceSecondary: "#ffe8e0",
    primary: "#ff6b81",
    primaryHover: "#f2556d",
    text: "#222222",
    textSecondary: "#887070",
    border: "rgba(255,107,129,0.25)",
    clockBackground: "#ffffff",
    clockBorder: "rgba(255,107,129,0.2)",
    hand: "#ff6b81",
    handle: "#ff6b81",
    buttonBackground: "#ff6b81",
    buttonText: "#ffffff",
    shadow: "0 16px 36px rgba(255,107,129,0.18)",
    selectedNumber: "#ff6b81",
    selectedNumberText: "#ffffff",
  },
  tokens: {
    radius: "24px",
  },
  decorations: ["sparkles"],
};

<CuteTimePicker theme={myTheme} />;
```

Theme colors map to CSS variables such as `--ctp-primary`, `--ctp-clock-background`, `--ctp-hand`, and `--ctp-radius`. You can also pass `cssVars` for extra overrides.

## Decorations

Built-in themes may include flowers, leaves, clouds, stars, moon, sun, city skyline, hearts, sparkles, and more — implemented with SVG/CSS (no image assets).

```tsx
<CuteTimePicker theme="sky-daydream" decorations />
<CuteTimePicker theme="sky-daydream" decorations={false} />
```

## Events

```tsx
<CuteTimePicker
  value={time}
  onChange={setTime}
  onConfirm={(t) => {
    console.log("confirmed", t);
  }}
  onCancel={() => {
    console.log("cancelled");
  }}
  showActions
/>
```

## Accessibility

- Keyboard: Arrow keys adjust the active unit, Enter/Space commits hour → minute, Escape cancels
- Focus-visible outlines on interactive controls
- `role="slider"` on the analog clock with `aria-valuenow` / `aria-valuetext`
- AM/PM uses `aria-pressed`
- Selected clock numbers use `aria-selected`
- Honors `prefers-reduced-motion`

## Customization

- Swap themes or supply a full `CuteTimePickerTheme`
- Override CSS variables on a wrapper
- Use `className` / `style` for layout
- Toggle decorations and action buttons independently

```css
.my-picker {
  --ctp-primary: #ff6b81;
  --ctp-radius: 20px;
}
```

```tsx
<CuteTimePicker className="my-picker" theme="latte-glow" />
```

## Demo

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the full interactive demo:

1. **Theme gallery** — all twelve built-in themes side by side  
2. **Interactive playground** — tweak every public prop on a live picker

### Playground controls

| Control | Prop |
| --- | --- |
| Theme | `theme` |
| Hand style (theme default / round / pointer / line) | `handStyle` |
| Size | `size` |
| Decorations | `decorations` |
| Format (12h / 24h) | `format` |
| Minute step | `minuteStep` |
| Show seconds + seconds step | `showSeconds`, `secondsStep` |
| Min / max time | `minTime`, `maxTime` |
| Show title + title text | `showTitle`, `title` |
| Show actions + button labels | `showActions`, `cancelLabel`, `confirmLabel` |
| Disabled | `disabled` |

The playground also surfaces `onChange`, `onConfirm`, and `onCancel` as a live “Last event” readout.

### Hand styles showcase (screenshot page)

With the demo server running, open:

[http://localhost:5173/showcase.html](http://localhost:5173/showcase.html)

A clean LinkedIn-ready layout comparing `handStyle="round"`, `"pointer"`, and `"line"` across themes.

## Development

```bash
npm run test        # vitest
npm run build       # library: ESM + CJS + types + CSS
npm run build:demo  # static demo for Vercel
npm run typecheck
```

## License

MIT

## 👩‍💻 Author

**Bethelhem Habtamu**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Bethelhem%20Habtamu-blue?logo=linkedin)](https://www.linkedin.com/in/bethelhem-habtamu/)
[![GitHub](https://img.shields.io/badge/GitHub-bettyhabtesh-black?logo=github)](https://github.com/bettyhabtesh)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-orange?logo=vercel)](https://bettyhabtesh.vercel.app)
