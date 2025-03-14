/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type Processor from '../Processor';
import type { FlowNodeModel } from '../types';
import { Instruction } from '.';
export declare class QueryInstruction extends Instruction {
    run(node: FlowNodeModel, input: any, processor: Processor): Promise<{
        result: any;
        status: -1;
    } | {
        result: any;
        status: 1;
    }>;
}
export default QueryInstruction;
