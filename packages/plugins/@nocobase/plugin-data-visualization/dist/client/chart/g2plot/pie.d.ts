/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { G2PlotChart } from './g2plot';
import { ChartType, RenderProps } from '../chart';
export declare class Pie extends G2PlotChart {
    constructor();
    init: ChartType['init'];
    getProps({ data, general, advanced, fieldProps }: RenderProps): any;
}
