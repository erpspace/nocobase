/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
export declare const roleEditSchema: {
    type: string;
    properties: {
        [x: string]: {
            type: string;
            'x-component': string;
            'x-decorator': string;
            'x-decorator-props': {
                useValues: (options: any) => import("@nocobase/client").UseRequestResult<unknown>;
            };
            title: string;
            properties: {
                title: {
                    'x-component': string;
                    'x-decorator': string;
                };
                name: {
                    'x-component': string;
                    'x-decorator': string;
                    'x-disabled': boolean;
                };
                default: {
                    title: string;
                    'x-component': string;
                    'x-decorator': string;
                    'x-content': string;
                    'x-reactions': (field: any) => void;
                };
                footer: {
                    type: string;
                    'x-component': string;
                    properties: {
                        cancel: {
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                useAction: string;
                            };
                        };
                        submit: {
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                type: string;
                                useAction: string;
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const roleCollectionsSchema: ISchema;
