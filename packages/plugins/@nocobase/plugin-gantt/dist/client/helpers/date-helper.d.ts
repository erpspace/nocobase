/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Task, ViewMode } from '../types/public-types';
declare const DateTimeFormat: {
    (locales?: string | string[], options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat;
    new (locales?: string | string[], options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat;
    supportedLocalesOf(locales: string | string[], options?: Intl.DateTimeFormatOptions): string[];
    readonly prototype: Intl.DateTimeFormat;
};
type DateTimeFormat = typeof DateTimeFormat;
type DateHelperScales = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
export declare const getCachedDateTimeFormat: (locString: string | string[], opts?: any) => DateTimeFormat;
export declare const addToDate: (date: Date, quantity: number, scale: DateHelperScales) => Date;
export declare const startOfDate: (date: Date, scale: DateHelperScales) => Date;
export declare const ganttDateRange: (tasks: Task[], viewMode: ViewMode, preStepsCount: number) => Date[];
export declare const seedDates: (startDate: Date, endDate: Date, viewMode: ViewMode) => Date[];
export declare const getLocaleMonth: (date: Date, locale: string) => any;
export declare const getLocalDayOfWeek: (date: Date, locale: string, format?: 'long' | 'short' | 'narrow' | undefined) => any;
export declare const getWeekNumberISO8601: (date: Date) => string;
export declare const getDaysInMonth: (month: number, year: number) => number;
export {};
