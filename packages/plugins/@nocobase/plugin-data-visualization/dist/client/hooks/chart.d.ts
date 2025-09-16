/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
export declare const useSetChartSize: (size: {
    type: 'fixed' | 'ratio';
    ratio?: {
        width: number;
        height: number;
    };
    fixed?: number;
}, fixedHeight?: number) => {
    chartRef: import("react").MutableRefObject<any>;
    chartHeight: number;
};
