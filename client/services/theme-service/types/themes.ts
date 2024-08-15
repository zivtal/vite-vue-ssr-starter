import { type ColorName } from './colors.ts';
import defaultTheme from '../../../json/themes/defualt.theme.json';

const THEME_NAME = ['default', 'warning'] as const;

export type ThemeColors = Record<ColorName, string>;
export type ThemeName = (typeof THEME_NAME)[number];
export type Themes = Record<ThemeName, typeof defaultTheme>;
