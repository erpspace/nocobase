/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Col, Formatter } from './formatter';
export declare class MySQLFormatter extends Formatter {
    convertFormat(format: string): string;
    formatDate(field: Col, format: string, timezoneOffset?: string): import("sequelize/types/utils").Fn;
    formatUnixTimeStamp(field: string, format: string, accuracy?: 'second' | 'millisecond', timezoneOffset?: string): import("sequelize/types/utils").Fn;
}
