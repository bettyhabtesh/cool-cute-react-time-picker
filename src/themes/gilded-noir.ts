import type { CuteTimePickerTheme } from "../types";

export const gildedNoir: CuteTimePickerTheme = {
  id: "gilded-noir",
  name: "Gilded Noir",
  description: "Luxurious black lacquer with warm gold accents that make up the Gilded Noir.",
  colors: {
    background: "linear-gradient(160deg, #0a0a0a 0%, #141210 45%, #1a1610 100%)",
    surface: "rgba(20, 18, 14, 0.94)",
    surfaceSecondary: "rgba(212, 175, 55, 0.14)",
    primary: "#d4af37",
    primaryHover: "#f0d060",
    text: "#f5ecd7",
    textSecondary: "#a8986e",
    border: "rgba(212, 175, 55, 0.28)",
    clockBackground: "#11100d",
    clockBorder: "rgba(212, 175, 55, 0.4)",
    hand: "#d4af37",
    handle: "#d4af37",
    buttonBackground: "linear-gradient(135deg, #9a7b2f 0%, #d4af37 50%, #f0d060 100%)",
    buttonText: "#0a0a0a",
    shadow: "0 22px 50px rgba(0, 0, 0, 0.55)",
    selectedNumber: "#d4af37",
    selectedNumberText: "#0a0a0a",
    accent: "#f0d060",
    glow: "rgba(212, 175, 55, 0.4)",
  },
  tokens: {
    radius: "22px",
    fontFamily: '"Cormorant Garamond", "Nunito", Georgia, serif',
    clockShadow:
      "0 0 28px rgba(212, 175, 55, 0.18), 0 16px 36px rgba(0, 0, 0, 0.45)",
    buttonShadow: "0 10px 24px rgba(212, 175, 55, 0.25)",
  },
  decorations: ["sparkles"],
};
