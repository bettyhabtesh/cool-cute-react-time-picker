export { CuteTimePicker } from "./components/CuteTimePicker";
export type {
  CuteTimePickerProps,
  CuteTimePickerTheme,
  BuiltInThemeName,
  ThemeInput,
  ThemeColors,
  ThemeTokens,
  ThemeMeta,
  TimeFormat,
  PickerSize,
  MinuteStep,
  Meridiem,
  ParsedTime,
  DecorationKind,
  SelectionMode,
  ClockLabelStyle,
  ClockHandStyle,
} from "./types";

export {
  builtInThemes,
  themeList,
  defaultTheme,
  blushBloom,
  midnightOrbit,
  sugarCloud,
  sageGarden,
  violetDream,
  latteGlow,
  skyDaydream,
  twilightCity,
  spiderman,
  cleanModern,
  gildedNoir,
  italic,
} from "./themes";

export {
  parseTime,
  formatTime,
  formatDisplayTime,
  to12Hour,
  to24Hour,
  displayHour,
  snapToStep,
  getMinuteLabels,
  isTimeInRange,
  clampTimeToRange,
} from "./utils/time";

export {
  pointerToClockAngle,
  hourToAngle,
  minuteToAngle,
  angleToHour,
  angleToMinute,
  polarToCartesian,
} from "./utils/geometry";

export { themeToCssVars, resolveTheme } from "./utils/theme";
