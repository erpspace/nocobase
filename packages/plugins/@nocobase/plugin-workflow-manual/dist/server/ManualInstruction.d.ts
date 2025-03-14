/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Registry } from '@nocobase/utils';
import WorkflowPlugin, { Processor, Instruction } from '@nocobase/plugin-workflow';
import { FormHandler } from './forms';
type FormType = {
    type: 'custom' | 'create' | 'update';
    actions: number[];
    options: {
        [key: string]: any;
    };
};
export interface ManualConfig {
    schema: {
        [key: string]: any;
    };
    forms: {
        [key: string]: FormType;
    };
    assignees?: (number | string)[];
    mode?: number;
    title?: string;
}
export default class extends Instruction {
    workflow: WorkflowPlugin;
    formTypes: Registry<FormHandler>;
    constructor(workflow: WorkflowPlugin);
    run(node: any, prevJob: any, processor: Processor): Promise<import("@nocobase/plugin-workflow").JobModel>;
    resume(node: any, job: any, processor: Processor): Promise<any>;
}
export {};
