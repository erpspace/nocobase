/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const membersActionSchema: {
    type: string;
    'x-component': string;
    properties: {
        remove: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                icon: string;
                confirm: {
                    title: string;
                    content: string;
                };
                style: {
                    marginRight: number;
                };
                useAction: string;
            };
        };
        create: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                type: string;
                icon: string;
            };
            properties: {
                drawer: {
                    type: string;
                    'x-component': string;
                };
            };
        };
    };
};
export declare const rowRemoveActionSchema: {
    type: string;
    properties: {
        remove: {
            title: string;
            'x-component': string;
            'x-component-props': {
                confirm: {
                    title: string;
                    content: string;
                };
                useAction: string;
            };
        };
    };
};
export declare const getMembersSchema: (department: any, user: any) => {
    type: string;
    'x-component': string;
    'x-component-props': {
        heightMode: string;
    };
    properties: {
        table: {
            type: string;
            'x-component': string;
            'x-use-component-props': string;
            'x-component-props': {
                rowKey: string;
                rowSelection: {
                    type: string;
                };
                pagination: {
                    showTotal: string;
                };
            };
            properties: {
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
                actions: {
                    type: string;
                    title: string;
                    'x-component': string;
                    'x-component-props': {
                        fixed: string;
                    };
                    properties: {
                        actions: {
                            type: string;
                            'x-component': string;
                            'x-component-props': {
                                split: string;
                            };
                            properties: {
                                remove?: {
                                    type: string;
                                    'x-component': string;
                                };
                                update: {
                                    type: string;
                                    title: string;
                                    'x-component': string;
                                    'x-component-props': {
                                        type: string;
                                    };
                                    properties: {
                                        drawer: {
                                            type: string;
                                            'x-component': string;
                                            'x-decorator': string;
                                            title: string;
                                            properties: {
                                                departments: {
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                isOwner?: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-component-props': {
                        style: {
                            minWidth: number;
                        };
                    };
                    title: string;
                    properties: {
                        isOwner: {
                            type: string;
                            'x-component': string;
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
                departments: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    properties: {
                        departments: {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                        };
                    };
                };
            };
        };
        actions?: {
            type: string;
            'x-component': string;
            'x-component-props': {
                style: {
                    marginBottom: number;
                };
            };
            properties: {
                [x: string]: {
                    type: string;
                    title: string;
                    'x-action': string;
                    'x-component': string;
                    'x-use-component-props': string;
                    'x-component-props': {
                        icon: string;
                    };
                    'x-align': string;
                } | {
                    type: string;
                    title: string;
                    'x-action': string;
                    'x-component': string;
                    'x-use-component-props': string;
                    'x-component-props': {
                        icon: string;
                    };
                    'x-align'?: undefined;
                } | {
                    type: string;
                    'x-component': string;
                    title?: undefined;
                    'x-action'?: undefined;
                    'x-use-component-props'?: undefined;
                    'x-component-props'?: undefined;
                    'x-align'?: undefined;
                };
                refresh: {
                    type: string;
                    title: string;
                    'x-action': string;
                    'x-component': string;
                    'x-use-component-props': string;
                    'x-component-props': {
                        icon: string;
                    };
                };
                actions: {
                    type: string;
                    'x-component': string;
                };
            };
        };
    };
};
export declare const addMembersSchema: {
    type: string;
    properties: {
        drawer: {
            type: string;
            'x-component': string;
            'x-decorator': string;
            title: string;
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
                        submit: {
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                type: string;
                            };
                            'x-use-component-props': string;
                        };
                    };
                };
            };
        };
    };
};
export declare const userDepartmentsSchema: {
    type: string;
    properties: {
        drawer: {
            title: string;
            'x-decorator': string;
            'x-component': string;
            properties: {
                table: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-component-props': {
                        useDataSource: string;
                        useDisabled: string;
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
