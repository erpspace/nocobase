/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context } from '@nocobase/actions';
export declare const uiSchemaActions: {
    getJsonSchema: (ctx: any, next: any) => Promise<void>;
    getProperties: (ctx: any, next: any) => Promise<void>;
    getParentJsonSchema: (ctx: any, next: any) => Promise<void>;
    getParentProperty: (ctx: any, next: any) => Promise<void>;
    insert: (ctx: any, next: any) => Promise<void>;
    insertNewSchema: (ctx: any, next: any) => Promise<void>;
    remove: (ctx: any, next: any) => Promise<void>;
    patch: (ctx: any, next: any) => Promise<void>;
    initializeActionContext: (ctx: any, next: any) => Promise<void>;
    batchPatch: (ctx: any, next: any) => Promise<void>;
    clearAncestor: (ctx: any, next: any) => Promise<void>;
    insertAdjacent: (ctx: Context, next: any) => Promise<void>;
    insertBeforeBegin: (ctx: Context, next: any) => Promise<void>;
    insertAfterBegin: (ctx: Context, next: any) => Promise<void>;
    insertBeforeEnd: (ctx: Context, next: any) => Promise<void>;
    insertAfterEnd: (ctx: Context, next: any) => Promise<void>;
    saveAsTemplate(ctx: Context, next: any): Promise<void>;
};
