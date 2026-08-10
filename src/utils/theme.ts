import type { CuteTimePickerTheme, ThemeInput } from "../types";
import type { CSSProperties } from "react";

const DEFAULT_TOKENS = {
  radius: "24px",
  fontFamily: '"Nunito", "Quicksand", system-ui, sans-serif',
};

/** Map a theme object to CSS custom properties for the picker root. */
export function themeToCssVars(theme: CuteTimePickerTheme): CSSProperties {
  const { colors, tokens = {}, cssVars = {} } = theme;
  const t = { ...DEFAULT_TOKENS, ...tokens };

  const vars: Record<string, string> = {
    "--ctp-background": colors.background,
    "--ctp-surface": colors.surface,
    "--ctp-surface-secondary": colors.surfaceSecondary,
    "--ctp-primary": colors.primary,
    "--ctp-primary-hover": colors.primaryHover,
    "--ctp-text": colors.text,
    "--ctp-text-secondary": colors.textSecondary,
    "--ctp-border": colors.border,
    "--ctp-clock-background": colors.clockBackground,
    "--ctp-clock-border": colors.clockBorder,
    "--ctp-hand": colors.hand,
    "--ctp-handle": colors.handle,
    "--ctp-button-background": colors.buttonBackground,
    "--ctp-button-text": colors.buttonText,
    "--ctp-shadow": colors.shadow,
    "--ctp-selected-number": colors.selectedNumber,
    "--ctp-selected-number-text": colors.selectedNumberText,
    "--ctp-glow": colors.glow ?? colors.primary,
    "--ctp-accent": colors.accent ?? colors.primary,
    "--ctp-radius": t.radius,
    "--ctp-font-family": t.fontFamily,
    "--ctp-clock-shadow": t.clockShadow ?? colors.shadow,
    "--ctp-button-shadow": t.buttonShadow ?? colors.shadow,
    ...cssVars,
  };

  return vars as CSSProperties;
}

export function isBuiltInThemeName(
  theme: ThemeInput,
): theme is Extract<ThemeInput, string> {
  return typeof theme === "string";
}

export function resolveTheme(
  theme: ThemeInput | undefined,
  themes: Record<string, CuteTimePickerTheme>,
  fallback: CuteTimePickerTheme,
): CuteTimePickerTheme {
  if (!theme) return fallback;
  if (typeof theme === "string") {
    return themes[theme] ?? fallback;
  }
  return theme;
}
