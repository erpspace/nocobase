/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import winston, { LeveledLogMethod, Logger as WinstonLogger } from 'winston';
import 'winston-daily-rotate-file';
interface Logger extends WinstonLogger {
    trace: LeveledLogMethod;
}
interface LoggerOptions extends Omit<winston.LoggerOptions, 'transports' | 'format'> {
    dirname?: string;
    filename?: string;
    format?: 'logfmt' | 'json' | 'delimiter' | 'console' | winston.Logform.Format;
    transports?: ('console' | 'file' | 'dailyRotateFile' | winston.transport)[];
}
export declare const levels: {
    trace: number;
    debug: number;
    info: number;
    warn: number;
    error: number;
};
export declare const createLogger: (options: LoggerOptions) => Logger;
/**
 * @internal
 */
export declare const createConsoleLogger: (options?: winston.LoggerOptions) => Logger;
export { Logger, LoggerOptions };
