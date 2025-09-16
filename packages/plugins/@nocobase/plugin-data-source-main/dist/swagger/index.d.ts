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
    tags: ({
        name: string;
        description?: undefined;
    } | {
        name: string;
        description: string;
    })[];
    paths: {
        '/collections:list': {
            get: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections:get': {
            get: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections:create': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections:update': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections:destroy': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections:move': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections:setFields': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections/{collectionName}/fields:get': {
            get: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections/{collectionName}/fields:list': {
            get: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections/{collectionName}/fields:create': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections/{collectionName}/fields:update': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections/{collectionName}/fields:destroy': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collections/{collectionName}/fields:move': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collectionCategories:list': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collectionCategories:get': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collectionCategories:create': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collectionCategories:update': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collectionCategories:destroy': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/collectionCategories:move': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    '200': {
                        description: string;
                    };
                };
            };
        };
        '/dbViews:get': {
            get: {
                tags: string[];
                summary: string;
                parameters: ({
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                    };
                    required: boolean;
                    example: string;
                } | {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                    };
                    required?: undefined;
                    example?: undefined;
                })[];
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    properties: {
                                        data: {
                                            type: string;
                                            properties: {
                                                fields: {
                                                    type: string;
                                                    additionalProperties: {
                                                        type: string;
                                                        properties: {
                                                            name: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            type: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            source: {
                                                                type: string;
                                                                required: boolean;
                                                                description: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                sources: {
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
                    };
                };
            };
        };
        '/dbViews:list': {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    properties: {
                                        data: {
                                            type: string;
                                            items: {
                                                type: string;
                                                properties: {
                                                    name: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    definition: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    schema: {
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
            };
        };
        '/dbViews:query': {
            get: {
                tags: string[];
                summary: string;
                parameters: ({
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                    };
                    required: boolean;
                    example: string;
                } | {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                    };
                    required?: undefined;
                    example?: undefined;
                })[];
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    properties: {
                                        data: {
                                            type: string;
                                            items: {
                                                type: string;
                                                description: string;
                                                additionalProperties: {
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
        };
    };
};
export default _default;
