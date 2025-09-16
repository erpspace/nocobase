/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { dayjs } from './dayjs';
export interface Str2momentOptions {
    gmt?: boolean;
    picker?: 'year' | 'month' | 'week' | 'quarter';
    utcOffset?: number;
    utc?: boolean;
    dateOnly?: boolean;
}
export type Str2momentValue = string | string[] | dayjs.Dayjs | dayjs.Dayjs[];
export interface GetDefaultFormatProps {
    format?: string;
    dateFormat?: string;
    timeFormat?: string;
    picker?: 'year' | 'month' | 'week' | 'quarter';
    showTime?: boolean;
}
export declare const getDefaultFormat: (props: GetDefaultFormatProps) => string;
export declare const toGmt: (value: dayjs.Dayjs) => string | dayjs.Dayjs;
export declare const toLocal: (value: dayjs.Dayjs) => string | any[] | dayjs.Dayjs;
export declare const str2moment: (value?: string | string[] | dayjs.Dayjs | dayjs.Dayjs[], options?: Str2momentOptions) => any;
export interface Moment2strOptions {
    showTime?: boolean;
    gmt?: boolean;
    picker?: 'year' | 'month' | 'week' | 'quarter';
}
export declare const moment2str: (value?: dayjs.Dayjs, options?: Moment2strOptions) => string | any[] | dayjs.Dayjs;
/**
 * from https://github.com/moment/moment/blob/dca02edaeceda3fcd52b20b51c130631a058a022/src/lib/units/offset.js#L55-L70
 */
export declare function offsetFromString(string: string | number): number;
export declare const getPickerFormat: (picker: any) => "YYYY-MM-DD" | "YYYY-MM" | "YYYY" | "YYYY[Q]Q" | "YYYY[W]W";
export declare const getDateTimeFormat: (picker: any, format: any, showTime: any, timeFormat: any) => any;
export declare function getFormatFromDateStr(dateStr: string): string | null;
