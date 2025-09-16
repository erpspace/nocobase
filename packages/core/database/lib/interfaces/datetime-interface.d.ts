/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseInterface } from './base-interface';
export declare class DatetimeInterface extends BaseInterface {
    protected parseDateString(value: string): {
        year: string;
        month: string;
        day: string;
        hour: string;
        minute: string;
        second: string;
    } | {
        year: string;
        month: string;
        day: string;
        hour?: undefined;
        minute?: undefined;
        second?: undefined;
    };
    protected formatDateTimeToISO(dateInfo: {
        year: string;
        month: string;
        day: string;
        hour?: string;
        minute?: string;
        second?: string;
    }): string;
    toValue(value: any, ctx?: any): Promise<any>;
    toString(value: any, ctx?: any): any;
}
