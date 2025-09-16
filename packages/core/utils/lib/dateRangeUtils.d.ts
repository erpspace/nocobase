/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
type DateUnit = 'day' | 'week' | 'isoWeek' | 'month' | 'quarter' | 'year';
type RangeType = 'today' | 'yesterday' | 'tomorrow' | 'thisWeek' | 'lastWeek' | 'nextWeek' | 'thisMonth' | 'lastMonth' | 'nextMonth' | 'thisQuarter' | 'lastQuarter' | 'nextQuarter' | 'thisYear' | 'lastYear' | 'nextYear' | 'past' | 'next';
interface RangeParams {
    type: RangeType;
    unit?: DateUnit;
    number?: number;
    timezone?: string;
}
export declare const getOffsetRangeByParams: (params: RangeParams) => [string, string];
/**
 * 获取某个时间范围的起止时间（字符串格式）
 */
export declare const getDayRangeByParams: (params: RangeParams) => [string, string];
export {};
