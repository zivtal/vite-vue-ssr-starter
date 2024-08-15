import type { Themes } from '../../services/theme-service/types';
import defaultTheme from './defualt.theme.json';
import warningTheme from './warning.theme.json';

export const THEMES: Themes = { default: defaultTheme, warning: warningTheme };
