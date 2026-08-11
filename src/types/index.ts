import type { CSSProperties, ReactNode } from "react";

/** Built-in theme identifiers. */
export type BuiltInThemeName =
  | "blush-bloom"
  | "midnight-orbit"
  | "sugar-cloud"
  | "sage-garden"
  | "violet-dream"
  | "latte-glow"
  | "sky-daydream"
  | "twilight-city"
  | "spiderman"
  | "clean-modern"
  | "gilded-noir"
  | "italic";

export type TimeFormat = "12h" | "24h";
export type PickerSize = "sm" | "md" | "lg";
export type SelectionMode = "hour" | "minute" | "second";
export type MinuteStep = 1 | 5 | 10 | 15 | 30;
export type Meridiem = "AM" | "PM";

/** How hour (and related) face labels are rendered. */
export type ClockLabelStyle = "all" | "cardinal";

/**
 * Clock hand tip style.
 * - `round`: stem with a circular handle
 * - `pointer`: slim stem with a pointed arrow tip
 * - `line`: slim stem only — no circle, no arrow
 */
export type ClockHandStyle = "round" | "pointer" | "line";

export interface ParsedTime {
  hours: number; // 0–23
  minutes: number; // 0–59
  seconds: number; // 0–59
}

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  primary: string;
  primaryHover: string;
  text: string;
  textSecondary: string;
  border: string;
  clockBackground: string;
  clockBorder: string;
  hand: string;
  handle: string;
  buttonBackground: string;
  buttonText: string;
  shadow: string;
  selectedNumber: string;
  selectedNumberText: string;
  glow?: string;
  accent?: string;
}

export interface ThemeTokens {
  radius: string;
  fontFamily: string;
  clockShadow?: string;
  buttonShadow?: string;
}

export type DecorationKind =
  | "flowers"
  | "stars"
  | "moon"
  | "clouds"
  | "leaves"
  | "sun"
  | "city"
  | "hearts"
  | "sparkles"
  | "bear"
  | "scallop"
  | "web";

export interface CuteTimePickerTheme {
  /** Unique theme id used for CSS class / data attributes. */
  id: string;
  /** Human-readable theme name. */
  name: string;
  /** Short personality description. */
  description?: string;
  colors: ThemeColors;
  tokens?: Partial<ThemeTokens>;
  /** Built-in decoration kinds to render. */
  decorations?: DecorationKind[];
  /**
   * Clock label presentation.
   * - `all`: show every label as a digit
   * - `cardinal`: hours show 12/3/6/9 (others as dashes); minutes show 00/15/30/45
   */
  labelStyle?: ClockLabelStyle;
  /**
   * Clock hand tip style.
   * - `round`: stem with a circular handle (default)
   * - `pointer`: slim stem with a pointed arrow tip
   * - `line`: slim stem only — no circle, no arrow
   */
  handStyle?: ClockHandStyle;
  /** Optional CSS custom properties override map. */
  cssVars?: Record<string, string>;
}

export type ThemeInput = BuiltInThemeName | CuteTimePickerTheme;

export interface CuteTimePickerProps {
  /** Controlled time value in `HH:mm` or `HH:mm:ss` (24h). */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;

  onChange?: (time: string) => void;
  onConfirm?: (time: string) => void;
  onCancel?: () => void;

  theme?: ThemeInput;
  format?: TimeFormat;
  minuteStep?: MinuteStep;

  showActions?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;

  /** Show the header title. Default: true */
  showTitle?: boolean;
  /** Header title text. Default: `"Select Time"` */
  title?: string;

  /**
   * Clock hand tip style. Overrides the theme when set.
   * - `round`: circular handle (default)
   * - `pointer`: pointed arrow tip
   * - `line`: slim stem only — no circle, no arrow
   */
  handStyle?: ClockHandStyle;

  /**
   * Clock face label density. Overrides the theme when set.
   * - `all`: show every hour/minute label as a digit (default)
   * - `cardinal`: only major markers (hours 12/3/6/9, minutes 00/15/30/45); others as dashes
   */
  labelStyle?: ClockLabelStyle;

  /**
   * When true, render a compact time field. Clicking it opens the full picker.
   * Default: `false` (picker always visible).
   */
  selector?: boolean;
  /** Controlled open state for `selector` mode. */
  open?: boolean;
  /** Uncontrolled initial open state for `selector` mode. Default: `false` */
  defaultOpen?: boolean;
  /** Fires when the selector popover opens or closes. */
  onOpenChange?: (open: boolean) => void;

  disabled?: boolean;
  minTime?: string;
  maxTime?: string;

  className?: string;
  style?: CSSProperties;

  size?: PickerSize;

  showSeconds?: boolean;
  secondsStep?: number;

  /** Show theme-specific decorative illustrations. Default: true */
  decorations?: boolean;

  /** Accessible label for the picker. */
  "aria-label"?: string;

  /** Called when Escape is pressed (in addition to onCancel when actions shown). */
  onEscape?: () => void;

  children?: ReactNode;
}

export interface ThemeMeta {
  id: BuiltInThemeName;
  name: string;
  description: string;
}
