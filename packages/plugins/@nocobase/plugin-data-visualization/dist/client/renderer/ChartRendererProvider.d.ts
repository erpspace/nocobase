/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export type MeasureProps = {
    field: string | string[];
    aggregation?: string;
    alias?: string;
};
export type DimensionProps = {
    field: string | string[];
    alias?: string;
    format?: string;
};
export type TransformProps = {
    field: string;
    type: string;
    format: string;
    argument?: string | number;
};
export type QueryProps = Partial<{
    measures: MeasureProps[];
    dimensions: DimensionProps[];
    orders: {
        field: string;
        order: 'asc' | 'desc';
    }[];
    filter: any;
    limit: number;
    offset: number;
    sql: {
        fields?: string;
        clauses?: string;
    };
}>;
export type ChartRendererProps = {
    collection: string;
    dataSource?: string;
    query?: QueryProps;
    config?: {
        chartType: string;
        general: any;
        advanced: any;
        title?: string;
        bordered?: boolean;
    };
    transform?: TransformProps[];
    mode?: 'builder' | 'sql';
    disableAutoRefresh?: boolean;
};
export declare const ChartRendererContext: React.Context<{
    service: any;
    data?: any[];
    autoRefresh?: number | boolean;
    setAutoRefresh?: (autoRefresh: number | boolean) => void;
    showActionBar?: boolean;
} & ChartRendererProps>;
export declare const ChartRendererProvider: React.FC<ChartRendererProps>;
