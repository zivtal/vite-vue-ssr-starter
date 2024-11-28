export default class LocalStorageService {
  public static save = <T>(key: string, value: T): void => {
    if (value === undefined) {
      localStorage.removeItem(key);

      return;
    }

    const data = ((): string => {
      return JSON.stringify(value);
    })();

    localStorage.setItem(key, data);
  };

  public static load = <T>(key: string): T | undefined => {
    return (() => {
      try {
        const cache = localStorage.getItem(key);

        return cache ? JSON.parse(cache) : undefined;
      } catch (e) {
        localStorage.removeItem(key);
      }
    })();
  };

  public static delete = (key: string): void => {
    localStorage.removeItem(key);
  };

  public static check = (key: string): boolean => {
    return !!localStorage.getItem(key);
  };
}
