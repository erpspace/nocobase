/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import APIDocPlugin from '../server';
export declare class SwaggerManager {
    private plugin;
    constructor(plugin: APIDocPlugin);
    private get app();
    private get db();
    generateSwagger(options?: {
        plugins?: string[];
    }): Promise<unknown>;
    getSwagger(): Promise<unknown>;
    collection2Swagger(collectionName: string, withAssociation?: boolean): Promise<{
        paths: any;
        components: {
            parameters: {};
            schemas: {
                [x: string]: {
                    type: string;
                    properties: {};
                    allOf?: undefined;
                } | {
                    allOf: ({
                        $ref: string;
                        type?: undefined;
                        properties?: undefined;
                    } | {
                        type: string;
                        properties: any;
                        $ref?: undefined;
                    })[];
                    type?: undefined;
                    properties?: undefined;
                };
            };
        };
        tags: {
            name: string;
            description: string;
        }[];
    }>;
    getCollectionsSwagger(name?: string): Promise<unknown>;
    getPluginsSwagger(pluginName?: string): Promise<unknown>;
    getCoreSwagger(): Promise<unknown>;
    getURL(pathname: string): string;
    getUrls(): Promise<any[]>;
    private getBaseSwagger;
    private generateSchemas;
    private generateCollectionBuiltInInterface;
    private loadSwaggers;
}
