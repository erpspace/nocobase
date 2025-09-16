/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
type ChartData = {
    dataSource: string;
    collection: string;
    service: any;
    query: any;
};
export declare const ChartDataContext: React.Context<{
    charts: {
        [uid: string]: ChartData;
    };
    addChart: (uid: string, chart: ChartData) => void;
    removeChart: (uid: string) => void;
}>;
export declare const ChartDataProvider: React.FC;
export {};
