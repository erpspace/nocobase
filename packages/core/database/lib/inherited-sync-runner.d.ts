/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare class InheritedSyncRunner {
    static syncInheritModel(model: any, options: any): Promise<void>;
    static createTable(tableName: any, attributes: any, options: any, model: any, parents: any): Promise<any>;
}
