/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export interface IQueryConfig {
    id: number;
}
export interface IChartConfig {
    type: string;
    template: string;
    metric: string;
    dimension: string;
    category?: string;
    [key: string]: any;
}
export interface ChartBlockEngineMetaData {
    query: IQueryConfig;
    chart: IChartConfig;
}
export declare const useGetDataSet: (chartQueryId: number) => {
    loading: boolean;
    dataSet: any;
    error: Error;
};
declare const ChartBlockEngine: {
    ({ chartBlockEngineMetaData }: {
        chartBlockEngineMetaData: ChartBlockEngineMetaData;
    }): React.JSX.Element;
    Designer: () => React.JSX.Element;
};
export { ChartBlockEngine };
