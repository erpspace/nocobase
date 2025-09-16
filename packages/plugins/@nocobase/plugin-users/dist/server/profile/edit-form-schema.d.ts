/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const adminProfileCreateFormSchema: {
    type: string;
    'x-uid': string;
    properties: {
        form: {
            type: string;
            'x-decorator': string;
            'x-decorator-props': {
                collection: string;
                dataSource: string;
            };
            'x-use-decorator-props': string;
            properties: {
                create: {
                    type: string;
                    'x-component': string;
                    'x-use-component-props': string;
                    properties: {
                        grid: {
                            type: string;
                            'x-component': string;
                            'x-initializer': string;
                            properties: {
                                nickname: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                nickname: {
                                                    type: string;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                username: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                username: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                email: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                email: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                phone: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                phone: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                password: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                password: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                roles: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                roles: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
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
                                    'x-use-component-props': string;
                                };
                                submit: {
                                    title: string;
                                    'x-component': string;
                                    'x-use-component-props': string;
                                    'x-component-props': {
                                        type: string;
                                        htmlType: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const adminProfileEditFormSchema: {
    type: string;
    'x-uid': string;
    properties: {
        form: {
            type: string;
            'x-decorator': string;
            'x-decorator-props': {
                collection: string;
                dataSource: string;
                action: string;
            };
            'x-use-decorator-props': string;
            properties: {
                edit: {
                    type: string;
                    'x-component': string;
                    'x-use-component-props': string;
                    properties: {
                        grid: {
                            type: string;
                            'x-component': string;
                            'x-initializer': string;
                            properties: {
                                nickname: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                nickname: {
                                                    type: string;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                username: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                username: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                email: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                email: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                phone: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                phone: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                roles: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                roles: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
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
                                    'x-use-component-props': string;
                                };
                                submit: {
                                    title: string;
                                    'x-component': string;
                                    'x-use-component-props': string;
                                    'x-component-props': {
                                        type: string;
                                        htmlType: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const userProfileEditFormSchema: {
    type: string;
    'x-uid': string;
    properties: {
        form: {
            type: string;
            'x-decorator': string;
            'x-decorator-props': {
                collection: string;
                dataSource: string;
                action: string;
            };
            'x-use-decorator-props': string;
            properties: {
                edit: {
                    type: string;
                    'x-component': string;
                    'x-use-component-props': string;
                    properties: {
                        grid: {
                            type: string;
                            'x-component': string;
                            'x-initializer': string;
                            properties: {
                                nickname: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                nickname: {
                                                    type: string;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                username: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                username: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                email: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                email: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
                                                };
                                            };
                                        };
                                    };
                                };
                                phone: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        col: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                phone: {
                                                    type: string;
                                                    required: boolean;
                                                    'x-toolbar': string;
                                                    'x-settings': string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-component-props': {};
                                                    'x-collection-field': string;
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
                                    'x-use-component-props': string;
                                };
                                submit: {
                                    title: string;
                                    'x-component': string;
                                    'x-use-component-props': string;
                                    'x-component-props': {
                                        type: string;
                                        htmlType: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
