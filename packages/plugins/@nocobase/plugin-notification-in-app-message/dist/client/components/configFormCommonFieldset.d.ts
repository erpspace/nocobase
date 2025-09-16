/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function getConfigFormCommonFieldset({ variableOptions }: {
    variableOptions: any;
}): {
    title: {
        type: string;
        required: boolean;
        title: string;
        'x-decorator': string;
        'x-component': string;
        'x-component-props': {
            scope: any;
            useTypedConstant: string[];
        };
    };
    content: {
        type: string;
        required: boolean;
        title: string;
        'x-decorator': string;
        'x-component': string;
        'x-component-props': {
            scope: any;
            placeholder: string;
            autoSize: {
                minRows: number;
            };
        };
    };
    options: {
        type: string;
        properties: {
            url: {
                type: string;
                required: boolean;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-component-props': {
                    scope: any;
                    useTypedConstant: string[];
                    delimiters: string[];
                };
                description: any;
            };
            mobileUrl: {
                type: string;
                required: boolean;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-component-props': {
                    scope: any;
                    useTypedConstant: string[];
                    delimiters: string[];
                };
                description: any;
            };
            duration: {
                type: string;
                title: string;
                description: any;
                'x-decorator': string;
                'x-component': string;
                default: number;
            };
        };
    };
};
