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
        '/roles:list': {
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
        '/roles:get': {
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
        '/roles:create': {
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
        '/roles:update': {
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
        '/roles:destroy': {
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
        '/roles:check': {
            get: {
                tags: string[];
                description: string;
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
        '/roles:setDefaultRole': {
            post: {
                tags: string[];
                description: string;
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    roleName: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/roles/{roleName}/collections:list': {
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
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            type: {
                                                type: string;
                                                description: string;
                                            };
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            collectionName: {
                                                type: string;
                                                description: string;
                                            };
                                            title: {
                                                type: string;
                                                description: string;
                                            };
                                            roleName: {
                                                type: string;
                                                description: string;
                                            };
                                            usingConfig: {
                                                type: string;
                                                enum: string[];
                                                description: string;
                                            };
                                            exists: {
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
        '/availableActions:list': {
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
                                        type: string;
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            displayName: {
                                                type: string;
                                                description: string;
                                            };
                                            allowConfigureFields: {
                                                type: string;
                                                description: string;
                                            };
                                            onNewRecord: {
                                                type: string;
                                                description: string;
                                            };
                                            type: {
                                                type: string;
                                                description: string;
                                            };
                                            aliases: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                };
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
    };
    components: {
        schemas: {
            role: {
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
    };
};
export default _default;
