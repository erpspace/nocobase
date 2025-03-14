/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Col, Formatter } from './formatter';
export declare class SQLiteFormatter extends Formatter {
    convertFormat(format: string): string;
    getOffsetMinutesFromTimezone(timezone: string): string;
    formatDate(field: Col, format: string, timezone?: string): import("sequelize/types/utils").Fn;
    formatUnixTimeStamp(field: string, format: string, accuracy?: 'second' | 'millisecond', timezone?: string): import("sequelize/types/utils").Fn;
}
