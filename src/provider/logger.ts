import pino from 'pino';
import { LoggerService } from '@nestjs/common';

export class PinoLogger implements LoggerService {
  private readonly logger: pino.Logger;

  constructor() {
    this.logger = pino();
  }

  log(message: any, context?: string, ...args: any[]) {
    this.defaultLog('info', message, context, args);
  }

  error(message: any, trace?: string, context?: string, ...args: any[]): any {
    const logger = this.getLogger(message);

    if (context) {
      logger.error({ context, trace }, message, ...args);
    } else {
      logger.error(message, ...args);
    }
  }

  warn(message: any, context?: string, ...args: any[]) {
    this.defaultLog('warn', message, context, args);
  }

  debug(message: any, context?: string, ...args: any[]) {
    this.defaultLog('debug', message, context, args);
  }

  verbose(message: any, context?: string, ...args: any[]) {
    this.defaultLog('trace', message, context, args);
  }

  private getLogger(message: any): pino.Logger {
    if (message.reqId) {
      return this.logger.child({ reqId: message.reqId as string });
    }

    return this.logger;
  }

  private defaultLog(
    key: 'info' | 'warn' | 'debug' | 'trace',
    message: any,
    context?: string,
    args?: any[],
  ): void {
    const logger = this.getLogger(message);

    if (context) {
      logger[key]({ context }, message, ...(args || []));
    } else {
      logger[key](message, ...(args || []));
    }
  }
}
