/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { Application } from '@nocobase/server';
export declare abstract class LLMProvider {
    serviceOptions: Record<string, any>;
    modelOptions: Record<string, any>;
    messages: any[];
    chatModel: any;
    chatHandlers: Map<string, () => Promise<void> | void>;
    abstract createModel(): BaseChatModel;
    get baseURL(): any;
    constructor(opts: {
        app: Application;
        serviceOptions: any;
        chatOptions?: {
            messages?: any[];
            [key: string]: any;
        };
    });
    registerChatHandler(name: string, handler: () => Promise<void> | void): void;
    invokeChat(): Promise<any>;
    listModels(): Promise<{
        models?: {
            id: string;
        }[];
        code?: number;
        errMsg?: string;
    }>;
}
