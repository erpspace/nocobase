/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const CalendarBlockContext: React.Context<any>;
export declare const CalendarBlockProvider: React.FunctionComponent<any>;
export declare const useCalendarBlockContext: () => any;
export declare const useCalendarBlockProps: () => {
    fieldNames: any;
    showLunar: any;
    defaultView: any;
    fixedBlock: any;
    getFontColor: any;
    getBackgroundColor: any;
};
