/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { DateSetup } from '../../types/date-setup';
import { ViewMode } from '../../types/public-types';
export type CalendarProps = {
    dateSetup: DateSetup;
    locale: string;
    viewMode: ViewMode;
    rtl: boolean;
    headerHeight: number;
    columnWidth: number;
    fontFamily: string;
    fontSize: string;
};
export declare const Calendar: React.FC<CalendarProps>;
