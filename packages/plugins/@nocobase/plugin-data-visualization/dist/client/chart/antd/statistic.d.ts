/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AntdChart } from './antd';
import { ChartType, RenderProps } from '../chart';
export declare class Statistic extends AntdChart {
    constructor();
    init: ChartType['init'];
    getProps({ data, fieldProps, general, advanced }: RenderProps): any;
}
