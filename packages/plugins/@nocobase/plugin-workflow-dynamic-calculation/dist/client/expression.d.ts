/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionFieldInterface } from '@nocobase/client';
export declare class ExpressionFieldInterface extends CollectionFieldInterface {
    name: string;
    type: string;
    group: string;
    order: number;
    title: string;
    description: string;
    sortable: boolean;
    default: {
        type: string;
        uiSchema: {
            'x-component': string;
        };
    };
    properties: {
        'uiSchema.title': {
            type: string;
            title: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
        };
        name: {
            type: string;
            title: string;
            required: boolean;
            'x-disabled': string;
            'x-decorator': string;
            'x-component': string;
            'x-validator': string;
            description: string;
        };
    };
    hidden: boolean;
}
