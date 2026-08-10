import type { CuteTimePickerTheme } from "../types";

export const blushBloom: CuteTimePickerTheme = {
  id: "blush-bloom",
  name: "Blush Bloom",
  description: "Soft floral romance with warm cream and coral-pink accents.",
  colors: {
    background: "linear-gradient(165deg, #fff6f2 0%, #ffe8e0 45%, #ffd6cc 100%)",
    surface: "rgba(255, 252, 250, 0.92)",
    surfaceSecondary: "rgba(255, 230, 222, 0.7)",
    primary: "#e8796a",
    primaryHover: "#d46658",
    text: "#5c3d36",
    textSecondary: "#a07870",
    border: "rgba(232, 121, 106, 0.22)",
    clockBackground: "#fffaf8",
    clockBorder: "rgba(232, 121, 106, 0.18)",
    hand: "#e8796a",
    handle: "#e8796a",
    buttonBackground: "#e8796a",
    buttonText: "#ffffff",
    shadow: "0 18px 40px rgba(200, 110, 90, 0.18)",
    selectedNumber: "#e8796a",
    selectedNumberText: "#ffffff",
    accent: "#f2a39a",
    glow: "rgba(232, 121, 106, 0.35)",
  },
  tokens: {
    radius: "28px",
    clockShadow: "0 12px 28px rgba(200, 110, 90, 0.14)",
  },
  decorations: ["flowers"],
};
