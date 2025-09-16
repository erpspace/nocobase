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
        '/applications:list': {
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
        '/applications:create': {
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
        '/applications:update': {
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
        '/applications:destroy': {
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
                    200: {
                        description: string;
                    };
                };
            };
        };
    };
    components: {
        schemas: {
            applicationFrom: {
                allOf: ({
                    $ref: string;
                    type?: undefined;
                    properties?: undefined;
                } | {
                    type: string;
                    properties: {
                        createdAt: {
                            readOnly: boolean;
                        };
                        updatedAt: {
                            readOnly: boolean;
                        };
                        status: {
                            readOnly: boolean;
                        };
                    };
                    $ref?: undefined;
                })[];
            };
            application: {
                type: string;
                properties: {
                    name: {
                        type: string;
                        example: string;
                        description: string;
                    };
                    displayName: {
                        type: string;
                        example: string;
                        description: string;
                    };
                    pinned: {
                        type: string;
                        example: boolean;
                        description: string;
                    };
                    cname: {
                        type: string;
                        example: string;
                        description: string;
                    };
                    status: {
                        type: string;
                        example: string;
                        description: string;
                    };
                    options: {
                        type: string;
                        properties: {
                            autoStart: {
                                type: string;
                                example: boolean;
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
                };
            };
        };
    };
};
export default _default;
