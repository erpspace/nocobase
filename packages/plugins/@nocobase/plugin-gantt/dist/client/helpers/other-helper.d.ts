/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
import { BarTask } from '../types/bar-task';
import { Task } from '../types/public-types';
export declare function isKeyboardEvent(event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent): event is React.KeyboardEvent;
export declare function isMouseEvent(event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent): event is React.MouseEvent;
export declare function isBarTask(task: Task | BarTask): task is BarTask;
export declare function removeHiddenTasks(tasks: Task[]): Task[];
export declare const sortTasks: (taskA: Task, taskB: Task) => 0 | 1 | -1;
export declare const getYmd: (date: Date) => string | 0;
