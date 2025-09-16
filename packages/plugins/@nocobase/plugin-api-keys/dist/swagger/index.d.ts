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
    tags: any[];
    paths: {
        '/apiKeys:create': {
            post: {
                description: string;
                tags: string[];
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
                                    type: string;
                                    properties: {
                                        token: {
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
        '/apiKeys:list': {
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
        '/apiKeys:destroy/{filterByTk}': {
            delete: {
                description: string;
                tags: string[];
                parameters: {
                    name: string;
                    description: string;
                    required: boolean;
                    in: string;
                    schema: {
                        type: string;
                        example: number;
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
            apiKeys: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    name: {
                        type: string;
                        example: string;
                    };
                    role: {
                        type: string;
                    };
                    expiresIn: {
                        type: string;
                        enum: string[];
                    };
                };
            };
        };
    };
};
export default _default;
