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
  | "twilight-city";

export type TimeFormat = "12h" | "24h";
export type PickerSize = "sm" | "md" | "lg";
export type SelectionMode = "hour" | "minute" | "second";
export type MinuteStep = 1 | 5 | 10 | 15 | 30;
export type Meridiem = "AM" | "PM";

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
  | "scallop";

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
