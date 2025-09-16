/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { IconCheckOptions } from './icon';
import { RadioCheckOptions } from './radio';
import { InputCheckOptions } from './input';
import { NumberCheckOptions } from './number';
import { TextareaCheckOptions } from './textarea';
import { CollectionFieldCheckOptions } from './collectionField';
export * from './icon';
export * from './radio';
export * from './icon';
export type FormItemCheckOptions = ({
    type: 'icon';
} & IconCheckOptions) | ({
    type: 'radio';
} & RadioCheckOptions) | ({
    type: 'collectionField';
} & CollectionFieldCheckOptions) | ({
    type: 'input';
} & InputCheckOptions) | ({
    type: 'number';
} & NumberCheckOptions) | ({
    type: 'textarea';
} & TextareaCheckOptions);
export declare function checkFormItems(list: FormItemCheckOptions[]): Promise<void>;
