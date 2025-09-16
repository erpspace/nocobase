/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
import type { VoidField } from '@formily/core';
export declare const useShared: () => {
    importSettingsSchema: {
        type: string;
        'x-component': string;
        properties: {
            explain: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
            };
            importColumns: {
                type: string;
                'x-component': string;
                'x-decorator': string;
                items: {
                    type: string;
                    properties: {
                        space: {
                            type: string;
                            'x-component': string;
                            'x-component-props': {
                                className: string;
                            };
                            properties: {
                                sort: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                };
                                dataIndex: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': import("react").FunctionComponent<Partial<import("antd").CascaderProps<any, string | number | symbol, boolean> & {
                                        useLoadData: (props: import("@nocobase/client").CascaderProps<any>) => (selectOptions: import("rc-cascader").DefaultOptionType[]) => void;
                                        useDataSource?: (options: any) => import("@nocobase/client").UseRequestResult<unknown>;
                                        labelInValue?: boolean;
                                        changeOnSelectLast?: boolean;
                                        onChange?: (value: any) => void;
                                        maxLevel?: number;
                                    }> & import("react").RefAttributes<unknown>>;
                                    required: boolean;
                                    'x-use-component-props': () => {
                                        options: any;
                                    };
                                    'x-component-props': {
                                        fieldNames: {
                                            label: string;
                                            value: string;
                                            children: string;
                                        };
                                        changeOnSelect: boolean;
                                    };
                                };
                                title: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    'x-component-props': {
                                        placeholder: string;
                                    };
                                };
                                description: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    'x-component-props': {
                                        placeholder: string;
                                    };
                                };
                                remove: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                };
                            };
                        };
                    };
                };
                properties: {
                    add: {
                        type: string;
                        title: string;
                        'x-component': string;
                        'x-component-props': {
                            className: string;
                        };
                    };
                };
            };
        };
    };
    beforeUploadHandler(): boolean;
    uploadValidator(value: any, rule: any): "" | {
        type: string;
        message: string;
    };
    validateUpload(form: any, submitField: VoidField, deps: any): void;
};
