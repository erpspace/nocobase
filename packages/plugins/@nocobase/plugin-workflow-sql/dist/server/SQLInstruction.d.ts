/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Processor, Instruction, FlowNodeModel } from '@nocobase/plugin-workflow';
export type SQLInstructionConfig = {
    dataSource?: string;
    sql?: string;
    withMeta?: boolean;
};
export default class extends Instruction {
    run(node: FlowNodeModel, input: any, processor: Processor): Promise<{
        status: 1;
        result?: undefined;
    } | {
        result: unknown[];
        status: 1;
    }>;
    test({ dataSource, sql, withMeta }?: SQLInstructionConfig): Promise<{
        result: unknown[];
        status: 1;
    } | {
        result: any;
        status: -2;
    }>;
}
