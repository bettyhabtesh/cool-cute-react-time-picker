import type { CuteTimePickerTheme } from "../types";

export const sageGarden: CuteTimePickerTheme = {
  id: "sage-garden",
  name: "Sage Garden",
  description: "Peaceful botanical greens and warm cream.",
  colors: {
    background: "linear-gradient(165deg, #f4f6ef 0%, #e8efe3 50%, #dce8d6 100%)",
    surface: "rgba(252, 253, 248, 0.94)",
    surfaceSecondary: "rgba(220, 232, 214, 0.7)",
    primary: "#6b8f71",
    primaryHover: "#5a7a60",
    text: "#3d4a3f",
    textSecondary: "#7a8a7c",
    border: "rgba(107, 143, 113, 0.25)",
    clockBackground: "#fbfcf8",
    clockBorder: "rgba(107, 143, 113, 0.22)",
    hand: "#6b8f71",
    handle: "#6b8f71",
    buttonBackground: "#6b8f71",
    buttonText: "#ffffff",
    shadow: "0 18px 40px rgba(90, 120, 95, 0.16)",
    selectedNumber: "#6b8f71",
    selectedNumberText: "#ffffff",
    accent: "#a8c4a0",
    glow: "rgba(107, 143, 113, 0.3)",
  },
  tokens: {
    radius: "26px",
    clockShadow: "0 12px 28px rgba(90, 120, 95, 0.12)",
  },
  decorations: ["leaves"],
};
