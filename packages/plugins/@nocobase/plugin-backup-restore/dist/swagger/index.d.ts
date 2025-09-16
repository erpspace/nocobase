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
        '/backupFiles:create': {
            post: {
                summary: string;
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
                                    type: string;
                                    properties: {
                                        key: {
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
        '/backupFiles:list': {
            get: {
                summary: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                        default: number;
                    };
                }[];
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
                                                oneOf: {
                                                    $ref: string;
                                                }[];
                                            };
                                        };
                                        meta: {
                                            type: string;
                                            properties: {
                                                page: {
                                                    type: string;
                                                    format: string;
                                                };
                                                pageSize: {
                                                    type: string;
                                                    format: string;
                                                };
                                                count: {
                                                    type: string;
                                                    format: string;
                                                };
                                                totalPage: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
        '/backupFiles:get': {
            get: {
                summary: string;
                parameters: {
                    name: string;
                    in: string;
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
                                    oneOf: {
                                        $ref: string;
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
        };
        '/backupFiles:download': {
            get: {
                summary: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/octet-stream': {
                                schema: {
                                    type: string;
                                    format: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        '/backupFiles:destroy': {
            post: {
                summary: string;
                parameters: {
                    name: string;
                    in: string;
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
                                    properties: {
                                        status: {
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
        '/backupFiles:upload': {
            post: {
                summary: string;
                requestBody: {
                    required: boolean;
                    content: {
                        'multipart/form-data': {
                            schema: {
                                type: string;
                                properties: {
                                    file: {
                                        type: string;
                                        format: string;
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
                                        key: {
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
        '/backupFiles:restore': {
            post: {
                summary: string;
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    filterByTk: {
                                        type: string;
                                    };
                                    dataTypes: {
                                        type: string;
                                        items: {
                                            $ref: string;
                                        };
                                        uniqueItems: boolean;
                                    };
                                    key: {
                                        type: string;
                                    };
                                };
                                oneOf: {
                                    required: string[];
                                }[];
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
                                    type: string;
                                    properties: {
                                        status: {
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
        '/backupFiles:dumpableCollections': {
            get: {
                summary: string;
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    properties: {
                                        meta: {
                                            type: string;
                                            items: {
                                                type: string;
                                                properties: {
                                                    name: {
                                                        type: string;
                                                    };
                                                    title: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        config: {
                                            type: string;
                                            items: {
                                                type: string;
                                                properties: {
                                                    name: {
                                                        type: string;
                                                    };
                                                    title: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                        business: {
                                            type: string;
                                            items: {
                                                type: string;
                                                properties: {
                                                    name: {
                                                        type: string;
                                                    };
                                                    title: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    required: string[];
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
            BackUpStatusOk: {
                type: string;
                properties: {
                    name: {
                        type: string;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    fileSize: {
                        type: string;
                    };
                    status: {
                        type: string;
                        enum: string[];
                    };
                };
                required: string[];
            };
            BackUpStatusDoing: {
                type: string;
                properties: {
                    name: {
                        type: string;
                    };
                    inProgress: {
                        type: string;
                        enum: boolean[];
                    };
                    status: {
                        type: string;
                        enum: string[];
                    };
                };
                required: string[];
            };
            DumpDataType: {
                type: string;
                enum: string[];
            };
            DumpOptions: {
                type: string;
                properties: {
                    dataTypes: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                        uniqueItems: boolean;
                    };
                };
                required: string[];
            };
        };
    };
};
export default _default;
