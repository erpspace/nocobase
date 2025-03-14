/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ChartType } from './chart';
interface Group {
    title: string;
    charts: ChartType[];
    sort?: number;
}
export declare class ChartGroup {
    /**
     * @internal
     */
    charts: Map<string, Group>;
    addGroup(name: string, group: Group): void;
    add(name: string, charts: ChartType | ChartType[]): void;
    /**
     * @internal
     */
    getChartTypes(): {
        label: string;
        children: {
            key: string;
            label: string;
            value: string;
        }[];
    }[];
    /**
     * @internal
     */
    getCharts(): {
        [key: string]: ChartType;
    };
    /**
     * @internal
     */
    getChart(type: string): ChartType;
}
/**
 * @internal
 */
export declare const useChartTypes: () => {
    label: string;
    children: {
        key: string;
        label: string;
        value: string;
    }[];
}[];
/**
 * @internal
 */
export declare const useDefaultChartType: () => string;
/**
 * @internal
 */
export declare const useCharts: () => {
    [key: string]: ChartType;
};
/**
 * @internal
 */
export declare const useChart: (type: string) => ChartType;
export {};
