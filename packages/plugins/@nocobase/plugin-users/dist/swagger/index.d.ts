/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    openapi: string;
    info: {
        title: string;
    };
    paths: {
        '/users:list': {
            get: {
                tags: string[];
                description: string;
                parameters: any[];
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
        '/users:get': {
            get: {
                tags: string[];
                description: string;
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
        '/users:create': {
            post: {
                tags: string[];
                description: string;
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
                    '200': {
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
        '/users:update': {
            post: {
                tags: string[];
                description: string;
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
        '/users:destroy': {
            post: {
                tags: string[];
                description: string;
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
                    '200': {
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
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    nickname: {
                        type: string;
                        description: string;
                    };
                    username: {
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
                    password: {
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
                };
            };
        };
    };
};
export default _default;
