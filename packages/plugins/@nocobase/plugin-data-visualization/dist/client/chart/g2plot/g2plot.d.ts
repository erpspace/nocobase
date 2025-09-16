/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Chart, ChartProps, ChartType, RenderProps } from '../chart';
export declare class G2PlotChart extends Chart {
    constructor({ name, title, Component, config }: ChartProps);
    init: ChartType['init'];
    getProps({ data, general, advanced, fieldProps }: RenderProps): any;
    getReference(): {
        title: string;
        link: string;
    };
}
