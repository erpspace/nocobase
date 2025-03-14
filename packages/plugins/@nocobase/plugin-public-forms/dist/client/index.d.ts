/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema, Plugin } from '@nocobase/client';
export declare class PluginPublicFormsClient extends Plugin {
    protected formTypes: Map<any, any>;
    registerFormType(type: string, options: {
        label: string;
        uiSchema: (options: any) => ISchema;
    }): void;
    getFormSchemaByType(type?: string): any;
    getFormTypeOptions(): any[];
    load(): Promise<void>;
}
export default PluginPublicFormsClient;
