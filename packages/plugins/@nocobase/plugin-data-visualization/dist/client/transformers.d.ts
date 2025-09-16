/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export type Transformer = (val: any, ...args: any[]) => string | number;
export type TransformerConfig = Transformer | {
    label?: string;
    schema?: any;
    fn: Transformer;
};
declare const transformers: {
    [key: string]: {
        [key: string]: TransformerConfig;
    };
};
export default transformers;
