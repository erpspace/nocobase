/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseInterface } from './base-interface';
export declare class NumberInterface extends BaseInterface {
    sanitizeValue(value: any): any;
    toValue(value: any): Promise<any>;
    parseValue(value: any): any;
    validate(value: any): boolean;
    toString(value: number, ctx?: any): string | number;
}
