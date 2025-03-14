/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Processor, Instruction, FlowNodeModel, JobModel } from '@nocobase/plugin-workflow';
export type LoopInstructionConfig = {
    target: any;
    condition?: {
        checkpoint?: number;
        continueOnFalse?: boolean;
        calculation?: any;
        expression?: string;
    } | false;
    exit?: number;
};
export default class extends Instruction {
    run(node: FlowNodeModel, prevJob: JobModel, processor: Processor): Promise<JobModel | {
        status: 1;
        result: {
            looped: number;
        };
    }>;
    resume(node: FlowNodeModel, branchJob: any, processor: Processor): Promise<any>;
    getScope(node: any, { looped }: {
        looped: any;
    }, processor: any): {
        item: any;
        index: any;
        sequence: any;
        length: number;
    };
}
