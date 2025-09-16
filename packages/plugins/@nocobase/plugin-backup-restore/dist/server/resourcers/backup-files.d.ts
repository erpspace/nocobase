/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    name: string;
    middleware: (ctx: any, next: any) => Promise<any>;
    actions: {
        list(ctx: any, next: any): Promise<void>;
        get(ctx: any, next: any): Promise<void>;
        /**
         * create dump task
         * @param ctx
         * @param next
         */
        create(ctx: any, next: any): Promise<void>;
        /**
         * download backup file
         * @param ctx
         * @param next
         */
        download(ctx: any, next: any): Promise<void>;
        restore(ctx: any, next: any): Promise<void>;
        destroy(ctx: any, next: any): Promise<void>;
        upload(ctx: any, next: any): Promise<void>;
        dumpableCollections(ctx: any, next: any): Promise<void>;
    };
};
export default _default;
