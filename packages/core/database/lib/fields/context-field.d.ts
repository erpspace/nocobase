/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model } from '../model';
import { BaseColumnFieldOptions, Field } from './field';
export declare class ContextField extends Field {
    get dataType(): any;
    listener: (instances: Model[], options: any) => Promise<void>;
    bind(): void;
    unbind(): void;
}
export interface ContextFieldOptions extends BaseColumnFieldOptions {
    type: 'context';
    dataIndex: string;
    dataType?: string;
    createOnly?: boolean;
}
