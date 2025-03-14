/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type Plugin from '../../Plugin';
import { WorkflowModel } from '../../types';
export default class StaticScheduleTrigger {
    workflow: Plugin;
    private timers;
    constructor(workflow: Plugin);
    inspect(workflows: WorkflowModel[]): void;
    getNextTime({ config, allExecuted }: WorkflowModel, currentDate: Date, nextSecond?: boolean): number;
    schedule(workflow: WorkflowModel, nextTime: number, toggle?: boolean): void;
    trigger(workflow: WorkflowModel, time: number): Promise<void>;
    on(workflow: any): void;
    off(workflow: any): void;
    execute(workflow: any, values: any, options: any): void | Promise<import("../..").Processor>;
}
