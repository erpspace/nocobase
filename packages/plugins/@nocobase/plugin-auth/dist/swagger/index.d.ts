/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    info: {
        title: string;
    };
    paths: {
        '/auth:check': {
            get: {
                description: string;
                tags: string[];
                parameters: {
                    name: string;
                    description: string;
                    in: string;
                    schema: {
                        type: string;
                        default: string;
                    };
                }[];
                security: any[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    allOf: ({
                                        $ref: string;
                                        type?: undefined;
                                        properties?: undefined;
                                    } | {
                                        type: string;
                                        properties: {
                                            roles: {
                                                $ref: string;
                                            };
                                        };
                                        $ref?: undefined;
                                    })[];
                                };
                            };
                        };
                    };
                };
            };
        };
        '/auth:signIn': {
            post: {
                description: string;
                tags: string[];
                security: any[];
                parameters: {
                    name: string;
                    description: string;
                    in: string;
                    schema: {
                        type: string;
                        default: string;
                    };
                }[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    email: {
                                        type: string;
                                        description: string;
                                    };
                                    password: {
                                        type: string;
                                        description: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    properties: {
                                        token: {
                                            type: string;
                                        };
                                        user: {
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    401: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        '/auth:signUp': {
            post: {
                description: string;
                tags: string[];
                security: any[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    email: {
                                        type: string;
                                        description: string;
                                    };
                                    password: {
                                        type: string;
                                        description: string;
                                    };
                                    confirm_password: {
                                        type: string;
                                        description: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/auth:signOut': {
            post: {
                description: string;
                tags: string[];
                security: any[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/auth:changePassword': {
            post: {
                description: string;
                tags: string[];
                security: any[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    oldPassword: {
                                        type: string;
                                        description: string;
                                    };
                                    newPassword: {
                                        type: string;
                                        description: string;
                                    };
                                    confirmPassword: {
                                        type: string;
                                        description: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    401: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        'authenticators:listTypes': {
            get: {
                description: string;
                tags: string[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        'authenticators:publicList': {
            get: {
                description: string;
                tags: string[];
                security: any[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            title: {
                                                type: string;
                                                description: string;
                                            };
                                            authType: {
                                                type: string;
                                                description: string;
                                            };
                                            options: {
                                                type: string;
                                                description: string;
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
        'authenticators:create': {
            post: {
                description: string;
                tags: string[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    name: {
                                        type: string;
                                        description: string;
                                    };
                                    authType: {
                                        type: string;
                                        description: string;
                                    };
                                    options: {
                                        type: string;
                                        description: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        'authenticators:list': {
            get: {
                description: string;
                tags: string[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    items: {
                                        $ref: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        'authenticators:get': {
            get: {
                description: string;
                tags: string[];
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        'authenticators:update': {
            post: {
                description: string;
                tags: string[];
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        'authenticators:destroy': {
            post: {
                description: string;
                tags: string[];
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
    };
    components: {
        schemas: {
            user: {
                type: string;
                description: string;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    nickname: {
                        type: string;
                        description: string;
                    };
                    email: {
                        type: string;
                        description: string;
                    };
                    phone: {
                        type: string;
                        description: string;
                    };
                    appLang: {
                        type: string;
                        description: string;
                    };
                    systemSettings: {
                        type: string;
                        description: string;
                        properties: {
                            theme: {
                                type: string;
                                description: string;
                            };
                        };
                    };
                    createdAt: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    createdById: {
                        type: string;
                        description: string;
                    };
                    updatedById: {
                        type: string;
                        description: string;
                    };
                };
            };
            roles: {
                type: string;
                description: string;
                items: {
                    type: string;
                    properties: {
                        title: {
                            type: string;
                            description: string;
                        };
                        name: {
                            type: string;
                            description: string;
                        };
                        description: {
                            type: string;
                            description: string;
                        };
                        hidden: {
                            type: string;
                            description: string;
                        };
                        default: {
                            type: string;
                            description: string;
                        };
                        allowConfigure: {
                            type: string;
                            description: string;
                        };
                        allowNewMenu: {
                            type: string;
                            description: string;
                        };
                        snippets: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                        strategy: {
                            type: string;
                            description: string;
                            items: {
                                type: string;
                                properties: {
                                    actions: {
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                        description: string;
                                    };
                                };
                            };
                        };
                        createdAt: {
                            type: string;
                            format: string;
                            description: string;
                        };
                        updatedAt: {
                            type: string;
                            format: string;
                            description: string;
                        };
                    };
                };
            };
            authenticator: {
                type: string;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    authType: {
                        type: string;
                        description: string;
                    };
                    name: {
                        type: string;
                        description: string;
                    };
                    title: {
                        type: string;
                        description: string;
                    };
                    options: {
                        type: string;
                        description: string;
                    };
                    description: {
                        type: string;
                        description: string;
                    };
                    enabled: {
                        type: string;
                        description: string;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    createdById: {
                        type: string;
                        description: string;
                    };
                    updatedById: {
                        type: string;
                        description: string;
                    };
                };
            };
        };
    };
};
export default _default;
