/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseFieldOptions, Field } from '@nocobase/database';
export interface FormulaFieldOptions extends BaseFieldOptions {
    type: 'formula';
    engine: string;
    expression: string;
}
export declare class FormulaField extends Field {
    get dataType(): any;
    calculate(scope: any): any;
    initFieldData: ({ transaction }: {
        transaction: any;
    }) => Promise<void>;
    calculateField: (instance: any) => Promise<void>;
    updateFieldData: (instance: any, { transaction }: {
        transaction: any;
    }) => Promise<void>;
    bind(): void;
    unbind(): void;
}
