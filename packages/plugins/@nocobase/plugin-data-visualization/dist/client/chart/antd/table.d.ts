/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { RenderProps } from '../chart';
import { AntdChart } from './antd';
export declare class Table extends AntdChart {
    constructor();
    getProps({ data, fieldProps, general, advanced }: RenderProps): any;
}
