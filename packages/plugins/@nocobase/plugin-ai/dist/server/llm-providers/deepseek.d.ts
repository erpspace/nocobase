/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ChatDeepSeek } from '@langchain/deepseek';
import { LLMProvider } from './provider';
import { LLMProviderOptions } from '../manager/ai-manager';
export declare class DeepSeekProvider extends LLMProvider {
    get baseURL(): string;
    createModel(): ChatDeepSeek;
}
export declare const deepseekProviderOptions: LLMProviderOptions;
