/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ChatOpenAI } from '@langchain/openai';
import { LLMProvider } from './provider';
export declare class OpenAIProvider extends LLMProvider {
    get baseURL(): string;
    createModel(): ChatOpenAI<import("@langchain/openai").ChatOpenAICallOptions>;
}
export declare const openaiProviderOptions: {
    title: string;
    provider: typeof OpenAIProvider;
};
