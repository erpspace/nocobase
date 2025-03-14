/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
export declare class PluginPublicFormsServer extends Plugin {
    parseCollectionData(formCollection: any, appends: any): Promise<{
        name: string;
        fields: any[];
        template: string;
    }[]>;
    getMetaByTk(filterByTk: string, options: {
        password?: string;
        token?: string;
    }): Promise<{
        passwordRequired: boolean;
        dataSource?: undefined;
        token?: undefined;
        schema?: undefined;
    } | {
        dataSource: {
            key: any;
            displayName: any;
            collections: {
                name: string;
                fields: any[];
                template: string;
            }[];
        };
        token: string;
        schema: any;
        passwordRequired?: undefined;
    }>;
    getPublicFormsMeta: (ctx: any, next: any) => Promise<void>;
    parseToken: (ctx: any, next: any) => Promise<any>;
    parseACL: (ctx: any, next: any) => Promise<any>;
    load(): Promise<void>;
    install(): Promise<void>;
    afterEnable(): Promise<void>;
    afterDisable(): Promise<void>;
    remove(): Promise<void>;
}
export default PluginPublicFormsServer;
