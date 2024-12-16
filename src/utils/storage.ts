const PREFIX = 'aiclubx_';

export const storage = {
  set(key: string, value: unknown): void {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage error:', error);
      return defaultValue;
    }
  },

  remove(key: string): void {
    localStorage.removeItem(`${PREFIX}${key}`);
  },

  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
};