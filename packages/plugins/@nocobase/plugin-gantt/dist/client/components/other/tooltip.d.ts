/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { BarTask } from '../../types/bar-task';
import { Task } from '../../types/public-types';
export type TooltipProps = {
    task: BarTask;
    arrowIndent: number;
    rtl: boolean;
    svgContainerHeight: number;
    svgContainerWidth: number;
    svgWidth: number;
    headerHeight: number;
    taskListWidth: number;
    scrollX: number;
    scrollY: number;
    rowHeight: number;
    fontSize: string;
    fontFamily: string;
    TooltipContent: React.FC<{
        task: Task;
        fontSize: string;
        fontFamily: string;
    }>;
};
export declare const Tooltip: React.FC<TooltipProps>;
export declare const StandardTooltipContent: React.FC<{
    task: Task;
    fontSize: string;
    fontFamily: string;
}>;
