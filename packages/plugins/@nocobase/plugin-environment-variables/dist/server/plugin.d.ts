/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
export declare class PluginEnvironmentVariablesServer extends Plugin {
    updated: boolean;
    get aesEncryptor(): import("@nocobase/server").AesEncryptor;
    handleSyncMessage(message: any): Promise<void>;
    load(): Promise<void>;
    registerACL(): void;
    listEnvironmentVariables(): Promise<any>;
    validateTexts(texts: Array<{
        text: string;
        secret: boolean;
    }>): void;
    setEnvironmentVariablesByText(texts: Array<{
        text: string;
        secret: boolean;
    }>): Promise<void>;
    onEnvironmentSaved(): void;
    loadVariables(): Promise<void>;
}
export default PluginEnvironmentVariablesServer;
