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
    parseCollectionData(dataSourceKey: any, formCollection: any, appends: any): Promise<{
        name: any;
        fields: {
            [x: string]: any;
            name: string;
            field: string;
            rawType: string;
            type: string;
            description?: string;
            interface?: string;
            uiSchema?: any;
            possibleTypes?: string[];
            defaultValue?: any;
            primaryKey?: boolean;
            unique?: boolean;
            allowNull?: boolean;
            autoIncrement?: boolean;
        }[];
        template: any;
    }[]>;
    getMetaByTk(filterByTk: string, options: {
        password?: string;
        token?: string;
    }): Promise<{
        passwordRequired: boolean;
        dataSource?: undefined;
        token?: undefined;
        schema?: undefined;
        title?: undefined;
    } | {
        dataSource: {
            key: any;
            displayName: any;
            collections: {
                name: any;
                fields: {
                    [x: string]: any;
                    name: string;
                    field: string;
                    rawType: string;
                    type: string;
                    description?: string;
                    interface?: string;
                    uiSchema?: any;
                    possibleTypes?: string[];
                    defaultValue?: any;
                    primaryKey?: boolean;
                    unique?: boolean;
                    allowNull?: boolean;
                    autoIncrement?: boolean;
                }[];
                template: any;
            }[];
        };
        token: string;
        schema: any;
        title: any;
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
