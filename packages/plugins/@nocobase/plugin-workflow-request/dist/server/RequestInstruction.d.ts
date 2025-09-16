/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AxiosRequestConfig } from 'axios';
import { Processor, Instruction, FlowNodeModel } from '@nocobase/plugin-workflow';
export interface Header {
    name: string;
    value: string;
}
export type RequestInstructionConfig = Pick<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data' | 'timeout'> & {
    headers?: Header[];
    contentType: string;
    ignoreFail?: boolean;
    onlyData?: boolean;
};
export default class extends Instruction {
    run(node: FlowNodeModel, prevJob: any, processor: Processor): Promise<{
        status: 1 | -1;
        result: any;
    }>;
    resume(node: FlowNodeModel, job: any, processor: Processor): Promise<any>;
    test(config: RequestInstructionConfig): Promise<{
        status: 1 | -1;
        result: any;
    }>;
}
