/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function flatten(target: any, opts?: any): {};
export declare function unflatten(obj: any, opts?: any): {};
export type ParseFilterOptions = {
    vars?: Record<string, any>;
    now?: any;
    timezone?: string;
    getField?: any;
};
export declare const parseFilter: (filter: any, opts?: ParseFilterOptions) => Promise<{}>;
export type GetDayRangeOptions = {
    now?: any;
    timezone?: string | number;
    offset: number;
};
export declare function getDayRange(options: GetDayRangeOptions): (string | number)[];
export type Utc2unitOptions = {
    now?: any;
    unit: any;
    timezone?: string | number;
    offset?: number;
};
export declare function utc2unit(options: Utc2unitOptions): any;
type ToUnitParams = {
    now?: any;
    timezone?: string | number;
    field?: {
        timezone?: string | number;
    };
};
export declare const toUnit: (unit: any, offset?: number) => ({ now, timezone, field }: ToUnitParams) => any;
export declare function getDateVars(): {
    now: string;
    today: ({ now, timezone, field }: ToUnitParams) => any;
    yesterday: ({ now, timezone, field }: ToUnitParams) => any;
    tomorrow: ({ now, timezone, field }: ToUnitParams) => any;
    thisWeek: ({ now, timezone, field }: ToUnitParams) => any;
    lastWeek: ({ now, timezone, field }: ToUnitParams) => any;
    nextWeek: ({ now, timezone, field }: ToUnitParams) => any;
    thisIsoWeek: ({ now, timezone, field }: ToUnitParams) => any;
    lastIsoWeek: ({ now, timezone, field }: ToUnitParams) => any;
    nextIsoWeek: ({ now, timezone, field }: ToUnitParams) => any;
    thisMonth: ({ now, timezone, field }: ToUnitParams) => any;
    lastMonth: ({ now, timezone, field }: ToUnitParams) => any;
    nextMonth: ({ now, timezone, field }: ToUnitParams) => any;
    thisQuarter: ({ now, timezone, field }: ToUnitParams) => any;
    lastQuarter: ({ now, timezone, field }: ToUnitParams) => any;
    nextQuarter: ({ now, timezone, field }: ToUnitParams) => any;
    thisYear: ({ now, timezone, field }: ToUnitParams) => any;
    lastYear: ({ now, timezone, field }: ToUnitParams) => any;
    nextYear: ({ now, timezone, field }: ToUnitParams) => any;
    last7Days: ({ now, timezone, field }: ToUnitParams) => (string | number)[];
    next7Days: ({ now, timezone, field }: ToUnitParams) => (string | number)[];
    last30Days: ({ now, timezone, field }: ToUnitParams) => (string | number)[];
    next30Days: ({ now, timezone, field }: ToUnitParams) => (string | number)[];
    last90Days: ({ now, timezone, field }: ToUnitParams) => (string | number)[];
    next90Days: ({ now, timezone, field }: ToUnitParams) => (string | number)[];
};
export declare function splitPathToTwoParts(path: string): string[];
export {};
