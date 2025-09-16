/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const collection: {
    type: string;
    title: string;
    required: boolean;
    'x-reactions': any[];
    'x-decorator': string;
    'x-component': string;
};
export declare const values: {
    type: string;
    title: string;
    description: string;
    'x-decorator': string;
    'x-decorator-props': {
        labelAlign: string;
        className: string;
    };
    'x-component': string;
};
export declare const filter: {
    type: string;
    title: string;
    'x-decorator': string;
    'x-component': string;
    'x-use-component-props': () => {
        options: any[];
        className: string;
    };
    'x-component-props': {
        dynamicComponent: string;
    };
};
export declare const sort: {
    type: string;
    title: string;
    'x-decorator': string;
    'x-component': string;
    items: {
        type: string;
        properties: {
            space: {
                type: string;
                'x-component': string;
                properties: {
                    sort: {
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                    };
                    field: {
                        type: string;
                        enum: string;
                        required: boolean;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            style: {
                                width: number;
                            };
                        };
                    };
                    direction: {
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            optionType: string;
                        };
                        enum: {
                            label: string;
                            value: string;
                        }[];
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
        };
    };
};
export declare const pagination: {
    type: string;
    title: string;
    'x-decorator': string;
    'x-decorator-props': {
        value: {
            designable: boolean;
        };
    };
    'x-component': string;
    properties: {
        row: {
            type: string;
            'x-component': string;
            properties: {
                page: {
                    type: string;
                    'x-component': string;
                    properties: {
                        page: {
                            type: string;
                            title: string;
                            'x-decorator': string;
                            'x-component': string;
                            'x-component-props': {
                                useTypedConstant: string[];
                            };
                            default: number;
                        };
                    };
                };
                pageSize: {
                    type: string;
                    'x-component': string;
                    properties: {
                        pageSize: {
                            type: string;
                            title: string;
                            'x-decorator': string;
                            'x-component': string;
                            'x-component-props': {
                                min: number;
                            };
                            default: number;
                        };
                    };
                };
            };
        };
    };
};
export declare const appends: {
    type: string;
    title: string;
    description: string;
    'x-decorator': string;
    'x-component': string;
    'x-component-props': {
        title: string;
        multiple: boolean;
        useCollection(): any;
    };
    'x-reactions': {
        dependencies: string[];
        fulfill: {
            state: {
                visible: string;
            };
        };
    }[];
};
