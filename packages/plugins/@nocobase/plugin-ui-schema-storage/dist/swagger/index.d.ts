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
    tags: any[];
    paths: {
        '/uiSchemas:getJsonSchema/{uid}': {
            get: {
                tags: string[];
                description: string;
                parameters: {
                    $ref: string;
                }[];
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
        '/uiSchemas:getProperties/{uid}': {
            get: {
                tags: string[];
                description: string;
                parameters: {
                    $ref: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    properties: {
                                        type: {
                                            type: string;
                                        };
                                        properties: {
                                            type: string;
                                            additionalProperties: {
                                                $ref: string;
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
        '/uiSchemas:insert': {
            post: {
                tags: string[];
                description: string;
                requestBody: {
                    required: boolean;
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
        '/uiSchemas:remove/{uid}': {
            post: {
                tags: string[];
                description: string;
                parameters: {
                    $ref: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/uiSchemas:patch': {
            post: {
                tags: string[];
                description: string;
                requestBody: {
                    required: boolean;
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
        '/uiSchemas:batchPatch': {
            post: {
                tags: string[];
                description: string;
                requestBody: {
                    required: boolean;
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
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/uiSchemas:clearAncestor/{uid}': {
            post: {
                tags: string[];
                description: string;
                parameters: {
                    $ref: string;
                }[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/uiSchemas:insertAdjacent/{uid}': {
            post: {
                tags: string[];
                description: string;
                parameters: ({
                    $ref: string;
                    name?: undefined;
                    in?: undefined;
                    required?: undefined;
                    description?: undefined;
                    schema?: undefined;
                } | {
                    name: string;
                    in: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                    };
                    $ref?: undefined;
                })[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    schema: {
                                        $ref: string;
                                    };
                                    wrap: {
                                        $ref: string;
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
        '/uiSchemas:saveAsTemplate': {
            post: {
                tags: string[];
                description: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    description: string;
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
                                    key: {
                                        type: string;
                                    };
                                    collectionName: {
                                        type: string;
                                    };
                                    componentName: {
                                        type: string;
                                    };
                                    name: {
                                        type: string;
                                        description: string;
                                    };
                                    resourceName: {
                                        type: string;
                                        description: string;
                                    };
                                    uid: {
                                        type: string;
                                        description: string;
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
    };
    components: {
        parameters: {
            uid: {
                name: string;
                in: string;
                required: boolean;
                description: string;
                schema: {
                    type: string;
                };
            };
        };
        schemas: {
            uiSchema: {
                type: string;
                properties: {
                    type: {
                        type: string;
                        example: string;
                    };
                    title: {
                        type: string;
                        example: string;
                        description: string;
                    };
                    'x-uid': {
                        type: string;
                        example: string;
                        description: string;
                    };
                    'x-index': {
                        type: string;
                        exmaple: number;
                        description: string;
                    };
                    'x-async': {
                        type: string;
                        example: boolean;
                        description: string;
                    };
                    name: {
                        type: string;
                        name: string;
                        description: string;
                    };
                    properties: {
                        type: string;
                        additionalProperties: {
                            $ref: string;
                        };
                    };
                };
            };
        };
    };
};
export default _default;
