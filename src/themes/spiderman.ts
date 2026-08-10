import type { CuteTimePickerTheme } from "../types";

export const spiderman: CuteTimePickerTheme = {
  id: "spiderman",
  name: "Spiderman",
  description: "Comic-book red and navy with swinging web energy.",
  colors: {
    background: "linear-gradient(165deg, #0b1a3a 0%, #142448 45%, #8b1018 100%)",
    surface: "rgba(12, 28, 64, 0.88)",
    surfaceSecondary: "rgba(185, 28, 40, 0.35)",
    primary: "#e11d2e",
    primaryHover: "#f43f4f",
    text: "#f8fafc",
    textSecondary: "#93a4c7",
    border: "rgba(225, 29, 46, 0.4)",
    clockBackground: "#0f2248",
    clockBorder: "rgba(225, 29, 46, 0.45)",
    hand: "#e11d2e",
    handle: "#e11d2e",
    buttonBackground: "linear-gradient(135deg, #b91c1c 0%, #e11d2e 55%, #1d4ed8 100%)",
    buttonText: "#ffffff",
    shadow: "0 22px 48px rgba(8, 12, 28, 0.55)",
    selectedNumber: "#e11d2e",
    selectedNumberText: "#ffffff",
    accent: "#60a5fa",
    glow: "rgba(225, 29, 46, 0.55)",
  },
  tokens: {
    radius: "26px",
    clockShadow:
      "0 0 28px rgba(225, 29, 46, 0.28), 0 14px 32px rgba(0, 0, 0, 0.35)",
    buttonShadow: "0 8px 20px rgba(185, 28, 28, 0.35)",
  },
  decorations: ["web", "sparkles"],
};
