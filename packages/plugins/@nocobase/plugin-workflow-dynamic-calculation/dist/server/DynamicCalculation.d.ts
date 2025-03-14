/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { FlowNodeModel, Instruction, Processor } from '@nocobase/plugin-workflow';
export declare class DynamicCalculation extends Instruction {
    run(node: FlowNodeModel, prevJob: any, processor: Processor): Promise<{
        result: any;
        status: 1;
    } | {
        result: any;
        status: -2;
    }>;
}
