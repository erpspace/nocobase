/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import winston from 'winston';
import { LoggerOptions } from './logger';
/**
 * @internal
 */
export declare const getFormat: (format?: LoggerOptions['format']) => winston.Logform.Format;
/**
 * @internal
 */
export declare const colorFormat: winston.Logform.Format;
/**
 * @internal
 */
export declare const stripColorFormat: winston.Logform.Format;
/**
 * @internal
 *https://brandur.org/logfmt
 */
export declare const logfmtFormat: winston.Logform.Format;
/**
 * @internal
 */
export declare const consoleFormat: winston.Logform.Format;
/**
 * @internal
 */
export declare const delimiterFormat: winston.Logform.Format;
/**
 * @internal
 */
export declare const escapeFormat: winston.Logform.Format;
/**
 * @internal
 */
export declare const sortFormat: winston.Logform.Format;
