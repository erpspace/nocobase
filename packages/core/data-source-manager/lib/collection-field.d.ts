/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { FieldOptions, IField } from './types';
export declare class CollectionField implements IField {
    options: FieldOptions;
    constructor(options: FieldOptions);
    updateOptions(options: any): void;
    isRelationField(): boolean;
}
