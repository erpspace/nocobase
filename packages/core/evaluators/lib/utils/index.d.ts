/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export type Scope = {
    [key: string]: any;
};
export type Evaluator = (expression: string, scope?: Scope) => any;
export declare function appendArrayColumn(scope: any, key: any): void;
interface EvaluatorOptions {
    replaceValue?: boolean;
}
export declare function evaluate(this: Evaluator, options: EvaluatorOptions, expression: string, scope?: Scope): any;
export {};
