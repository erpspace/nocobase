/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseInterface } from './base-interface';
export declare class ToOneInterface extends BaseInterface {
    toString(value: any, ctx?: any): string;
    toValue(str: string, ctx?: any): Promise<any>;
}
