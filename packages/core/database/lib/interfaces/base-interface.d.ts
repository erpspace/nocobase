/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare abstract class BaseInterface {
    options: any;
    constructor(options?: any);
    /**
     * cast value to string
     * @param value
     * @param ctx
     */
    toString(value: any, ctx?: any): any;
    /**
     * parse string to value
     * @param str
     * @param ctx
     */
    toValue(str: any, ctx?: any): Promise<any>;
    /**
     * cast value to array
     * eg: 'a,b,c' => ['a', 'b', 'c']
     * eg: ['a', 'b', 'c'] => ['a', 'b', 'c']
     * @param value
     * @param splitter
     */
    castArray(value: any, splitter?: string): any[];
    trim(value: any): any;
}
