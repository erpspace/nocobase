/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const newSubDepartmentSchema: {
    type: string;
    properties: {
        [x: string]: {
            type: string;
            'x-component': string;
            'x-decorator': string;
            'x-decorator-props': {
                useValues(options: any): import("@nocobase/client").UseRequestResult<unknown>;
            };
            title: string;
            properties: {
                title: {
                    'x-component': string;
                    'x-decorator': string;
                };
                parent: {
                    'x-component': string;
                    'x-decorator': string;
                    'x-collection-field': string;
                    'x-component-props': {
                        component: string;
                    };
                };
                roles: {
                    'x-component': string;
                    'x-decorator': string;
                    'x-collection-field': string;
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
export declare const editDepartmentSchema: {
    type: string;
    properties: {
        [x: string]: {
            type: string;
            'x-component': string;
            'x-decorator': string;
            'x-decorator-props': {
                useValues(options: any): import("@nocobase/client").UseRequestResult<unknown>;
            };
            title: string;
            properties: {
                title: {
                    'x-component': string;
                    'x-decorator': string;
                };
                parent: {
                    'x-component': string;
                    'x-decorator': string;
                    'x-collection-field': string;
                    'x-component-props': {
                        component: string;
                    };
                };
                roles: {
                    'x-component': string;
                    'x-decorator': string;
                    'x-collection-field': string;
                };
                owners: {
                    title: string;
                    'x-component': string;
                    'x-decorator': string;
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
export declare const departmentOwnersSchema: {
    type: string;
    properties: {
        drawer: {
            title: string;
            'x-component': string;
            properties: {
                resource: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    properties: {
                        actions: {
                            type: string;
                            'x-component': string;
                            'x-component-props': {
                                style: {
                                    marginBottom: number;
                                };
                            };
                            properties: {
                                filter: {
                                    type: string;
                                    title: string;
                                    default: {
                                        $and: ({
                                            username: {
                                                $includes: string;
                                            };
                                            nickname?: undefined;
                                        } | {
                                            nickname: {
                                                $includes: string;
                                            };
                                            username?: undefined;
                                        })[];
                                    };
                                    'x-action': string;
                                    'x-component': string;
                                    'x-use-component-props': string;
                                    'x-component-props': {
                                        icon: string;
                                    };
                                    'x-align': string;
                                };
                            };
                        };
                        table: {
                            type: string;
                            'x-component': string;
                            'x-component-props': {
                                rowKey: string;
                                rowSelection: {
                                    type: string;
                                    onChange: string;
                                };
                                useDataSource: string;
                            };
                            properties: {
                                username: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    properties: {
                                        username: {
                                            type: string;
                                            'x-component': string;
                                            'x-read-pretty': boolean;
                                        };
                                    };
                                };
                                nickname: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    properties: {
                                        nickname: {
                                            type: string;
                                            'x-component': string;
                                            'x-read-pretty': boolean;
                                        };
                                    };
                                };
                                phone: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    properties: {
                                        phone: {
                                            type: string;
                                            'x-component': string;
                                            'x-read-pretty': boolean;
                                        };
                                    };
                                };
                                email: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    properties: {
                                        email: {
                                            type: string;
                                            'x-component': string;
                                            'x-read-pretty': boolean;
                                        };
                                    };
                                };
                            };
                        };
                    };
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
                        confirm: {
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
