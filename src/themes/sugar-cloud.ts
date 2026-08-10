import type { CuteTimePickerTheme } from "../types";

export const sugarCloud: CuteTimePickerTheme = {
  id: "sugar-cloud",
  name: "Sugar Cloud",
  description: "Cozy cream pastels with soft pink sweetness.",
  colors: {
    background: "linear-gradient(170deg, #fff9f4 0%, #fff0e8 50%, #ffe4f0 100%)",
    surface: "rgba(255, 253, 250, 0.95)",
    surfaceSecondary: "rgba(255, 228, 236, 0.65)",
    primary: "#f4a4b8",
    primaryHover: "#e889a0",
    text: "#6b4a52",
    textSecondary: "#b08a94",
    border: "rgba(244, 164, 184, 0.3)",
    clockBackground: "#fffdfb",
    clockBorder: "rgba(244, 164, 184, 0.45)",
    hand: "#f4a4b8",
    handle: "#f4a4b8",
    buttonBackground: "#f4a4b8",
    buttonText: "#ffffff",
    shadow: "0 16px 36px rgba(220, 140, 160, 0.2)",
    selectedNumber: "#f4a4b8",
    selectedNumberText: "#ffffff",
    accent: "#f6d06a",
    glow: "rgba(244, 164, 184, 0.4)",
  },
  tokens: {
    radius: "30px",
    clockShadow: "0 10px 24px rgba(220, 140, 160, 0.16)",
  },
  decorations: ["hearts", "sparkles", "scallop", "bear"],
};
