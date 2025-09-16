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
    components: {
        schemas: {
            Theme: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    config: {
                        type: string;
                        properties: {
                            name: {
                                type: string;
                            };
                            token: {
                                type: string;
                                additionalProperties: boolean;
                            };
                        };
                        required: string[];
                        additionalProperties: boolean;
                    };
                    optional: {
                        type: string;
                    };
                    isBuiltIn: {
                        type: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                };
                required: string[];
                additionalProperties: boolean;
            };
        };
    };
    tags: any[];
    paths: {
        '/themeConfig:list': {
            get: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
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
                    '401': {
                        description: string;
                    };
                    '404': {
                        description: string;
                    };
                };
            };
        };
        '/themeConfig:create': {
            post: {
                tags: string[];
                description: string;
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    config: {
                                        type: string;
                                        properties: {
                                            name: {
                                                type: string;
                                            };
                                            token: {
                                                type: string;
                                            };
                                        };
                                        required: string[];
                                        additionalProperties: boolean;
                                    };
                                    optional: {
                                        type: string;
                                    };
                                    isBuiltIn: {
                                        type: string;
                                    };
                                };
                                required: string[];
                                additionalProperties: boolean;
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
                    '400': {
                        description: string;
                    };
                    '401': {
                        description: string;
                    };
                };
            };
        };
        '/themeConfig:update': {
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
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    config: {
                                        type: string;
                                        properties: {
                                            name: {
                                                type: string;
                                            };
                                            token: {
                                                type: string;
                                            };
                                        };
                                        additionalProperties: boolean;
                                    };
                                    optional: {
                                        type: string;
                                    };
                                    isBuiltIn: {
                                        type: string;
                                    };
                                };
                                additionalProperties: boolean;
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
                    '400': {
                        description: string;
                    };
                    '401': {
                        description: string;
                    };
                    '404': {
                        description: string;
                    };
                };
            };
        };
        '/themeConfig:destroy': {
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
                    '204': {
                        description: string;
                    };
                    '401': {
                        description: string;
                    };
                    '404': {
                        description: string;
                    };
                };
            };
        };
    };
};
export default _default;
