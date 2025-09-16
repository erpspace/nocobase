/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Plugin from '..';
import type { ExecutionModel, FlowNodeModel } from '../types';
export type CustomFunction = (this: {
    execution: ExecutionModel;
    node?: FlowNodeModel;
}) => any;
export declare const dateRangeFns: {
    yesterday(): any;
    today(): any;
    tomorrow(): any;
    lastWeek(): any;
    thisWeek(): any;
    nextWeek(): any;
    lastMonth(): any;
    thisMonth(): any;
    nextMonth(): any;
    lastQuarter(): any;
    thisQuarter(): any;
    nextQuarter(): any;
    lastYear(): any;
    thisYear(): any;
    nextYear(): any;
    last7Days(): (string | number)[];
    next7Days(): (string | number)[];
    last30Days(): (string | number)[];
    next30Days(): (string | number)[];
    last90Days(): (string | number)[];
    next90Days(): (string | number)[];
};
export default function ({ functions }: Plugin, more?: {
    [key: string]: CustomFunction;
}): void;
