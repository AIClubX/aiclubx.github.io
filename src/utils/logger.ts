// Browser-safe logger implementation
class BrowserLogger {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  private formatMessage(level: string, message: string, ...args: any[]): string {
    return `[${level.toUpperCase()}] ${this.prefix}${message}`;
  }

  info(message: string, ...args: any[]) {
    console.log(this.formatMessage('info', message), ...args);
  }

  warn(message: string, ...args: any[]) {
    console.warn(this.formatMessage('warn', message), ...args);
  }

  error(message: string, ...args: any[]) {
    console.error(this.formatMessage('error', message), ...args);
  }

  debug(message: string, ...args: any[]) {
    if (import.meta.env.DEV) {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }
}

export const logger = new BrowserLogger();