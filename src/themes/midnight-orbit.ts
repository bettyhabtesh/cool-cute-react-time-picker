import type { CuteTimePickerTheme } from "../types";

export const midnightOrbit: CuteTimePickerTheme = {
  id: "midnight-orbit",
  name: "Midnight Orbit",
  description: "Cosmic navy night with glowing purple orbits.",
  colors: {
    background: "linear-gradient(160deg, #0b1020 0%, #151b33 55%, #1a1430 100%)",
    surface: "rgba(22, 28, 48, 0.92)",
    surfaceSecondary: "rgba(40, 48, 78, 0.75)",
    primary: "#a78bfa",
    primaryHover: "#c4b5fd",
    text: "#e8e6ff",
    textSecondary: "#9b97c4",
    border: "rgba(167, 139, 250, 0.28)",
    clockBackground: "#1c2340",
    clockBorder: "rgba(167, 139, 250, 0.35)",
    hand: "#c4b5fd",
    handle: "#a78bfa",
    buttonBackground: "linear-gradient(135deg, #7c5cfc 0%, #a78bfa 100%)",
    buttonText: "#ffffff",
    shadow: "0 20px 48px rgba(8, 6, 24, 0.55)",
    selectedNumber: "#a78bfa",
    selectedNumberText: "#0b1020",
    accent: "#818cf8",
    glow: "rgba(167, 139, 250, 0.55)",
  },
  tokens: {
    radius: "26px",
    clockShadow: "0 0 32px rgba(167, 139, 250, 0.22), 0 16px 32px rgba(0,0,0,0.35)",
  },
  decorations: ["moon", "stars"],
};
