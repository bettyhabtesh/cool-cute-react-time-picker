import type { CuteTimePickerTheme } from "../types";

export const skyDaydream: CuteTimePickerTheme = {
  id: "sky-daydream",
  name: "Sky Daydream",
  description: "Bright daytime skies with fluffy clouds and sun.",
  colors: {
    background: "linear-gradient(180deg, #d6efff 0%, #e8f6ff 40%, #f5fbff 100%)",
    surface: "rgba(255, 255, 255, 0.92)",
    surfaceSecondary: "rgba(190, 225, 250, 0.55)",
    primary: "#4aa8e0",
    primaryHover: "#3a94c9",
    text: "#2a4a5c",
    textSecondary: "#6a8a9c",
    border: "rgba(74, 168, 224, 0.28)",
    clockBackground: "#ffffff",
    clockBorder: "rgba(74, 168, 224, 0.25)",
    hand: "#4aa8e0",
    handle: "#4aa8e0",
    buttonBackground: "#4aa8e0",
    buttonText: "#ffffff",
    shadow: "0 18px 40px rgba(70, 140, 190, 0.18)",
    selectedNumber: "#4aa8e0",
    selectedNumberText: "#ffffff",
    accent: "#f6c84c",
    glow: "rgba(74, 168, 224, 0.35)",
  },
  tokens: {
    radius: "28px",
    clockShadow: "0 12px 28px rgba(70, 140, 190, 0.14)",
  },
  decorations: ["clouds", "sun"],
};
