/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const blockTemplatesCollection: {
    name: string;
    filterTargetKey: string;
    fields: ({
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            required: boolean;
            'x-component': string;
            enum?: undefined;
        };
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            enum: string;
            required?: undefined;
        };
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            required?: undefined;
            enum?: undefined;
        };
    })[];
};
