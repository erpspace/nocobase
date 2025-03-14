/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Registry } from '@nocobase/utils';
type Comparer = (a: any, b: any) => boolean;
export declare const calculators: Registry<Comparer>;
type CalculationItem = {
    calculator?: string;
    operands?: [any?, any?];
};
type CalculationGroup = {
    group: {
        type: 'and' | 'or';
        calculations?: Calculation[];
    };
};
type Calculation = CalculationItem | CalculationGroup;
export declare function logicCalculate(calculation?: Calculation): any;
export {};
