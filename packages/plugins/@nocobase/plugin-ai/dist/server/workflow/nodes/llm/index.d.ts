/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { FlowNodeModel, Instruction, Processor } from '@nocobase/plugin-workflow';
import { LLMProvider } from '../../../llm-providers/provider';
export declare class LLMInstruction extends Instruction {
    getLLMProvider(llmService: string, chatOptions: any): Promise<LLMProvider>;
    run(node: FlowNodeModel, input: any, processor: Processor): Promise<any>;
    resume(node: FlowNodeModel, job: any, processor: Processor): any;
}
