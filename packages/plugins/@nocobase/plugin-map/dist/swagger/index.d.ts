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
        '/map-configuration:get': {
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
                        default: string;
                        enum: string[];
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
        '/map-configuration:set': {
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
                    };
                };
            };
        };
    };
    components: {
        schemas: {
            mapConfiguration: {
                type: string;
                properties: {
                    accessKey: {
                        type: string;
                    };
                    securityJsCode: {
                        type: string;
                    };
                    type: {
                        type: string;
                        default: string;
                        enum: string[];
                    };
                };
            };
        };
    };
};
export default _default;
