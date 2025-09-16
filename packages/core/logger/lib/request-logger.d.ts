/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Logger, LoggerOptions } from './logger';
export interface RequestLoggerOptions extends LoggerOptions {
    skip?: (ctx?: any) => Promise<boolean>;
    requestWhitelist?: string[];
    responseWhitelist?: string[];
}
export declare const requestLogger: (appName: string, requestLogger: Logger, options?: RequestLoggerOptions) => (ctx: any, next: any) => Promise<void>;
