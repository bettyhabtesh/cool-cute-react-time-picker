import type { BuiltInThemeName, CuteTimePickerTheme, ThemeMeta } from "../types";
import { blushBloom } from "./blush-bloom";
import { midnightOrbit } from "./midnight-orbit";
import { sugarCloud } from "./sugar-cloud";
import { sageGarden } from "./sage-garden";
import { violetDream } from "./violet-dream";
import { latteGlow } from "./latte-glow";
import { skyDaydream } from "./sky-daydream";
import { twilightCity } from "./twilight-city";

export const builtInThemes: Record<BuiltInThemeName, CuteTimePickerTheme> = {
  "blush-bloom": blushBloom,
  "midnight-orbit": midnightOrbit,
  "sugar-cloud": sugarCloud,
  "sage-garden": sageGarden,
  "violet-dream": violetDream,
  "latte-glow": latteGlow,
  "sky-daydream": skyDaydream,
  "twilight-city": twilightCity,
};

export const themeList: ThemeMeta[] = (
  Object.values(builtInThemes) as CuteTimePickerTheme[]
).map((t) => ({
  id: t.id as BuiltInThemeName,
  name: t.name,
  description: t.description ?? "",
}));

export const defaultTheme = blushBloom;

export {
  blushBloom,
  midnightOrbit,
  sugarCloud,
  sageGarden,
  violetDream,
  latteGlow,
  skyDaydream,
  twilightCity,
};
