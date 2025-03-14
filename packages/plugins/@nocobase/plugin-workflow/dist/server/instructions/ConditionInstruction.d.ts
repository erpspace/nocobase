/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Instruction } from '.';
import type Processor from '../Processor';
import type { FlowNodeModel, JobModel } from '../types';
export declare const BRANCH_INDEX: {
    readonly DEFAULT: any;
    readonly ON_TRUE: 1;
    readonly ON_FALSE: 0;
};
export declare class ConditionInstruction extends Instruction {
    run(node: FlowNodeModel, prevJob: any, processor: Processor): Promise<{
        status: 1;
        result: boolean;
        nodeId: number;
        nodeKey: any;
        upstreamId: any;
    } | {
        result: any;
        status: -2;
    } | {
        status: -1;
        result: boolean;
    }>;
    resume(node: FlowNodeModel, branchJob: JobModel, processor: Processor): Promise<any>;
}
export default ConditionInstruction;
