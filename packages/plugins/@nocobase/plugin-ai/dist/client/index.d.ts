/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
import { Plugin } from '@nocobase/client';
import { AIManager } from './manager/ai-manager';
declare const Chat: import("react").FC<{}>;
declare const ModelSelect: import("react").FC<{}>;
export declare class PluginAIClient extends Plugin {
    aiManager: AIManager;
    afterAdd(): Promise<void>;
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
}
export default PluginAIClient;
export { Chat, ModelSelect };
export type { LLMProviderOptions } from './manager/ai-manager';
