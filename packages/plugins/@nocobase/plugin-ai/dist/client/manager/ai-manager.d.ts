/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ComponentType } from 'react';
export type LLMProviderOptions = {
    components: {
        ProviderSettingsForm?: ComponentType;
        ModelSettingsForm?: ComponentType;
    };
};
export declare class AIManager {
    llmProviders: any;
    chatSettings: Map<string, {
        title: string;
        Component: ComponentType;
    }>;
    registerLLMProvider(name: string, options: LLMProviderOptions): void;
}
