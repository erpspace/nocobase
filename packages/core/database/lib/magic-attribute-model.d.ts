/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model } from './model';
export declare class MagicAttributeModel extends Model {
    get magicAttribute(): string;
    set(key: any, value?: any, options?: any): this;
    setV1(key?: any, value?: any, options?: any): this;
    get(key?: any, value?: any): any;
    update(values?: any, options?: any): Promise<this>;
}
