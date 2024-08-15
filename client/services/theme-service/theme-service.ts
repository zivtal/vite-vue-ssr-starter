import { COLORS_MAP, type ColorsMap, ThemeName, Themes } from './types';
import { THEMES } from '../../json/themes';

type Config = Partial<{ name: ThemeName; invert: boolean }>;

export default class ThemeService {
  private static readonly prefix: string = 'color';
  private static themes: Themes = THEMES;
  private static debounce: ReturnType<typeof setTimeout>;
  public static config: Config = {
    name: (localStorage.getItem('theme') as Config['name']) || 'default',
    invert: localStorage.getItem('theme_invert') === 'true',
  };

  public static color(colorName?: ColorsMap | string): string | undefined {
    return colorName ? COLORS_MAP[colorName as ColorsMap] || colorName : undefined;
  }

  public static set(config?: Config): void {
    this.config = { ...this.config, ...(config || {}) };
    const { name, invert } = this.config;

    document.getElementById('theme-style')?.remove();
    const themeStyle = document.createElement('style');
    themeStyle.id = 'theme-style';

    const themeContent = Object.entries(this.themes[name || 'default']).reduce((categories, [key, category]) => {
      return (
        categories +
        Object.entries(category).reduce((values, [level, value], currentIndex, bulk) => {
          if (invert) {
            value = bulk[bulk.length - currentIndex - 1][1];
          }

          return `${values}--${this.prefix}-${key}-${level}: ${value};`;
        }, '')
      );
    }, '');

    themeStyle.innerHTML = `:root {${themeContent}`;
    document.head.append(themeStyle);
    this.meta();
    localStorage.setItem('theme', this.config.name!);
    localStorage.setItem('theme_invert', JSON.stringify(this.config.invert!));
  }

  public static invert(): void {
    clearTimeout(this.debounce);

    this.debounce = setTimeout(() => this.set({ ...this.config, invert: !this.config.invert }), 500);
  }

  private static meta(): void {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue(`--color-background-light`);

    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
  }
}
