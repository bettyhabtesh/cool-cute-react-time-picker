import type { CuteTimePickerTheme } from "../types";

export const twilightCity: CuteTimePickerTheme = {
  id: "twilight-city",
  name: "Twilight City",
  description: "Romantic sunset skyline with glowing horizon.",
  colors: {
    background:
      "linear-gradient(180deg, #2d1b4e 0%, #5a2d6b 40%, #c45c4a 78%, #e89050 100%)",
    surface: "rgba(45, 28, 72, 0.55)",
    surfaceSecondary: "rgba(90, 45, 107, 0.5)",
    primary: "#e879a9",
    primaryHover: "#f09aba",
    text: "#fff5f8",
    textSecondary: "#e0c0d0",
    border: "rgba(232, 121, 169, 0.35)",
    clockBackground: "rgba(30, 18, 50, 0.65)",
    clockBorder: "rgba(232, 121, 169, 0.35)",
    hand: "#e879a9",
    handle: "#e879a9",
    buttonBackground: "#5a2d6b",
    buttonText: "#ffffff",
    shadow: "0 22px 48px rgba(20, 8, 30, 0.45)",
    selectedNumber: "#e879a9",
    selectedNumberText: "#2d1b4e",
    accent: "#f0a060",
    glow: "rgba(232, 121, 169, 0.5)",
  },
  tokens: {
    radius: "26px",
    clockShadow: "0 0 28px rgba(232, 121, 169, 0.25), 0 14px 32px rgba(0,0,0,0.25)",
  },
  decorations: ["city", "stars", "sun"],
};
