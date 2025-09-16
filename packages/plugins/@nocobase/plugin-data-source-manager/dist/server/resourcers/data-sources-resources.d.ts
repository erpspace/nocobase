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
    actions: {
        create(ctx: any, next: any): Promise<void>;
        update(ctx: any, next: any): Promise<void>;
        get(ctx: any, next: any): Promise<void>;
    };
};
export default _default;
