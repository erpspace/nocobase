/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Logger, LoggerOptions } from './logger';
export interface SystemLoggerOptions extends LoggerOptions {
    seperateError?: boolean;
}
export type logMethod = (message: string, meta?: {
    module?: string;
    submodule?: string;
    method?: string;
    [key: string]: any;
}) => SystemLogger;
export interface SystemLogger extends Omit<Logger, 'info' | 'warn' | 'error' | 'debug' | 'trace'> {
    info: logMethod;
    warn: logMethod;
    error: logMethod;
    debug: logMethod;
    trace: logMethod;
}
export declare const createSystemLogger: (options: SystemLoggerOptions) => SystemLogger;
export declare const logger: SystemLogger;
