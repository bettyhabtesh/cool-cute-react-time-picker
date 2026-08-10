import type { CuteTimePickerTheme } from "../types";

export const latteGlow: CuteTimePickerTheme = {
  id: "latte-glow",
  name: "Latte Glow",
  description: "Warm coffee-shop beige with caramel accents.",
  colors: {
    background: "linear-gradient(165deg, #f7f0e6 0%, #efe4d4 50%, #e8d7c0 100%)",
    surface: "rgba(255, 251, 245, 0.95)",
    surfaceSecondary: "rgba(235, 220, 195, 0.7)",
    primary: "#c4a484",
    primaryHover: "#b08f6e",
    text: "#4a3b2f",
    textSecondary: "#8a7664",
    border: "rgba(196, 164, 132, 0.3)",
    clockBackground: "#fffcf7",
    clockBorder: "rgba(196, 164, 132, 0.28)",
    hand: "#c4a484",
    handle: "#c4a484",
    buttonBackground: "#c4a484",
    buttonText: "#ffffff",
    shadow: "0 16px 36px rgba(140, 110, 80, 0.16)",
    selectedNumber: "#c4a484",
    selectedNumberText: "#ffffff",
    accent: "#d4b896",
    glow: "rgba(196, 164, 132, 0.3)",
  },
  tokens: {
    radius: "24px",
    clockShadow: "0 14px 30px rgba(140, 110, 80, 0.14)",
    buttonShadow: "0 8px 18px rgba(140, 110, 80, 0.18)",
  },
  decorations: [],
};
