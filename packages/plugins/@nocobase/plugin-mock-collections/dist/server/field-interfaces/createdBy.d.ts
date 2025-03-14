/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const createdBy: {
    options: (options: any) => {
        type: string;
        target: string;
        foreignKey: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                fieldNames: {
                    value: string;
                    label: string;
                };
            };
            'x-read-pretty': boolean;
        };
    };
};
