/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const tabItemSchema: {
    properties: {
        title: {
            type: string;
            title: string;
            required: boolean;
            'x-component': string;
            'x-decorator': string;
        };
        icon: {
            required: boolean;
            'x-decorator': string;
            'x-component': string;
            title: string;
            'x-component-props': {};
        };
    };
};
