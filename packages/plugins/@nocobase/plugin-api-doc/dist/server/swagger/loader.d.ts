/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const loadSwagger: (packageName: string) => any;
export declare const getPluginsSwagger: (db: any, pluginNames?: string[]) => Promise<{}>;
export declare const mergeObjects: (objs: any[]) => any;
export declare const getSwaggerDocument: (db: any, pluginNames?: string[]) => Promise<any>;
