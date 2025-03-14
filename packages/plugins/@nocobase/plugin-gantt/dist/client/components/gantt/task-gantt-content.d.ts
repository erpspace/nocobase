/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { EventOption } from '../../types/public-types';
import { BarTask } from '../../types/bar-task';
import { GanttEvent } from '../../types/gantt-task-actions';
export type TaskGanttContentProps = {
    tasks: BarTask[];
    dates: Date[];
    ganttEvent: GanttEvent;
    selectedTask: BarTask | undefined;
    rowHeight: number;
    columnWidth: number;
    timeStep: number;
    svg?: React.RefObject<SVGSVGElement>;
    svgWidth: number;
    taskHeight: number;
    arrowColor: string;
    arrowIndent: number;
    fontSize: string;
    fontFamily: string;
    rtl: boolean;
    setGanttEvent: (value: GanttEvent) => void;
    setFailedTask: (value: BarTask | null) => void;
    setSelectedTask: (taskId: string) => void;
    loading?: boolean;
} & EventOption;
export declare const TaskGanttContent: React.FC<TaskGanttContentProps>;
