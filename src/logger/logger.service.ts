import { Logger, ILogObj } from "tslog";

export class LoggerService {
  public logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger();
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    // тут может быть отправка в sentry
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
