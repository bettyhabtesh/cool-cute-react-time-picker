import type { CuteTimePickerTheme } from "../types";

export const violetDream: CuteTimePickerTheme = {
  id: "violet-dream",
  name: "Violet Dream",
  description: "Magical lavender glow with dreamy purple depths.",
  colors: {
    background: "linear-gradient(155deg, #2a1848 0%, #3d2466 45%, #4a2a7a 100%)",
    surface: "rgba(55, 35, 95, 0.9)",
    surfaceSecondary: "rgba(90, 55, 140, 0.65)",
    primary: "#c084fc",
    primaryHover: "#d8b4fe",
    text: "#f3e8ff",
    textSecondary: "#c4b0e0",
    border: "rgba(192, 132, 252, 0.35)",
    clockBackground: "#35205a",
    clockBorder: "rgba(192, 132, 252, 0.4)",
    hand: "#e9d5ff",
    handle: "#c084fc",
    buttonBackground: "linear-gradient(135deg, #9333ea 0%, #c084fc 100%)",
    buttonText: "#ffffff",
    shadow: "0 22px 50px rgba(20, 8, 40, 0.5)",
    selectedNumber: "#c084fc",
    selectedNumberText: "#2a1848",
    accent: "#f0abfc",
    glow: "rgba(192, 132, 252, 0.6)",
  },
  tokens: {
    radius: "28px",
    clockShadow: "0 0 40px rgba(192, 132, 252, 0.35), 0 16px 36px rgba(0,0,0,0.3)",
  },
  decorations: ["stars", "sparkles"],
};
