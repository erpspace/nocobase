/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Processor, Instruction, FlowNodeModel, JobModel } from '@nocobase/plugin-workflow';
export declare const PARALLEL_MODE: {
    readonly ALL: "all";
    readonly ANY: "any";
    readonly RACE: "race";
};
export default class extends Instruction {
    run(node: FlowNodeModel, prevJob: JobModel, processor: Processor): Promise<any>;
    resume(node: FlowNodeModel, branchJob: any, processor: Processor): Promise<any>;
}
