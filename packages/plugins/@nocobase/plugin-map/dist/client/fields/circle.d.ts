/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CommonSchema } from './schema';
export declare class CircleFieldInterface extends CommonSchema {
    name: string;
    type: string;
    group: string;
    order: number;
    title: string;
    availableTypes: string[];
    description: string;
    sortable: boolean;
    default: {
        type: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-designer': string;
            'x-component-props': {};
        };
    };
}
