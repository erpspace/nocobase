/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import winston from 'winston';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
import { LoggerOptions } from './logger';
export declare const Transports: {
    console: (options?: winston.transports.ConsoleTransportOptions) => winston.transports.ConsoleTransportInstance;
    file: (options?: winston.transports.FileTransportOptions) => winston.transports.FileTransportInstance;
    dailyRotateFile: (options?: DailyRotateFileTransportOptions) => import("winston-daily-rotate-file");
};
/**
 * @internal
 */
export declare const getTransports: (options: LoggerOptions) => winston.transports.ConsoleTransportInstance | (import("winston-daily-rotate-file") | winston.transport)[];
