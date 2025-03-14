/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    title: string;
    name: string;
    fieldset: {
        title: {
            'x-component': string;
            'x-decorator': string;
        };
        name: {
            'x-component': string;
            'x-decorator': string;
            'x-disabled': string;
            required: boolean;
            default: string;
            description: string;
        };
        baseUrl: {
            'x-component': string;
            'x-decorator': string;
            description: string;
        };
        options: {
            type: string;
            'x-component': string;
            properties: {
                region: {
                    title: string;
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    description: string;
                    required: boolean;
                };
                accessKeyId: {
                    title: string;
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    required: boolean;
                };
                accessKeySecret: {
                    title: string;
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-component-props': {
                        password: boolean;
                    };
                    required: boolean;
                };
                bucket: {
                    title: string;
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    required: boolean;
                };
                thumbnailRule: {
                    title: string;
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-component-props': {
                        placeholder: string;
                    };
                    description: string;
                };
            };
        };
        path: {
            'x-component': string;
            'x-decorator': string;
            description: string;
        };
        rules: {
            type: string;
            'x-component': string;
            properties: {
                size: {
                    type: string;
                    title: string;
                    description: string;
                    'x-decorator': string;
                    'x-component': string;
                    required: boolean;
                    default: number;
                };
                mimetype: {
                    type: string;
                    title: string;
                    description: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-component-props': {
                        placeholder: string;
                    };
                };
            };
        };
        default: {
            'x-component': string;
            'x-decorator': string;
            'x-content': string;
        };
        paranoid: {
            'x-component': string;
            'x-decorator': string;
            'x-content': string;
        };
    };
    thumbnailRuleLink: string;
};
export default _default;
