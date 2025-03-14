/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import WorkflowPlugin, { Processor, Instruction } from '@nocobase/plugin-workflow';
export default class extends Instruction {
    workflow: WorkflowPlugin;
    timers: Map<number, NodeJS.Timeout>;
    constructor(workflow: WorkflowPlugin);
    load: () => Promise<void>;
    unload: () => void;
    schedule(job: any): void;
    trigger(job: any): Promise<void>;
    run(node: any, prevJob: any, processor: Processor): Promise<any>;
    resume(node: any, prevJob: any, processor: Processor): Promise<any>;
}
