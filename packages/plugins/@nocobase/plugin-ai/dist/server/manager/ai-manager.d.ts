/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Application } from '@nocobase/server';
import { LLMProvider } from '../llm-providers/provider';
export type LLMProviderOptions = {
    title: string;
    provider: new (opts: {
        app: Application;
        serviceOptions?: any;
        chatOptions?: any;
    }) => LLMProvider;
};
export declare class AIManager {
    llmProviders: Map<string, LLMProviderOptions>;
    registerLLMProvider(name: string, options: LLMProviderOptions): void;
    listLLMProviders(): {
        name: string;
        title: string;
    }[];
}
