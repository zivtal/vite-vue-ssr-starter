import defaultTheme from '../../../json/themes/defualt.theme.json';
type ColorKey = keyof typeof defaultTheme;

export const COLOR_KEY = [100, 200, 300, 400, 500, 600, 700, 800, 900];
export const COLOR_CATEGORY = ['mono', 'primary', 'green', 'yellow', 'red', 'mint'];

const COLOR_NUM = [...COLOR_KEY] as const;
const COLOR_NAME = [...COLOR_CATEGORY] as const;

export type ColorsKey = (typeof COLOR_NUM)[number];
export type ColorCategory = (typeof COLOR_NAME)[number];

export type ColorName = `${ColorCategory}-${ColorsKey}`;
export type ColorVars = Record<ColorName, `var(--color-${ColorCategory}-${ColorKey})`>;

export const COLORS_MAP: ColorVars = COLOR_CATEGORY.reduce(
  (map: ColorVars, category) => ({
    ...map,
    ...COLOR_KEY.reduce((colors: ColorVars, color) => ({ ...colors, [`${category}-${color}`]: `var(--color-${category}-${color})` }), {}),
  }),
  {}
);

export type ColorsMap = keyof typeof COLORS_MAP;
