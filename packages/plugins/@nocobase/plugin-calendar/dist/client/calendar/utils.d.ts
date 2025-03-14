/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import dayjs from 'dayjs';
export declare const toEvents: (data: any[], fieldNames: any) => {
    id: any;
    title: any;
    start: Date;
    end: Date;
}[];
export declare const getLunarDay: (date: dayjs.Dayjs | string) => string | number;
export declare const formatDate: (date: dayjs.Dayjs) => string;
